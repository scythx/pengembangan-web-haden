import * as db from './database'

const TABLE_NAME = 'user_fav_league'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_fav_league bigserial NOT NULL,
        user_id integer NOT NULL,
        league_id integer NOT NULL,
        CONSTRAINT user_fav_league_pkey PRIMARY KEY (id_fav_league)
    );`;

    return db.query(sql);
}

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export async function getAll() {
    const user_fav_leagues = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return user_fav_leagues
}

export async function getOne(id_fav_league) {
    const user_fav_league = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_fav_league = $1;`, [id_fav_league])
    return user_fav_league
}

export async function createOne(id_user, id_league) {
    db.query(`INSERT INTO ${TABLE_NAME}(user_id, league_id) VALUES($1, $2);`, [id_user, id_league])
}

export async function updateOne(id_fav_league, id_user, id_league) {
    db.query(`UPDATE ${TABLE_NAME} 
        SET user_id = $2, league_id = $3 WHERE id_fav_league = $1;`
        , [id_fav_league, id_user, id_league])
}

export async function deleteOne(id_fav_league) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_fav_league = $1;`, [id_fav_league])
}

export async function getOneByUser(id_user) {
    const user_fav_leagues = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE user_id = $1;`, [id_user])
    return user_fav_leagues
}

export async function deleteOneByUserIdandLeagueId(id_user, id_league) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE (user_id = $1 AND league_id = $2);`, [id_user, id_league])
}