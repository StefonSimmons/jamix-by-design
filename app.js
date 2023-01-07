const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(logger('combined'))
app.use(express.json())
app.use(cors)

const PORT = 3001

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`)
})


app.get('/',(_ ,res) => {
    res.json({
        greeting: "Hello Jamix",
        message: "nothing to see here"
    })
})