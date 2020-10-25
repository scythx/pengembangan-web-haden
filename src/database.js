import {Pool} from 'pg'

require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

const close = () => {
    pool.end()
}

export default {
    'close' : close,
    'pool' :pool
}