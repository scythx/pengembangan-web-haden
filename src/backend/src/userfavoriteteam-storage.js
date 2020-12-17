import * as db from './database'

const TABLE_NAME = 'user_fav_team'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_fav_team bigserial NOT NULL,
        user_id integer NOT NULL,
        team_id integer NOT NULL,
        CONSTRAINT user_fav_team_pkey PRIMARY KEY (id_fav_team)
    );`;

    return db.query(sql);
}

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export async function getAll() {
    const user_fav_teams = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return user_fav_teams
}

export async function getOne(id_fav_team) {
    const user_fav_team = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_fav_team = $1;`, [id_fav_team])
    return user_fav_team
}

export async function createOne(id_user, id_team) {
    db.query(`INSERT INTO ${TABLE_NAME}(user_id, team_id) VALUES($1, $2);`, [id_user, id_team])
}

export async function updateOne(id_fav_team, id_user, id_team) {
    db.query(`UPDATE ${TABLE_NAME} 
        SET user_id = $2, team_id = $3 WHERE id_fav_team = $1;`
        , [id_fav_team, id_user, id_team])
}

export async function deleteOne(id_fav_team) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_fav_team = $1;`, [id_fav_team])
}

export async function getOneByUser(id_user) {
    const user_fav_teams = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE user_id = $1;`, [id_user])
    return user_fav_teams
}

export async function deleteOneByUserIdandTeamId(id_user, id_team) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE (user_id = $1 AND team_id = $2);`, [id_user, id_team])
}