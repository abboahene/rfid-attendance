
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

// web socket
wss.on('connection', (ws) => {
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
    let cardIds = []
    let allClubMembers = ['bbbbbbbbbbbbbbbbbbbbbb01','999999999999999999999901','aaaaaaaaaaaaaaaaaaaaaa01']
    
    // usbPort.on('open', function (){
        usbPort.on('data', function (data) {
            indata += data.toString('hex')
            if ( indata.length === 34 ) {

                if ( !cardIds.includes(indata.substring(4,28)) && allClubMembers.includes(indata.substring(4,28)) ) {

                    cardIds.push( indata.substring(4,28) )
                    //send msg to client
                    ws.send(cardIds[cardIds.length-1])
                    Member.find({rfid: indata.substring(4,28)}).exec((err,doc)=>{
                        if(doc.length > 0 ){
                            
                            let member = doc[0]
                            let member_id = member._id
                            let member_name = member.name
                            let member_club= member.club_name
                            let rfid = member.rfid
                            
                            let justSaved = new Attender({
                                rfid: rfid,
                                member_id: member_id,
                                member_name: member_name,
                                member_club: member_club
                            })
                            justSaved.save((err, attender) =>{
                                // console.log('attender',attender)
                                Event.findOne({}).sort({createdAt: -1}).exec((err, event) => {
                                    // console.log('event', event)
                                    Attender.findOneAndUpdate({_id: attender._id}, {event_title: event.title, club_name: event.club_name},{new: true},(err,updated)=>{
                                        console.log('attender updated')
                                    })
                                })
                            })

                            console.log('justSaved: ', rfid+" has been saved as attended")
                        }else{
                            // ws.send('0')
                        }
                    })
                    console.log('identified: ',cardIds[cardIds.length-1])
                }else if( cardIds.includes(indata.substring(4,28)) ){
                    
                    ws.send(`../images/${indata.substring(4,28)}.jpg*1`) // already present

                }else if( !allClubMembers.includes(indata.substring(4,28)) ){
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