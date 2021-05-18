const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    rfid: { type: String},
    name: { type: String },
    club_name: { type: String},
},
{ 
    timestamps:{ currentTime: ()=> Date.now() },
});

module.exports = mongoose.model('Member', memberSchema)