import * as db from './database'

const TABLE_NAME = 'user_fav_sport'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_fav_sport bigserial NOT NULL,
        user_id integer NOT NULL,
        sport_id integer NOT NULL,
        CONSTRAINT user_fav_sport_pkey PRIMARY KEY (id_fav_sport)
    );`;

    return db.query(sql);
}

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export async function getAll() {
    const user_fav_sports = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return user_fav_sports
}

export async function getOne(id_fav_sport) {
    const user_fav_sport = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_fav_sport = $1;`, [id_fav_sport])
    return user_fav_sport
}

export async function createOne(id_user, id_sport) {
    db.query(`INSERT INTO ${TABLE_NAME}(user_id, sport_id) VALUES($1, $2);`, [id_user, id_sport])
}

export async function updateOne(id_fav_sport, id_user, id_sport) {
    db.query(`UPDATE ${TABLE_NAME} 
        SET user_id = $2, sport_id = $3 WHERE id_fav_sport = $1;`
        , [id_fav_sport, id_user, id_sport])
}

export async function deleteOne(id_fav_sport) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_fav_sport = $1;`, [id_fav_sport])
}

export async function getOneByUser(id_user) {
    const user_fav_sports = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE user_id = $1;`, [id_user])
    return user_fav_sports
}

export async function deleteOneByUserIdandSportId(id_user, id_sport) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE (user_id = $1 AND sport_id = $2);`, [id_user, id_sport])
}