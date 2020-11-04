import * as db from './database'


const TABLE_NAME = 'Teams';
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        team_id BIGSERIAL PRIMARY KEY NOT NULL,
        team_name VARCHAR(255) NOT NULL,
        team_sport_id INT NOT NULL,
        team_country VARCHAR(255) NOT NULL
    );`;

    return db.query(sql);
}

// work (tested) 
export async function getAllTeam(){
    let sql = `SELECT * FROM ${TABLE_NAME};`;
    const result = await db.query(sql);
    console.table(result.rows);
    return result;
}

// work (tested)
export async function getParticularTeam(_id){
    let sql = `SELECT * FROM ${TABLE_NAME} WHERE team_id = $1;`;
    const result = await db.query(sql, [_id]);
    console.table(result.rows);
    return result;
}

// work (tested)
export async function insertNewTeam(_name, _sportId, _country){
    let sql = `INSERT INTO ${TABLE_NAME} (team_name, team_sport_id, team_country) VALUES ($1, $2, $3);`;
    db.query(sql, [_name, _sportId, _country]);
}

// work (tested)
export async function updateTeam(_id, _name, _sportId, _country){
    let sql = `UPDATE ${TABLE_NAME} SET team_name = $1, team_sport_id =$2, team_country = $3 WHERE team_id = $4;`;
    db.query(sql, [_name, _sportId, _country, _id])
}

// work (tested)
export async function deleteParticularTeam(_id){
    let sql = `DELETE FROM ${TABLE_NAME} WHERE team_id = $1;`;
    db.query(sql, [_id]);
}
