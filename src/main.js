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
