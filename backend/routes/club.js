const express = require('express')
const router = express.Router()
const Club = require('../models/club')

router.get('/clubs', (req, res) => {
    Club.find({}, (err, clubs) => {
        if(err) return res.status(404).send('data not found')
        res.json(clubs)
    })
})

router.get('/clubs/:club_id', (req, res) => {
    Club.findById({ _id: req.params.club_id}, (err, club) => {
        if(err) return res.status(404).send('data not found')
        res.json(club)
    })
})

router.post('/club', (req, res) => {
    if(!req.body){
        console.log(req.body)
        return res.status(400).send('request body is missing')
    }
    let club = new Club(req.body)
    club.save().then( doc => {
        if(!doc || doc.length === 0) return res.status(500).send('sorry, could not be saved')
        res.json(doc)
    })
})

router.post('/clubs/update/:club_id', (req, res) => {
    Club.findByIdAndUpdate({ _id: req.params.club_id}, req.body, (err, club) => {
        if(err) return res.status(400).send('data not found')
        res.json(club)
    })
})

router.post('/clubs/delete/:club_id', (req, res) => {
    Club.findByIdAndDelete({ _id: req.params.club_id}, (err, club) => {
        if(err) return res.status(400).send('data not found')
        res.json(club)
    })
})

module.exports = router