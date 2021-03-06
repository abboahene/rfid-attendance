const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: { type: String},
    club_name: {type: String},
}, 
{ 
    timestamps:{ currentTime: ()=> Date.now() },
});

module.exports = mongoose.model('Event',eventSchema)