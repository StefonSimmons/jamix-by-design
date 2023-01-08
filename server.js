require('dotenv').config()
const express = require('express')
const logger = require('morgan')

const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
const Airtable = require('airtable');


app.use(logger('combined'))
app.use(express.json())
app.use(cors())

const PORT = 3001
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);
const SECRET_KEY = process.env.SECRET_KEY
const exp = 3600 // max age of cookie (seconds)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})


// Home
app.get('/', (_, res) => {
    res.json({
        greeting: "Hello Jamix",
        message: "nothing to get here"
    })
})

// Register
app.post('/register', async (req, res) => {
    const { email, password, isOwner } = req.body
    const passwordDigest = await bcrypt.hash(password, 11)

    base('users').create({
        "email": email,
        "passwordDigest": passwordDigest,
        "isOwner": isOwner
    }, function (err, record) {
        if (err) {
            console.error(err);
            return;
        }
        const payload = { email: record.fields.email, recordID: record.getId(), isOwner }
        const token = jwt.sign(payload, SECRET_KEY) // encrypt email payload

        delete record.fields.passwordDigest
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${exp}`).json({ ...record.fields, recordID: record.getId() })
    });
})

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body

    base('users').select({
        view: 'Grid view'
    }).firstPage(async (err, records) => {
        if (err) {
            console.error(err);
            return;
        }

        const user = records.find(record => record.fields.email === email)
        if (user) {
            const isAuthorized = await bcrypt.compare(password, user.fields.passwordDigest)
            if (isAuthorized) {
                const payload = { email: user.fields.email, recordID: user.getId(), isOwner: user.fields.isOwner}
                const token = jwt.sign(payload, SECRET_KEY)

                delete user.fields.passwordDigest
                // sets the jwt in an HTTP only cookie which means that they are not accessible to client-side JavaScript. This makes them more persistent, as they cannot be deleted by the user or through a script.
                res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${exp}`).json({ ...user.fields, recordID: user.getId() })
            } else {
                res.status(401).json({ error: 'unauthorized' })
            }
        } else {
            res.status(401).json({ error: 'unauthorized' })
        }
    });

})


app.get('/verify', (req, res) => {
    try {
        const token = req.header('cookie').split('=')[1] // grabs the token from the Cookie header ('token=<token>') set by setHeader
        const decodedToken = jwt.verify(token, SECRET_KEY) // decodes the token obj
        res.json(decodedToken) // responds with decoded value
    } catch (error) {
        res.status(401).json({error: 'Unauthorized', errMsg: error.message})
    }
})