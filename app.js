const express = require('express')
const allUserRoutes = require('./routes/user')
const allWeekListRoutes = require('./routes/weeklist')
const allTaskRoutes = require('./routes/task')
const {config} = require('dotenv')
const cookieParser = require('cookie-parser')
const app = express()

config({
    path : './config/config.env'
})

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', allUserRoutes)
app.use('/api/v1', allWeekListRoutes)
app.use('/api/v1', allTaskRoutes)

module.exports = app