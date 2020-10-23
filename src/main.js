import "core-js"

require('dotenv').config()

import express from 'express'
import {Pool} from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

const app = express()
const port = process.env.PORT

app.use(express.json())

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
