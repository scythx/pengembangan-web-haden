import "core-js"

require('dotenv').config()

import express from 'express'
import {Pool} from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/api/articles', function (req, res, next) {
    pool.query(`SELECT * FROM public.article`, 
                function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/:articleId', function (req, res, next) {
    pool.query(`SELECT * FROM public.article WHERE id_article = ${req.params.articleId}`, 
                function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/sports/:sport', function (req, res, next) {
    pool.query(`SELECT * FROM public.article WHERE id_sport = ${req.params.sport}`, 
                function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/leagues/:league', function (req, res, next) {
    pool.query(`SELECT * FROM public.article WHERE id_league = ${req.params.league}`, 
                function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/teams/:team', function (req, res, next) {
    pool.query(`SELECT * FROM public.article WHERE id_team = ${req.params.team}`, 
                function (err, result) {    
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.post('/api/articles/', function(req, res, next) {
    pool.query(`INSERT INTO public.article(
        id_article, title, content, date_published, is_headline, id_sport, id_league, id_team)
        VALUES (5, $1, $2, $3, $4, $5, $6, $7);`,
        [req.body.judul,req.body.konten,req.body.date,req.body.is_headline,req.body.id_sport,req.body.id_league,req.body.id_team], 
        function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

app.put('/api/articles/:articleId', function(req, res, next) {
    pool.query(`UPDATE public.article SET title=${req.body.title}, content=${req.body.content}, date_published=${req.body.date}, 
                is_headline=${req.body.is_headline}, id_sport=${req.body.id_sport}, id_league=${req.body.id_league}, id_team=${req.body.id_team}
	            WHERE id_article=${req.params.articleId};`, 
                function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

app.delete('/api/articles/:articleId', function(req, res, next) {
    pool.query(`DELETE FROM public.article WHERE id_article=${req.params.articleId}`, 
        function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
