const router = require('express').Router()
const db = require('./connectDB')
const { onlyAdmins } = require('./mw')


//add a vacation
router.post('/add', async (req, res) => {

    let q = `INSERT INTO vacations
    (descriptionVacation, destination, img_url, dateGO, dateBack, price)
    VALUES
    ("${req.body.descriptionVacation}","${req.body.destination}",
    "${req.body.img_url}","${req.body.dateGo}",
    "${req.body.dateBack}",${req.body.price})`

    const { descriptionVacation, destination, img_url, dateGo, dateBack, price } = req.body

    if (descriptionVacation && destination && img_url && dateGo && dateBack && price) {
        try {
            const results = await Query(q)
            console.log(results);
            res.status(201).send("added")
        }
        catch (err) {
            res.sendStatus(500)
            throw err
        }
    } else {
        res.status(401).send("missing some info...")
        console.log(req.body)
    }
        })
    

//update a vacation
router.put('/update/:id',  async (req, res) => {

    let q = `UPDATE vacations
    SET 
    descriptionVacation="${req.body.descriptionVacation}", 
    destination="${req.body.destination}",
    img_url="${req.body.img_url}",
    dateGo="${req.body.dateGo}",
    dateBack="${req.body.dateBack}", 
    price=${req.body.price}
    WHERE vacationId=${req.params.id}`

    try {
        const results = await Query(q)
        console.log(results)
        res.status(201).send("updated")
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

//mw to delete
router.use("/delete/:id",  async (req, res, next) => {
    let q = `DELETE from vacations
    WHERE vacationId=${req.params.id}`
    try {
        const results = await Query(q)
        console.log(results)
        res.status(201)
        next()
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

// delete a vacation
router.delete('/delete/:id', async (req, res) => {
    let q = `DELETE FROM vacations WHERE vacationId =${req.params.id}`
    try {
        const results = await Query(q)
        console.log(results)
        res.status(201).send("deleted")
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

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