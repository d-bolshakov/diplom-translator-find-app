const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const authRouter = require("./routers/auth.router")
const translatorsRouter = require("./routers/translators.router")
const workRouter = require("./routers/work.router")

const app = express()
const PORT = config.get('serverPort')

app.use(cors())
app.use(express.json())
app.use("/api/auth/", authRouter)
app.use("/api/translators/", translatorsRouter)
app.use("/api/work/", workRouter)

const start = async () => {
    try {
        mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log("server started on port", PORT)
        })
    } catch (e) {

    }
 }

 start()