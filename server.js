require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const {register, verify, login, destroy, greet, update} = require('./controllers')

const app = express()

// MIDDLEWARE
app.use(logger('combined'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001


// ======================
// Express Routes for Responses
// ======================
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Greet
app.get('/', greet)

// Register
app.post('/register', register)

// Login
app.post('/login', login)

// Verify
app.get('/verify', verify)

// Delete User. post request because I'm sending an array of IDs
app.post('/delete', destroy)

// Update User. post req because I'm sending an array of users
app.post('/update', update)