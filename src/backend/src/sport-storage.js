import * as db from './database'

const TABLE_NAME = 'sport'

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export async function getAll() {
    const sports = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return sports
}

export async function getOne(sportId) {
    const sport = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_sport = $1;`, [sportId])
    return sport
}

export async function createOne(name) {
    console.log(name)
    db.query(`INSERT INTO ${TABLE_NAME}(name) VALUES($1);`, [name])
}

export async function updateOne(sportId, name) {
    db.query(`UPDATE ${TABLE_NAME} 
        SET name = $2 WHERE id_sport = $1;`
        , [sportId, name])
}

export async function deleteOne(sportId) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_sport = $1;`, [sportId])
}
