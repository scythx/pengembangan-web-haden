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

/* SPORT*/
//GET ALL SPORTS (TESTED)
app.get('/api/sports/get', function(req, res){
    pool.query('SELECT * FROM sport', function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows);
        res.send(result.rows);
    });
});

//GET SPORT BY ID (TESTED)
app.get('/api/sports/get/:sport_id', function(req, res){
    pool.query('SELECT * FROM sport WHERE id_sport = $1', [req.params.sport_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows[0]);
        res.send(result.rows[0]);
    });
});

//CREATE SPORT
app.post('/api/sports/create', function(req, res){
    pool.query('INSERT INTO sport (id_sport, name) values ($1, $2)', [req.body.id_sport, req.body.name], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        res.redirect('/api/sports/get');
    });
});

//EDIT SPORT
app.put('/api/sports/edit/:sport_id', function(req, res){
    pool.query('UPDATE sport SET name = $2 WHERE id_sport = $1', [req.params.sport_id, req.body.name], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        res.redirect('/api/sports/get');
    });
});

//DELETE SPORT (TESTED)
app.delete('/api/sports/delete/:sport_id', function(req, res){
    pool.query('DELETE FROM sport WHERE id_sport = $1', [req.params.sport_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        res.redirect('/api/sports/get');
    });
});

/*LEAGUE*/
//GET ALL LEAGUES
app.get('/api/leagues/get', function(req, res){
    pool.query('SELECT * FROM league', function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows);
        res.send(result.rows);
    });
});

//GET LEAGUE BY ID
app.get('/api/leagues/get/:league_id', function(req, res){
    pool.query('SELECT * FROM league WHERE id_league = $1', [req.params.league_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows);
        res.send(result.rows);
    });
});

//CREATE LEAGUE
app.post('/api/leagues/create', function(req, res){
    pool.query('INSERT INTO league (id_league, id_sport, name, country) VALUES ($1, $2, $3, $4)', [req.body.id_league, req.body.id_sport, req.body.name, req.body.country], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        res.redirect('/api/leagues/get');
    });
});

//EDIT LEAGUE
app.put('/api/leagues/edit/:league_id', function(req, res){
    pool.query('UPDATE league SET id_sport = $2, name = $3, country = $4 WHERE id_league = $1', [req.params.league_id, req.body.id_sport, req.body.name, req.body.country], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        res.redirect('/api/leagues/get');
    });
});

//DELETE LEAGUE
app.delete('/api/leagues/delete/:league_id', function(req, res){
    pool.query('DELETE FROM league WHERE id_league = $1', [req.params.league_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        res.redirect('/api/leagues/get');
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
