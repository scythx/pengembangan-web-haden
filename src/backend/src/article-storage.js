import * as db from './database'

const TABLE_NAME = 'article'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_article integer NOT NULL,
        title text COLLATE pg_catalog."default",
        author text COLLATE pg_catalog."default",
        content text COLLATE pg_catalog."default",
        date_published date,
        is_headline boolean,
        id_sport integer,
        id_team integer,
        user_id integer,
        CONSTRAINT article_pkey PRIMARY KEY (id_article)
    );`;

    return db.query(sql);
}