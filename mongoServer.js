const {MongoClient} = require('mongodb')
const {creds} = require('./credentials')

let dbConnection
let uri = `mongodb+srv://${creds.mongoUser}:${creds.mongoPassword}@${creds.mongoCluster}.mongodb.net/`

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}