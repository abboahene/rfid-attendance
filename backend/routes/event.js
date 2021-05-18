const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.get('/events', (req, res) => {
    Event.find({}, (err, events) => {
        if(err) return res.status(404).send('data not found')
        res.json(events)
    })
})

router.get('/event/latest', (req, res) => {
    Event.findOne().sort({createdAt: -1}).exec( (err, event) => {
        if(err) return res.status(404).send('data not found')
        res.json(event)
    })
})

router.get('/events/:event_name', (req, res) => {
    Event.findById({ _id: req.params.event_id}, (err, event) => {
        if(err) return res.status(404).send('data not found')
        res.json(event)
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

router.post('/events/update/:event_id', (req, res) => {
    Event.findByIdAndUpdate({ _id: req.params.event_id}, req.body, (err, event) => {
        if(err) return res.status(400).send('data not found')
        res.json(event)
    })
})

router.post('/events/delete/:event_id', (req, res) => {
    Event.findByIdAndDelete({ _id: req.params.event_id}, (err, event) => {
        if(err) return res.status(400).send('data not found')
        res.json(event)
    })
})

module.exports = router