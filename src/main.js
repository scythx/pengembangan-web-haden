import 'core-js'

import path from 'path'
import express from 'express'
import * as db from './database'
import * as imageStorage  from './image-storage'
import * as matchesStorage from './matches'

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.delete('/api/images/:imageId', async (request, response) => {
    imageStorage.deleteOne(Number(request.params['imageId']))

    response.status(202)
            .end()
})

app.get('/api/images', async (request, response) => {
    if (request.query['limit'] === undefined) {
        request.query['limit'] = 100
    }

    if (request.query['offset'] === undefined) {
        request.query['offset'] = 0
    }

    response.json(await imageStorage.get({
        'limit': request.query['limit'],
        'offset': request.query['offset']}))
})

app.get('/api/images/:imageId', async (request, response) => {
    response.json(await imageStorage.get(Number(request.params['imageId'])))
})

app.post('/api/images', async (request, response) => {
    const filename = request.body['name']
    const extension = path.extname(filename)
    const name = path.basename(filename, extension)

    response.json(await imageStorage.insertEmpty({
        'name': name,
        'extension': extension
    }))
})

app.put('/api/images/:imageId', async (request, response) => {
    await imageStorage.update({
        'id': Number(request.params['imageId']),
        'content': request
    })

    response.status(204)
            .end()
})

//get all match
app.get('/api/matches/', async (req, res) => {
    const matches = await matchesStorage.getAll()
    res.send(await matches.rows)
});

//get one match by id
app.get('/api/matches/:id/', async (req, res) => {
    const match = await matchesStorage.getOne(req.params.id)
    res.send(await match.rows)
})

//insert match data
app.post('/api/matches/', async (req, res) => {
    const home_team = req.body.home_team_id
    const away_team = req.body.away_team_id
    const home_score = req.body.home_score
    const away_score = req.body.away_score
    const sport = req.body.sport_id
    const league = req.body.league_id

    await matchesStorage.insertOne(home_team, away_team, home_score, away_score, sport, league)
    res.status(201).send()
})

//get matches based on sport
app.get('/api/matches/sports/:id/', async (req, res) => {
    const matches = await matchesStorage.getMatchesBySport(req.params.id)
    res.send(await matches.rows)
})

//get matches based on league
app.get('/api/matches/leagues/:id/', async (req, res) => {
    const matches = await matchesStorage.getMatchesByLeague(req.params.id)
    res.send(await matches.rows)
})

app.put('/api/matches/:id/', async (req, res) => {
    const id = req.params.id
    const home_team = req.body.home_team_id
    const away_team = req.body.away_team_id
    const home_score = req.body.home_score
    const away_score = req.body.away_score
    const sport = req.body.sport_id
    const league = req.body.league_id

    await matchesStorage.overwrite(id, home_team, away_team, home_score, away_score, sport, league)
    res.status(204).send()
})

app.delete('/api/matches/:id/', async (req, res) => {
    await matchesStorage.deleteRow(req.params.id)
    res.status(200).send()
})

/* SPORT*/
//GET ALL SPORTS (TESTED)
app.get('/api/sports/get', function(req, res){
    db.query('SELECT * FROM sport', function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows);
        //res.send(result.rows);
    });
});

//GET SPORT BY ID (TESTED)
app.get('/api/sports/get/:sport_id', function(req, res){
    db.query('SELECT * FROM sport WHERE id_sport = $1', [req.params.sport_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows[0]);
        //res.send(result.rows[0]);
    });
});

//CREATE SPORT
app.post('/api/sports/create', function(req, res){
    db.query('INSERT INTO sport (id_sport, name) values ($1, $2)', [req.body.id_sport, req.body.name], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/sports/get');
    });
});

//EDIT SPORT
app.put('/api/sports/edit/:sport_id', function(req, res){
    db.query('UPDATE sport SET name = $2 WHERE id_sport = $1', [req.params.sport_id, req.body.name], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/sports/get');
    });
});

//DELETE SPORT (TESTED)
app.delete('/api/sports/delete/:sport_id', function(req, res){
    db.query('DELETE FROM sport WHERE id_sport = $1', [req.params.sport_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/sports/get');
    });
});

/*LEAGUE*/
//GET ALL LEAGUES (TESTED)
app.get('/api/leagues/get', function(req, res){
    db.query('SELECT * FROM league', function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows);
        //res.send(result.rows);
    });
});

//GET LEAGUE BY ID (TESTED)
app.get('/api/leagues/get/:league_id', function(req, res){
    db.query('SELECT * FROM league WHERE id_league = $1', [req.params.league_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result.rows[0]);
        //res.send(result.rows[0]);
    });
});

//CREATE LEAGUE
app.post('/api/leagues/create', function(req, res){
    db.query('INSERT INTO league (id_league, id_sport, name, country) VALUES ($1, $2, $3, $4)', [req.body.id_league, req.body.id_sport, req.body.name, req.body.country], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/leagues/get');
    });
});

//EDIT LEAGUE
app.put('/api/leagues/edit/:league_id', function(req, res){
    db.query('UPDATE league SET id_sport = $2, name = $3, country = $4 WHERE id_league = $1', [req.params.league_id, req.body.id_sport, req.body.name, req.body.country], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/leagues/get');
    });
});

//DELETE LEAGUE
app.delete('/api/leagues/delete/:league_id', function(req, res) {
    db.query('DELETE FROM league WHERE id_league = $1', [req.params.league_id], function(err, result){
        if(err){
            return console.error('error running query', err);
        }
        console.log(result);
        //res.redirect('/api/leagues/get');
    });
});

app.get('/api/articles', function (req, res, next) {
    db.query(`SELECT * FROM public.article`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/:articleId', function (req, res, next) {
    db.query(`SELECT * FROM public.article WHERE id_article = ${req.params.articleId}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/sports/:sport', function (req, res, next) {
    db.query(`SELECT * FROM public.article WHERE id_sport = ${req.params.sport}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/leagues/:league', function (req, res, next) {
    db.query(`SELECT * FROM public.article WHERE id_league = ${req.params.league}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/teams/:team', function (req, res, next) {
    db.query(`SELECT * FROM public.article WHERE id_team = ${req.params.team}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.post('/api/articles/', function(req, res, next) {
    db.query(`INSERT INTO public.article(
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
    db.query(`UPDATE public.article SET title=${req.body.title}, content=${req.body.content}, date_published=${req.body.date},
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
    db.query(`DELETE FROM public.article WHERE id_article=${req.params.articleId}`,
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

(async () => {
    await imageStorage.createTable()

    const server = app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })

    app.close = async () => {
        server.close()
        await db.close()
    }
})().catch((err) => {
    console.error(err)
})

export default app
