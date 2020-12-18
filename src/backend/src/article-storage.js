import * as db from './database'

const TABLE_NAME = 'article'
export async function createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        id_article bigserial NOT NULL,
        thumbnail text COLLATE pg_catalog."default",
        title text COLLATE pg_catalog."default",
        id_author integer,
        content text COLLATE pg_catalog."default",
        date_published date,
        is_headline boolean,
        id_sport integer,
        id_league integer,
        id_team integer,
        CONSTRAINT article_pkey PRIMARY KEY (id_article),
        CONSTRAINT league_fk FOREIGN KEY (id_league)
            REFERENCES public.league (id_league) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID,
        CONSTRAINT sport_fk FOREIGN KEY (id_sport)
            REFERENCES public.sport (id_sport) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID,
        CONSTRAINT team_fk FOREIGN KEY (id_team)
            REFERENCES public.team (id_team) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID,
        CONSTRAINT user_fk FOREIGN KEY (id_author)
            REFERENCES public.users (id_user) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID
    );`;

    return db.query(sql);
}