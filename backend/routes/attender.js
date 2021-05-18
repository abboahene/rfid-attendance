const express = require('express')
const router = express.Router()
const Attender = require('../models/attender')
const Event = require('../models/event')
const Club = require('../models/club')

router.get('/attenders/:event_title', (req, res) => {
    Attender.find({event_title: req.params.event_title})
    .exec( (err,attenders) => {
        if (err) {
            return res.status(400).send('data not found')
        }
        res.json(attenders)
    })
})

router.get('/attenders/:club_name/:event_title/all', (req, res) => {
    Attender.find({ club_name: req.params.club_name, event_title: req.params.event_title })
    .exec( (err,attenders) => {
        if (err) return res.status(400).send('data not found')
        res.json(attenders)
    })
})

router.get('/attenders/lastest/event', (req, res) => {

    Event.findOne().sort({createdAt: -1}).exec( (err, event) => {
        if (err) return res.status(400).send('data not found')

        Attender.find({event_title: event.title}).exec( (err,attenders) => {
            if (err) return res.status(400).send('data not found')
            
            Event.find().exec((err, events) => {

                Club.find().exec((err, clubs) =>{

                    res.json({attenders: attenders, events: events, clubs: clubs})
                })

            })
        })
    })
})

router.get('/attender/:event_id/:member_id',  (req, res) =>{
    Attender.find({ event_id: req.params.event_id, member_id: req.params.member_id })
    .exec( (err,attender) => {
        if(err) return res.status(400).send('data not found')

        res.json(attender)
    })
})

router.post('/attender', (req, res) => {
    if(!req.body){
        return res.status(400).send('request body is missing')
    }
    let attender = new Attender(req.body)
    attender.save().then( doc => {
        if(!doc || doc.length === 0) return res.status(500).send('sorry, could not be saved')
        res.json(doc)
    })
})

router.post('/attender/:attender_id', (req, res) => {
    Attender.findByIdAndDelete({ _id: req.params.club_id}, (err, attender) => {
        if(err) return res.status(400).send('data not found')
        res.json(attender)
    })
})

module.exports = router