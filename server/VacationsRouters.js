const router = require('express').Router()
const db = require('./connectDB')

//add a follower to vacation
router.post('/followers/:id', async (req, res) => {
    let q = `INSERT INTO followedVacations
    (u_id, v_id)
    VALUES
    (${req.body.userId},${req.body.vacationId})`

    try {
        const results = await Query(q)
        res.send(results)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

//sum of vacations followers
router.get('/followers', async (req, res) => {
    let q = `SELECT COUNT(v_id) as followersSum,
    vacations.destination
        FROM vacations join followedVacations  on vacations.vacationId = followedVacations.v_id
        group by vacations.vacationId`

    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }

})

//get a vacations that user followed
router.get('/followers/:vId', async (req, res) => {
    let q = `SELECT COUNT(v_id) as followersSum,
    vacations.destination
        FROM vacations join followedVacations  on vacations.vacationId = followedVacations.v_id
        WHERE vacations.vacationId=${req.params.vId}
        group by vacations.vacationId`
    try {
        const results = await Query(q)
        res.json(results);
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

//unfollow a vacation
router.post("/unfollowedVacations", async (req, res) => {
    const vacations = req.body
    let q = `SELECT * FROM vacations WHERE vacationId NOT IN (?)`
    let values = [vacations.map(v => {
        return v.vacationId
    })]
    try {
        const results = await QueryArray(q, values)
        res.send(results)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

// remove follower from vacation
router.delete("/unfollow/:userId/:vId", async (req, res) => {
    let q = `DELETE from followedVacations
            WHERE u_id=${req.params.userId} and v_id=${req.params.vId}`
    try {
        const results = await Query(q)
        res.send(results)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

// Search
router.post("/search", async (req, res) => {
    const { descriptionVacation, dateGo, dateBack } = req.body;
    console.log(req.body)
    let q = `SELECT * FROM vacations WHERE 1=1`
    if (dateGo && dateBack) {
        q += ` AND dateGo > "${dateGo}" AND dateBack < "${dateBack}"`
    }
    if (descriptionVacation !== undefined) {
        q += ` AND descriptionVacation LIKE "%${descriptionVacation}%"`
    }
    try {
        const results = await Query(q)
        console.log(descriptionVacation)
        res.send(results)

    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

// get a vacation of user
router.get("/:id", async (req, res) => {
    let q = ` SELECT 
    vacations.vacationId,
     vacations.descriptionVacation,
     vacations.destination,
     vacations.img_url,
     vacations.dateGo,
     vacations.dateBack,
     vacations.price,
     vacations.followersSum
     FROM vacationsdb.followedVacations
     INNER JOIN users on users.userId = followedVacations.u_id
     INNER JOIN vacations on vacations.vacationId = followedVacations.v_id
     WHERE users.userId = ${req.params.id}`
    try {
        const results = await Query(q)
        res.send(results)

    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
});

//get all vacations
router.get("/", async (req, res) => {
    let q = `SELECT * FROM vacationsdb.vacations`
    try {
        const results = await Query(q)
        res.send(results)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
});

module.exports = router

function Query(q) {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

function QueryArray(q, array) {
    return new Promise((resolve, reject) => {
        db.query(q, array, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}
