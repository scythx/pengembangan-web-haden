const express = require('express')
const {Pool} = require('pg')

const app = express()
const port = 8080
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: 'secret'
})

app.use(express.json())

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
