const {app} = require('./API')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`app running on port: ${PORT}`)
})