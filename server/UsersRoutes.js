const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passwords = require('./passwords')
const db = require('./connectDB')
const onlyUsers = require ('./mw')
let users

//get all users
router.use(async (req, res, next) => {
    let q = `SELECT
userId, username, password, isAdmin
FROM vacationsdb.users`
    try {
        const results = await Query(q)
        users = results
    }
    catch (err) {
        res.sendStatus(500)
        throw err

    }
    next()
})

//login and create token to user
router.post('/login', async (req, res) => {
    // ACCESS: all
    const { username, password } = req.body

    if (username && password) {
        const q = `SELECT * FROM users`
        const users = await Query (q)
        const user = users.filter(u => u.username == req.body.username)
        if (user.length) {
            const userObj = user[0]
            if (bcrypt.compareSync(req.body.password, userObj.password)) {
                jwt.sign({ username: userObj.username, isAdmin: userObj.isAdmin, userId: userObj.userId, firstname:userObj.firstname },
                    passwords.JWT_SECRET, { expiresIn: "50m" }, (err, token) => {
                        if (err) {
                            res.sendStatus(500)
                            throw err
                        }
                        console.log(token)
                        res.status(201).json({ "token": token, "u_id": userObj.userId, "isAdmin": userObj.isAdmin, "firstname": userObj.firstname })
                    })
            } else {
                res.status(400).send("wrong password")
            }
        } else {
            res.status(400).send("user not found")
        }
    } else {
        res.status(400).send("missing some info")
    }
})


//register a new user
router.post('/register', async (req, res) => {
    // ACCESS: all

    const { firstname, lastname, username, password, isAdmin } = req.body
    if (firstname && lastname && username && password && isAdmin != undefined) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                console.log(firstname, lastname, username, password, isAdmin)
                let q = `INSERT INTO users
                (firstname, lastname, username, password, isAdmin)
                VALUES
                (
                    "${req.body.firstname}",
                    "${req.body.lastname}",
                    "${req.body.username}",
                    "${hash}",
                    ${req.body.isAdmin}
                )`

                try {
                    const results = await Query(q)
                    console.log(results)
                    res.sendStatus(201)
                }
                catch (err) {
                    res.sendStatus(500)
                    throw err
                }
            })
        })
    } else {
        res.status(400).send("missing some info")
    }
})

module.exports = router

function Query(q, ...par) {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

