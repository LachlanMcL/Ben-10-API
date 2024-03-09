const express = require('express')
const {connectToDb, getDb} = require('./mongoServer')
const {ObjectId} = require('mongodb')

const app = express()
app.use(express.json())
let db

connectToDb((err) => {
    if (!err) {
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            console.log(`app running on port: ${PORT}`)
        })

        db = getDb()
    }
})

app.get('/aliens', (req, res) => { 
    let aliens = []

    db.collection('aliens')
    .find()
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
