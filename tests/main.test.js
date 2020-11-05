import fs from 'fs'
import _ from 'lodash'
import mime from 'mime'
import request from 'supertest'
import app from '../src/main'
import * as db from '../src/database'
import * as imageStorage from '../src/image-storage'
import * as util from '../src/util'

beforeAll(async () => {
    await app.start()
})

beforeEach(async () => {
    await imageStorage.deleteTable()
    await imageStorage.createTable()
})

afterAll(async () => {
    await app.close()
})

test('image-storage API calls', async () => {
    const postResponse = await
          request(app).post('/api/images')
                      .send({'name': 'Lenna.png'})

    expect(postResponse.status).toBe(200)
    expect(postResponse.type).toBe('application/json')
    expect(_.isNumber(postResponse.body['id'])).toBeTruthy()

    const getResponse = await
          request(app).get(`/api/images/${postResponse.body['id']}`)

    expect(getResponse.status).toBe(200)
    expect(getResponse.type).toBe('application/json')

    const imageBuffer = await
          fs.promises
            .readFile('./tests/resources/lenna.png')

    const putResponse = await
          request(app).put(`/api/images/${postResponse.body['id']}`)
                      .set('Content-Type', mime.getType('png'))
                      .send(imageBuffer)

    expect(putResponse.status).toBe(204)

    const imageResponse = await
          request(app).get(`/assets/${getResponse.body['url']}`)

    expect(imageResponse.status).toBe(200)
    expect(imageResponse.type).toBe(mime.getType('png'))

    expect(util.checksum(imageResponse.body)).toBe(util.checksum(imageBuffer))

    await imageStorage.remove(postResponse.body['id'])
})
