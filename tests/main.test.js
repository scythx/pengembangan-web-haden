import fs from 'fs'
import request from 'supertest'
import mime from 'mime-types'

let app

beforeAll(() => {
    require('dotenv').config()
    app = require('../src/main').default
})

afterAll(() => {
    app.close()
})

test('File upload', async () => {
    var response = await request(app).post('/api/images')
                                     .send({'name': 'My File.png'})
                                     .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200)
    expect(isNaN(response.body['id'])).toBe(false)

    const image = fs.readFileSync('./tests/resources/lenna.png')

    var response = await request(app).put('/api/images/' + response.body['id'])
                                     .set('Content-Type', mime.lookup('.png'))
                                     .send(image)

    expect(response.statusCode).toBe(204)
})

test('File get', async () => {
     var response = await request(app).get('/api/images')

    console.log(response.body)
})
