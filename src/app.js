const express = require('express')
const db = require('./utils/database')
const quoteRouter = require('./quotes/quotes.router')

const port = 9000
const app = express()

db.authenticate()
    .then(() => {
        console.log('Database authenticated!')
    })
    .catch((err) => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('Database Synchronized')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(express.json)

app.get('/', (req, res) => {
    res.status(200).json({message: 'OK'})
})

app.use('/api/v1', quoteRouter)

app.listen(port, () => {
    console.log(`Server started at port: ${port}`)
})