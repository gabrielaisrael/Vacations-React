const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", require('./UsersRoutes'))
app.use("/vacations", require("./VacationsRouters"))
app.use("/admin", require("./AdminRoutes"))

app.listen(1003, ()=> console.log("rockin1003"))

