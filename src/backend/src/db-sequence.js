import * as db from './database'

export async function createSequence(){
    let sql = `
    CREATE SEQUENCE public."articleId_sequence"
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 100000
        CACHE 1;

    CREATE SEQUENCE public."leagueId_sequence"
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 10000
        CACHE 1;

    CREATE SEQUENCE public."sportId_sequence"
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 10000
        CACHE 1;
    
    CREATE SEQUENCE public."teamId_sequence"
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 10000
        CACHE 1;
    ;`;

    return db.query(sql);
}