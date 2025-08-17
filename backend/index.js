const express = require('express')
const { router } = require('./routes/routes.js')
const { database } = require('./db/db.js')
const env = require('dotenv').config()
const cors = require('cors')
const cookieparser = require('cookie-parser')

const app = express()
const port = process.env.port

app.use(express.json())


app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // optional
}));

app.use('/api',router)
app.use(cookieparser())

database()

app.listen(port,()=>{
    console.log(`server started on port : ${port}`)
})