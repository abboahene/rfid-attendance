
const express = require('express')
const app = express()
app.use(express.static('public'))
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//reminder -- cleaner - router.route
app.use(require('./routes/attender'))
app.use(require('./routes/event'))
app.use(require('./routes/club'))
app.use(require('./routes/member'))

////for the web server-------------------------------------

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rfid-attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch((err)=> console.log(err))
const Member = require('./models/member')
const Attender = require('./models/attender')
const Event = require('./models/event')



const server = require('http').createServer(app)
const ws = require('ws')
const wss = new ws.Server({ server: server })

const SerialPort = require('serialport')
const usbPort = new SerialPort('COM3')
// usbPort.open(err =>{
//     console.log('Error opening port:', err)
// })
// Rfid Usb Openning errors
usbPort.on('error', function(err) {
    console.log('Error: ', err.message)
})
usbPort.on('close', function(err) {
    console.log('usbPort closed')
})
usbPort.on('open', function(err) {
    console.log('usbPort opened')
})

// web socket
wss.on('connection', async(ws) => {
    console.log('A new client is connected')
    // console.log(ws)s

    // recieve msg from client
    ws.once('message', (data) => {
        console.log('data from client: ', data )

        let firstNotNull = data.split('*')[0] !== 'null'
        let secondNotNull = data.split('*')[1] !== 'null'
        
        if( firstNotNull && secondNotNull ){
            let newEvent = new Event({
                club_name: data.split('*')[0],
                title: data.split('*')[1]
            })
            newEvent.save()
        }
    })

    // get RFID data
    let indata = ''
    let rfid = ''
    let presentIds = []
    let currentEvent = await Event.findOne({}).sort({ createdAt: -1}).exec()
    let allClubMembers = await Member .find({ club_name: currentEvent.club_name }).exec()
    let allClubMembersRfids = []
    allClubMembers.forEach(element => {
        allClubMembersRfids.push(element.rfid)
    });
    console.log('rfids',allClubMembersRfids)
    
    // usbPort.on('open', function (){
        usbPort.on('data', function (data) {
            indata += data.toString('hex')
            if ( indata.length === 34 ) {
                rfid = indata.substring(4,28)
                usbPort.close()
                setTimeout(() => usbPort.open(), 3000)
                if ( !presentIds.includes(rfid) && allClubMembersRfids.includes(rfid) ) {

                    presentIds.push( rfid )
    
                    // get the member details
                    let member = allClubMembers.find( el => el.rfid === rfid)
                    console.log('member', member)
                    
                    //create an attender
                    let attender = new Attender({
                        member_rfid: member.rfid,
                        member_name: member.name,
                        member_club: member.club_name,
                        club_name: currentEvent.club_name,
                        event_name: currentEvent.name
                    })
                    attender.save((err, attender) =>{
                        if(err) console.log('could not save',err)
                        console.log('justSaved: ', rfid+" has been saved as attended")
                        //send member to client
                        let member_details =
                            {
                                member_rfid: attender.member_rfid,
                                member_name: attender.member_name,
                                member_club: currentClub.name,
                                time_arrived: attender.createdAt
                            }
                        ///string member_details ends
        
                        ws.send(JSON.stringify(member_details))
                    })
                    
    
                    
    
                // error handling 
                }else if( presentIds.includes(rfid) ){
                    ws.send(`../images/${rfid}.jpg*1`) // already present
    
                }else if( !allClubMembersRfids.includes(rfid) ){
                    ws.send('0')
                }
                indata = ''
            }

        })
    // })

    // if (ws.CLOSED) {
    //     console.log('websocket closed')
    //     usbPort.close()
    // }

})





///listeners---------------------------------------------------
server.listen('3001', () => console.log('websocket server listening at 3001...'))
app.listen('3002', () => {
    console.log('express listening on port 3002...')
})