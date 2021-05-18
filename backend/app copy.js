
const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'))

const server = require('http').createServer(app)
const ws = require('ws')
const wss = new ws.Server({ server: server })

const SerialPort = require('serialport')
const usbPort = new SerialPort('COM12')


////for the web server-------------------------------------
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rfid-attendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const Attender = require('./models/attender')
const Member = require('./models/member')

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


// web socket
wss.on('connection', (ws) => {
    console.log('A new client is connected')
    // get RFID data
    let indata = ''
    let cardIds = []
    
    usbPort.on('data',async function (data) {
        console.log("heje")
        indata += data.toString('hex')
        if ( indata.length === 34 ) {
            
            //check if card is already present
            if ( cardIds.includes(indata.substring(4,28)) ) {
                ws.send({error: "Your are already present"});
            }else{
                console.log('in else oo')
                cardIds.push( indata.substring(4,28) )
                // ---send msg to client
                ws.send({cardIds: cardIds});
                Member.find({rfid: indata.substring(4,28)}).exec((err,doc)=>{
                    let member = doc
                    let member_id = member._id
                    let member_name = member.name
                    let club_name = member.club_name
                    
                    let justSaved = new Attender({
                        rfid: indata.substring(4,28),
                        member_id: member_id,
                        member_name: member_name,
                        club_name: club_name
                    })
                    justSaved.save().then((err,doc) => {
                        console.log('justSaved: ', doc[0].rfid+" has been saved in db")
                    })
                    
                })
            }
            indata = ''
        }
        
    })
    
    // recieve msg from client
    ws.on('message', (data) => {
        console.log('data from client: ', data )
        ws.send('Got your message: ', data)
    })
    // Rfid Usb Openning errors
    usbPort.on('error', function(err) {
        console.log('Error: ', err.message)
    })
    
})


///listeners---------------------------------------------------
server.listen('3001', () => console.log('websocket server listening at 3001...'))
app.listen('3002', () => console.log('express listening on port 3002...'))