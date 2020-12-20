import path from 'path'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import _ from 'lodash'
import * as db from './database'
import * as articleStorage from './article-storage'
import * as imageStorage  from './image-storage'
import * as matchesStorage from './matches'
import * as userStorage from './user-storage'
import * as sportStorage from './sport-storage'
import * as leagueStorage from './league-storage'
import * as teamStorage from './team'
import * as sequence from './db-sequence'
import * as favSportStorage from './userfavoritesport-storage'
import * as favLeagueStorage from './userfavoriteleague-storage'
import * as favTeamStorage from './userfavoriteteam-storage'
import * as newsletterSubscribers from './model/newsletter-subscribers'

const history = require('connect-history-api-fallback')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(session({
  secret: 'woosh splash',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// const staticMiddleware = express.static(__dirname + '/public')
// app.use(staticMiddleware)
// app.use(history({
//     disableDotRule: true,
//     verbose: true
// }))
// app.use(staticMiddleware)

// app.get('/', function (req, res) {
//     res.render(path.join(__dirname + '/public/index.html'));
// })

const staticMiddleware = express.static(__dirname + '/public')
app.use(staticMiddleware)

app.delete('/api/images/:imageId', async (request, response) => {
    imageStorage.remove(Number(request.params['imageId']))

    response.status(202)
            .end()
})

app.get('/api/images', async (request, response) => {
    request.query['limit'] = Number(request.query['limit'])

    if (_.isNaN(request.query['limit']) ||
        !_.inRange(request.query['limit'], 1, 101))
        request.query['limit'] = 100

    request.query['offset'] = Number(request.query['offset'])

    if (_.isNaN(request.query['offset']) ||
        !_.gte(request.query['limit'], 0))
        request.query['offset'] = 0

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
    response.status(200)
            .json(await imageStorage.insert({
        'name': name,
        'extension': extension
    }))
})

app.put('/api/images/:imageId', async (request, response) => {
    await imageStorage.update(Number(request.params['imageId']), request)

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
//GET ALL SPORTS
app.get('/api/sports/', async (req, res) => {
    const sports = await sportStorage.getAll()
    res.send(await sports.rows)
})

//GET SPORT BY ID
app.get('/api/sports/:sport_id/', async (req, res) => {
    const sport = await sportStorage.getOne(req.params.sport_id)
    res.send(await sport.rows)
})

//CREATE SPORT
app.post('/api/sports/', async (req, res) => {
    const name = req.body.name

    console.log(name)

    await sportStorage.createOne(name)
    res.status(201).send()
})

//EDIT SPORT
app.put('/api/sports/:sport_id/', async (req, res) => {
    const sportId = req.params.sport_id
    const name = req.body.name

    await sportStorage.updateOne(sportId, name)
    res.status(200).send()
})

//DELETE SPORT (TESTED)
app.delete('/api/sports/:sport_id/', async (req, res) => {
    await sportStorage.deleteOne(req.params.sport_id)
    res.status(200).send()
});

/*LEAGUE*/
//GET ALL LEAGUES (TESTED)
app.get('/api/leagues/', async (req, res) => {
    const leagues = await leagueStorage.getAll()
    res.send(await leagues.rows)
})

//GET LEAGUE BY ID (TESTED)
app.get('/api/leagues/:league_id/', async (req, res) => {
    const league = await leagueStorage.getOne(req.params.league_id)
    res.send(await league.rows)
})

//CREATE LEAGUE
app.post('/api/leagues/', async (req, res) => {
    const sportId = req.body.sportId
    const name = req.body.name
    const country = req.body.country

    await leagueStorage.createOne(sportId, name, country)
    res.status(201).send()
})

//EDIT LEAGUE
app.put('/api/leagues/:league_id/', async (req, res) => {
    console.log(req.body.name)
    const leagueId = req.params.league_id
    const sportId = req.body.sportId
    const name = req.body.name
    const country = req.body.country

    await leagueStorage.updateOne(leagueId, sportId, name, country)
    res.status(200).send()
})

//DELETE LEAGUE (TESTED)
app.delete('/api/leagues/:league_id/', async (req, res) => {
    await leagueStorage.deleteOne(req.params.league_id)
    res.status(200).send()
});

app.get('/api/leagues-sport/', async (req, res) => {
    const leagues = await leagueStorage.getJoinLeagueSport();
    res.send(leagues.rows);
})

app.post('/api/leagues-sport/', async (req, res) => {
    const sportName = req.body.sport_name
    const leagueName = req.body.league_name
    const country = req.body.country
    
    await leagueStorage.createWithSportName(sportName, leagueName, country)
    res.status(200).send()
})

app.put('/api/leagues-sport/', async (req, res) => {
    const sportName = req.body.sport_name
    const leagueName = req.body.league_name
    const country = req.body.country
    
    await leagueStorage.updateWithSportName(sportName, leagueName, country)
    res.status(200).send()
})

app.get('/api/articles', function (req, res) {
    db.query(`SELECT article.*, users.fullname
                FROM article
                LEFT JOIN users
                ON id_author = id_user`,
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/:articleId', function (req, res) {
    db.query(`SELECT * FROM article WHERE id_article = ${req.params.articleId}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/sports/:sport', function (req, res) {
    db.query(`SELECT * FROM article WHERE id_sport = ${req.params.sport}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/leagues/:league', function (req, res) {
    db.query(`SELECT * FROM article WHERE id_league = ${req.params.league}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.get('/api/articles/teams/:team', function (req, res) {
    db.query(`SELECT * FROM article WHERE id_team = ${req.params.team}`,
                function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.post('/api/articles/', function(req, res) {
    db.query(`INSERT INTO article(
        thumbnail, title, id_author, content, date_published, is_headline, id_sport, id_league, id_team)
        VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8);`,
        [req.body.thumbnail, req.body.title, req.body.id_author, req.body.content, req.body.is_headline, req.body.id_sport, req.body.id_league, req.body.id_team],
        function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

app.put('/api/articles/:articleId', function(req, res, next) {
    db.query(`UPDATE article SET thumbnail=${req.body.thumbnail}, title=${req.body.title}, id_author=${req.body.id_author}, content=${req.body.content}, date_published=${req.body.date},
                is_headline=${req.body.is_headline}, id_sport=${req.body.id_sport}, id_league=${req.body.id_league}, id_team=${req.body.id_team}
	            WHERE id_article=${req.params.articleId};`,
                function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

app.delete('/api/articles/:articleId', function(req, res, next) {
    db.query(`DELETE FROM article WHERE id_article=${req.params.articleId}`,
        function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
    })
    res.send()
});

// USERS
app.get('/api/users/', async (req, res) => {
    const users = await userStorage.getAll()
    res.send(await users.rows)
})

app.get('/api/users/:id/', async (req, res) => {
    const user = await userStorage.getOne(req.params.id)
    res.send(await user.rows)
})

app.get('/api/users/:id/is_writer', async (req, res) => {
  res.send(await userStorage.isWriter(req.params.id) || false)
})

app.post('/api/users/', async (req, res) => {
    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const isSubscirbedNewsletter = req.body.is_subscribed_newsletter
    const isWriter = req.body.is_writer

    if (isWriter == true) {
        await newsletterSubscribers.insert({email: email})
    }

    await userStorage.createOne(fullname, email, password, isSubscirbedNewsletter, isWriter)
    res.status(201).send()
})

app.put('/api/users/:id/', async (req, res) => {
    const id = req.params.id
    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const isSubscirbedNewsletter = req.body.is_subscribed_newsletter
    const isWriter = req.body.is_writer

    await userStorage.updateOne(id, fullname, email, password, isSubscirbedNewsletter, isWriter)
    res.status(200).send()
})

app.delete('/api/users/:id/', async (req, res) => {
    await userStorage.deleteOne(req.params.id)
    res.status(200).send()
})

// worked (tested)
app.get('/api/teams/', async (req, res) => {
    const teams = await teamStorage.getAllTeam();
    res.send(await teams.rows);
});

// worked (tested)
app.get('/api/teams/:id/', async (req, res) => {
    const team = await teamStorage.getParticularTeam(req.params.id);
    res.send(team.rows);
});

// work (tested)
app.post('/api/teams/', async (req, res) => {
    const team_name = req.body.team_name;
    const team_sport_id = req.body.team_sport_id;
    const team_country = req.body.team_country;

    await teamStorage.insertNewTeam(team_name, team_sport_id, team_country);
    res.status(200).send()
});

// worked (tested)
app.put('/api/teams/:id', async (req, res) => {
    const team_id = req.params.id;
    const team_name = req.body.team_name;
    const team_sport_id = req.body.team_sport_id;
    const team_country = req.body.team_country;

    await teamStorage.updateTeam(team_id, team_name, team_sport_id, team_country);
    res.status(200).send()
});

// work (tested)
app.delete('/api/teams/:id', async (req, res) => {
    await teamStorage.deleteParticularTeam(req.params.id);
    res.status(200).send();
});

app.get('/api/teams-sport/', async(req, res) => {
    const teams = await teamStorage.getJoinTeamSport();
    res.send(teams.rows);
})

/*FAVORITE-SPORT*/
//GET ALL FAV-SPORTS (TESTED)
app.get('/api/fav-sports/', async (req, res) => {
    const favSports = await favSportStorage.getAll()
    res.send(await favSports.rows)
})

//GET FAV-SPORT BY USER ID (TESTED)
app.get('/api/fav-sports/:user_id/', async (req, res) => {
    const favSports = await favSportStorage.getOneByUser(req.params.user_id)
    res.send(await favSports.rows)
})

//CREATE FAV-SPORT (TESTED)
app.post('/api/fav-sports/', async (req, res) => {
    const id_user = req.body.id_user
    const id_sport = req.body.id_sport

    await favSportStorage.createOne(id_user, id_sport)
    res.status(201).send()
})

//DELETE FAV-SPORT (TESTED)
app.delete('/api/fav-sports/:id_fav', async (req, res) => {
    await favSportStorage.deleteOne(req.params.id_fav)
    res.status(200).send()
});
app.delete('/api/fav-sports/', async (req, res) => {
    const id_user = req.body.id_user
    const id_sport = req.body.id_sport
    await favSportStorage.deleteOneByUserIdandSportId(id_user, id_sport)
    res.status(200).send()
});

/*FAVORITE-LEAGUE*/
//GET ALL FAV-LEAGUE (TESTED)
app.get('/api/fav-leagues/', async (req, res) => {
    const favLeagues = await favLeagueStorage.getAll()
    res.send(await favLeagues.rows)
})

//GET FAV-LEAGUE BY USER ID (TESTED)
app.get('/api/fav-leagues/:user_id/', async (req, res) => {
    const favLeagues = await favLeagueStorage.getOneByUser(req.params.user_id)
    res.send(await favLeagues.rows)
})

//CREATE FAV-LEAGUE (TESTED)
app.post('/api/fav-leagues/', async (req, res) => {
    const id_user = req.body.id_user
    const id_league = req.body.id_league

    await favLeagueStorage.createOne(id_user, id_league)
    res.status(201).send()
})

//DELETE FAV-LEAGUE (TESTED)
app.delete('/api/fav-leagues/:id_fav', async (req, res) => {
    await favLeagueStorage.deleteOne(req.params.id_fav)
    res.status(200).send()
});
app.delete('/api/fav-leagues/', async (req, res) => {
    const id_user = req.body.id_user
    const id_league = req.body.id_league
    await favLeagueStorage.deleteOneByUserIdandLeagueId(id_user, id_league)
    res.status(200).send()
});

/*FAVORITE-TEAM*/
//GET ALL FAV-TEAM (TESTED)
app.get('/api/fav-teams/', async (req, res) => {
    const favTeams = await favTeamStorage.getAll()
    res.send(await favTeams.rows)
})

//GET FAV-TEAM BY USER ID (TESTED)
app.get('/api/fav-teams/:user_id/', async (req, res) => {
    const favTeams = await favTeamStorage.getOneByUser(req.params.user_id)
    res.send(await favTeams.rows)
})

//CREATE FAV-TEAM (TESTED)
app.post('/api/fav-teams/', async (req, res) => {
    const id_user = req.body.id_user
    const id_team = req.body.id_team
    await favTeamStorage.createOne(id_user, id_team)
    res.status(201).send()
})

//DELETE FAV-TEAM (TESTED)
app.delete('/api/fav-teams/:id_fav', async (req, res) => {
    await favTeamStorage.deleteOne(req.params.id_fav)
    res.status(200).send()
});
app.delete('/api/fav-teams/', async (req, res) => {
    const id_user = req.body.id_user
    const id_team = req.body.id_team
    await favTeamStorage.deleteOneByUserIdandTeamId(id_user, id_team)
    res.status(200).send()
});

app.post('/api/sessions', async (req, res) => {
  const identity = await userStorage.authenticate(req.body)

  if (identity == null)
    return res
      .status(401)
      .end();

  await new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      req.session.identity = identity
      resolve()
    })
  })

  res
    .status(200)
    .json(identity)
})

app.delete('/api/sessions', async (req, res) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      resolve()
    })
  })

  res
    .status(204)
    .end()
})

app.get('/api/ping', async(req, res) => {
  res.json(req.session.identity)
})

app.post('/api/newsletter_subscribers', async (req, res) => {
  await newsletterSubscribers.insert({email: req.body.email})
  res.end()
})

app.post('/api/actions/broadcast', async (req, res) => {
  await newsletterSubscribers.broadcast()
  res.end()
})

app.start = async () => {
    try {
        await sportStorage.createTable()
        await leagueStorage.createTable()
        await imageStorage.createTable()
        await sportStorage.createTable()
        await userStorage.createTable()
        await teamStorage.createTable()
        await matchesStorage.createTable()
        await articleStorage.createTable()
        await favSportStorage.createTable()
        await favLeagueStorage.createTable()
        await favTeamStorage.createTable()
        //await sequence.createSequence()

        const server = app.listen(port, () => {
            console.log(`app listening at http://localhost:${port}`)
        })

        app.close = async () => {
            await new Promise((resolve) => {
                server.close(() => {
                    resolve()
                })
            })
            await db.close()
        }
    }
    catch (err) {
        console.error(err)
    }
}

if (process.env.NODE_ENV !== 'test') {
    app.start()
}

export default app
