import {Pool} from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

export const close = async () => {
    return pool.end()
}

export const query = async (text, params) => {
    return pool.query(text, params)
}
