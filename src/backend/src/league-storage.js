import * as db from './database'

const TABLE_NAME = 'league'

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export async function getAll() {
    const leagues = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return leagues
}

export async function getOne(leagueId) {
    const league = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_league = $1;`, [leagueId])
    return league
}

export async function createOne(sportId, name, country) {
    db.query(`INSERT INTO ${TABLE_NAME} VALUES (DEFAULT, $1, $2, $3);`,
        [sportId, name, country])
}

export async function updateOne(leagueId, sportId, name, country) {
    db.query(`UPDATE ${TABLE_NAME} 
    SET id_sport = $2, name = $3, country = $4 WHERE id_league = $1;`
        , [leagueId, sportId, name, country])
}

export async function deleteOne(leagueId) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_league = $1;`, [leagueId])
}
