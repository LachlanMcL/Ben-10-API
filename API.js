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
    const parameters = checkParameters(req)

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

    const parameters = checkParameters(req)

    db.collection('aliens')
    .findOne({name: req.params.id}, {projection: parameters})
    .then(alien => {
        res.status(200).json(alien)
    })
    .catch(() => {
        res.status(500).json({error: 'could not fetch doc'})
    })
})

function checkParameters(req) {
    //check if specific parameters are requested
    const parameterList = {
        name: req.query.name || true,
        species: req.query.species || true,
        home_world: req.query.home_world || true,
        abilities:req.query.abilities || true,
        image: req.query.image || true
    }

    for (let key of Object.keys(parameterList)) { //remove parameter if it doesnt === "false". We will only specifiy what params NOT to return later.
        let param = parameterList[key]
        if (param !== "false") {
            delete parameterList[key]
            continue
        }
        parameterList[key] = 0
    }

    parameterList._id = 0
    return parameterList
}

module.exports = {app}