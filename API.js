const express = require('express')
const {connectToDb, getDb} = require('./mongoServer')
const {ObjectId} = require('mongodb')

const app = express()
app.use(express.json())
let db

connectToDb((err) => {
    if (!err) {
        db = getDb()
    }
})

app.get('/aliens', (req, res) => { 
    //check if specific parameters are requested
    const parameters = {
        name: req.query.name || true,
        species: req.query.species || true,
        home_world: req.query.home_world || true,
        abilities:req.query.abilities || true,
        image: req.query.image || true
    }

    for (let key of Object.keys(parameters)) { //remove parameter if it doesnt === "false". We will only specifiy what params NOT to return later.
        let param = parameters[key]
        if (param !== "false") {
            delete parameters[key]
            continue
        }
        parameters[key] = 0
    }

    parameters._id = 0

    let aliens = []

    db.collection('aliens')
    .find()
    .project(parameters)
    .forEach(alien => aliens.push(alien))
    .then(() => {
        res.status(200).json(aliens)
    })
    .catch(() => {
        res.status(500).json({error: 'could not fetch doc'})
    })
})

app.get('/aliens/:id', (req, res) => { 
    
    db.collection('aliens')
    .findOne({name: req.params.id})
    .then(alien => {
        res.status(200).json(alien)
    })
    .catch(() => {
        res.status(500).json({error: 'could not fetch doc'})
    })
})

module.exports = {app}