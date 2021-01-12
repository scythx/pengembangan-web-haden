import * as db from './database'

const TABLE_NAME = 'article'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_article bigserial NOT NULL,
        thumbnail text COLLATE pg_catalog."default",
        title text COLLATE pg_catalog."default",
        id_author integer,
        content text COLLATE pg_catalog."default",
        date_published text COLLATE pg_catalog."default",
        is_headline boolean,
        id_sport integer,
        id_league integer,
        id_team integer,
        CONSTRAINT article_pkey PRIMARY KEY (id_article)
    );`;

    return db.query(sql);
}