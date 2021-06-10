const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const Club = require('../models/club')
const Attender = require('../models/attender')

router.get('/events', (req, res) => {
    Event.find({}, (err, events) => {
        if(err) return res.status(404).send('data not found')
        res.json(events)
    })
})

router.get('/clubs_and_events', (req, res) => {
    
    Event.find({}).sort().exec((err, events) =>{
        if(err) return res.status(404).send('data not found')
        Club.find({}).exec((err, clubs) => {
            if(err) return res.status(404).send('data not found')

            let clubsAndEvents = []
            clubs.forEach(club => {
                clubsAndEvents.push({ [club.name]: events.filter(event => event.club_name === club.name) })       
            })

            res.json(clubsAndEvents)
        })
    })
})

router.get('/event/latest', (req, res) => {
    Event.findOne().sort({createdAt: -1}).exec( (err, event) => {
        if(err) return res.status(404).send('data not found')
        res.json(event)
    })
})

router.get('/events/:club_name', (req, res) => {
    Event.find({ club_name: req.params.club_name}, (err, events) => {
        if(err) return res.status(404).send('data not found')
        res.json(events)
    })
})

router.post('/event', (req, res) => {
    if(!req.body){
        return res.status(400).send('request body is missing')
    }
    let event = new Event(req.body)
    event.save().then( doc => {
        if(!doc || doc.length === 0) return res.status(500).send('sorry, could not be saved')
        res.json(doc)
    })
})

router.post('/events/update/:event_name', (req, res) => {
    Event.findOneAndUpdate({ name: req.params.event_name}, req.body, (err, event) => {
        if(err) return res.status(400).send('data not found')
        Attender.updateMany({event_name: req.params.event_name}, {event_name: req.body.name},{upsert: false}, (err, done) =>{
            if(err) return res.status(400).send('data not found')
            res.json(done)
        })
    })
})

router.post('/events/delete/:event_name', (req, res) => {
    Event.findOneAndDelete({ name: req.params.event_name}, (err, event) => {
        if(err) return res.status(400).send('data not found')
        Attender.deleteMany({event_name: req.params.event_name}, (err) =>{
            if(err) return res.status(400).send('data not found')
        })
        res.json(event)
    })
})

module.exports = router