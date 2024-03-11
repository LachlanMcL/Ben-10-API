# Ben-10-API
Simple REST API for cartoon I used to watch.

Replace `let uri = 'mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}.mongodb.net/'`
in `API.js` with your own username, password and database cluster. You can just use the free
tier [MongoDB Atlas](https://www.mongodb.com/atlas/database) like I did.

An example of how your database should be set up to hold data of each alien:
```
{
    "name":"Heatblast",
    "species":"Pyronite",
    "home_world":"Pyros",
    "abilities":[
        "Pyrokinesis",
        "Fire Absorption",
        "Fire Constructs",
        ...
        ],
    "image":"https://static.wikia.nocookie.net/ben10/images/7/70/Heatblast_os.png/revision/latest?cb=20230814093452"}
```
All info above was taken from the [Ben 10 wiki page](https://ben10.fandom.com/wiki/Category:Classic_Aliens).

Start the API server by running `node server`, then you can use any fetch method you want
to send GET requests to the server.

# GET all aliens
`GET http://localhost:3001/aliens` will return a list of all aliens in your database.

# GET specific aliens
`GET http://localhost:3001/aliens/alien name` will return a specific alien in your database.

For example `GET http://localhost:3001/aliens/Heatblast` will return a JSON object of just
Heatblasts statisics.

# GET parameters
`GET http://localhost:3001/aliens?parameter=false` will return a list of all aliens without
the specified parameter. 

For example `GET http://localhost:3001/aliens?name=false` will
return a list of JSON objects containing all the statistics except the "name" statistic.

The parameters that can be used are `name`, `species`, `home_world`, `abilities`, and `image`.

These parameter limiters can also be used with specific alien GET requests:
`GET http://localhost:3001/aliens/Heatblast?name=false&home_world=false`

This repository is set up to be run on either a local machine or a node hosting website such as [heroku](heroku.com).