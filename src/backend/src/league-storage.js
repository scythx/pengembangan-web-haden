import { sortedUniq } from 'lodash'
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

/*export async function createWithSportName(sportName, leagueName, country){
    const sql = `INSERT INTO sport(name) SELECT $1 WHERE NOT EXISTS(SELECT 1 FROM sport WHERE name=$1);
    INSERT INTO league(name, sport_id, country) VALUES($2, (SELECT id_sport FROM sport WHERE name=$1), $3);`

    db.query(sql, [sportName, leagueName, country])

}

export async function updateWithSportName(id, sportName, leagueName, country){
    const status = db.query('SELECT EXISTS (SELECT 1 FROM sport WHERE name=$1)', [sportName])

    if(status){
        const sport_id = db.query('SELECT id_sport from SPORT where name=$1', [sportName])
    }
    else{
        db.query('INSERT INTO sport(name) VALUES($1)', [sportName])
        const sport_id = db.query('SELECT id_sport from SPORT where name=$1', [sportName])
    }

    this.updateOne(id, sport_id, leagueName, country)

}*/

export async function updateOne(leagueId, sportId, name, country) {
    db.query(`UPDATE ${TABLE_NAME} 
    SET id_sport = $2, name = $3, country = $4 WHERE id_league = $1;`
        , [leagueId, sportId, name, country])
}

export async function deleteOne(leagueId) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_league = $1;`, [leagueId])
}

export async function getJoinLeagueSport(){
    let sql = `SELECT ${TABLE_NAME}.id_league, sport.name as sport_name, ${TABLE_NAME}.name, ${TABLE_NAME}.country
            FROM ${TABLE_NAME} JOIN sport ON ${TABLE_NAME}.sport_id = sport.id_sport`;
    return db.query(sql)
}
