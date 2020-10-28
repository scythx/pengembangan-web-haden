import * as db from './database'


// work (tested) 
async function getAllTeam(){
    let sql = "SELECT * FROM Team";
    const result = await db.query(sql);
    console.table(result.rows);
    return result;
}

// work (tested)
async function getParticularTeam(_id){
    let sql = "SELECT * FROM Team WHERE id_team = $1";
    const result = await db.query(sql, [_id]);
    console.table(result.rows);
    return result;
}

// work (tested)
async function insertNewTeam(_id, _name, _sportId, _country){
    let sql = "INSERT INTO Team (id_team, name, sport_id, country) VALUES ($1, $2, $3, $4)";
    db.query(sql, [_id, _name, _sportId, _country]);
}

// work (tested)
async function updateTeam(_id, _name, _sportId, _country){
    let sql = "UPDATE Team SET name = $1, sport_id =$2, country = $3 WHERE id_team = $4";
    db.query(sql, [_name, _sportId, _country, _id])
}

// work (tested)
async function deleteParticularTeam(_id){
    let sql = "DELETE FROM Team WHERE id_team = $1";
    db.query(sql, [_id]);
}
