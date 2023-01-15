const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);
const exp = 3600 // max age of cookie (seconds)
const SECRET_KEY = process.env.SECRET_KEY

// HELLO
const greet = (_, res) => {
    res.json({
        greeting: "Hello Jamix",
        message: "nothing to get here"
    })
}

// REGISTER
const register = async (req, res) => {
    const { email, password, isOwner, isAdmin } = req.body
    const passwordDigest = await bcrypt.hash(password, 11)

    base('users').create({
        "email": email,
        "passwordDigest": passwordDigest,
        "isOwner": isOwner,
        "isAdmin": isAdmin
    }, function (err, record) {
        if (err) {
            console.error(err);
            return;
        }
        const payload = { email: record.fields.email, recordID: record.getId(), isOwner, isAdmin }
        const token = jwt.sign(payload, SECRET_KEY) // encrypt email payload

        delete record.fields.passwordDigest
        res.json({ ...record.fields, recordID: record.getId(), token })
            // .setHeader('Set-Cookie', `token=${token}; Max-Age=${exp}`)
    });
}

// LOGIN
const login = (req, res) => {
    const { email, password } = req.body

    base('users').select({
        view: 'Gridview'
    }).firstPage(async (err, records) => {
        if (err) {
            console.error(err);
            return;
        }

        const user = records.find(record => record.fields.email === email)
        if(user){
            const isAuthorized = await bcrypt.compare(password, user.fields.passwordDigest)
            if (isAuthorized) {
                const payload = { email: user.fields.email, recordID: user.getId(), isOwner: user.fields.isOwner, isAdmin: user.fields.isAdmin }
                const token = jwt.sign(payload, SECRET_KEY)
                
                delete user.fields.passwordDigest
                res.json({ ...user.fields, recordID: user.getId(), token })
                // .setHeader('Set-Cookie', `token=${token}; Max-Age=${exp}`)
            } else {
                res.status(401).json({ error: 'Unauthorized' })
            }
        }else{
            res.status(401).json({ error: 'Unauthorized' })
        }
    });
}

// VERIFY
const verify = (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1] // grabs the token from the Authorization header ('Bearer <token>')
        const decodedToken = jwt.verify(token, SECRET_KEY) // decodes the token obj
        res.json(decodedToken) // responds with decoded value
    } catch (error) {
        res.status(401).json({error: 'Unauthorized', errMsg: error.message})
    }
}

// DESTROY USER
const destroy = (req, res) => {
    const {usersIDs} = req.body
    base('users').destroy(usersIDs, (err, records) => {
        if (err) {
          console.error(err.message);
          return;
        }
        res.status(204).json(records)
    });
}

// UPDATE USER
const update = (req, res) => {
    const {users} = req.body 
    base('users').update(users, function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        res.status(200).json(records)
    });
}

module.exports = {
    register,
    login,
    verify,
    destroy,
    update,
    greet
}