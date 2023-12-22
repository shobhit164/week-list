const app = require('./app')
const connectDB = require('./config/database')

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`server is running on http://localhost:${process.env.PORT}/api/v1`)
})