const mongoose = require('mongoose')

const attenderSchema = new mongoose.Schema({
    member_id: { type: String},
    member_name: { type: String },
    member_club: { type: String },
    rfid:{ type: String },
    club_name: {type: String},
    event_title: {type: String},
    event_desc: {type: String},
},
{ 
    timestamps:{ currentTime: ()=> Date.now() },
});

module.exports = mongoose.model('Attender',attenderSchema)