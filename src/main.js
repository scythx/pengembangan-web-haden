import "core-js"

import path from 'path'
import express from 'express'
import * as db from './database'
import * as imageStorage  from './image-storage'

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
