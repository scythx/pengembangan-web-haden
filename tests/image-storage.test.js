import crypto from 'crypto'
import fs from 'fs'
import * as db from '../src/database'
import * as imageStorage from '../src/image-storage'

beforeAll(() => {
})

beforeEach(async () =>{
    await imageStorage.createTable()
})

afterAll(async () => {
    await db.close()
})

afterEach(async () => {
    await imageStorage.deleteTable()
})

test('image-storage CRUD', async () => {
    var result = await imageStorage.insert({'name': "Lenna",
                                            'extension': ".png"})

    var result = {...await imageStorage.get(result['id']), ...result}

    expect(fs.existsSync(`dist/static/${result.url}`)).toBe(true)

    await imageStorage.update(result['id'],
                              fs.createReadStream('./tests/resources/lenna.png'))

    const files = await
          Promise.all([fs.promises.readFile('./tests/resources/lenna.png'),
                       fs.promises.readFile(`dist/static/${result.url}`)])

    expect(checksum(files[1])).toBe(checksum(files[0]))

    await imageStorage.remove(result['id'])
})

const checksum = (source) => {
    crypto.createHash('md5')
          .update(source, 'utf8')
          .digest('hex')
}
