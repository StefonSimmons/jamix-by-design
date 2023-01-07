require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()
const Airtable = require('airtable');


app.use(logger('combined'))
app.use(express.json())
app.use(cors())

const PORT = 3001


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})


// Home
app.get('/', (_, res) => {
    res.json({
        greeting: "Hello Jamix",
        message: "nothing to see here"
    })
})

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const passwordDigest = await bcrypt.hash(password, 11)

    const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);

    base('users').create({
        "username": username,
        "passwordDigest": passwordDigest
    }, function (err, record) {
        if (err) {
            console.error(err);
            return;
        }
        delete record.fields.passwordDigest
        res.json(record.fields)
    });
})