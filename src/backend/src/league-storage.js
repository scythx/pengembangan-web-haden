import * as db from './database'

const TABLE_NAME = 'league'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_league integer NOT NULL,
        name text COLLATE pg_catalog."default",
        sport_id integer NOT NULL,
        country text COLLATE pg_catalog."default",
        CONSTRAINT league_pkey PRIMARY KEY (id_league),
        CONSTRAINT sport_fkey FOREIGN KEY (sport_id)
            REFERENCES public.sport (id_sport) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID
    );`;

    return db.query(sql);
}

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
