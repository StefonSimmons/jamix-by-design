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
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);


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
    const { email, password } = req.body
    const passwordDigest = await bcrypt.hash(password, 11)


    base('users').create({
        "email": email,
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

        // find user by email. if user is present check their password. 
        // if password matches user pw then success
        const user = records.find(record => record.fields.email === email)
        if(user){
            const isAuthorized = await bcrypt.compare(password, user.fields.passwordDigest)
            if(isAuthorized){
                delete user.fields.passwordDigest
                res.json({...user.fields, recordID: user.getId()})
            }else{
                res.status(401).json({error: 'unauthorized'})
            }
        }else{
            res.status(401).json({error: 'unauthorized'})
        }
    });

})