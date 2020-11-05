import fs from 'fs'
import * as db from '../src/database'
import * as imageStorage from '../src/image-storage'
import * as util from '../src/util'

beforeEach(async () =>{
    await imageStorage.deleteTable()
    await imageStorage.createTable()
})

afterAll(async () => {
    await db.close()
})

test('image-storage CRUD', async () => {
     var result = await imageStorage.insert({'name': "Lenna",
                                             'extension': ".png"})

    var result = {...await imageStorage.get(result['id']), ...result}

    expect(fs.existsSync(`dist/public/assets/${result.url}`)).toBe(true)

    await imageStorage.update(result['id'],
                              fs.createReadStream('./tests/resources/lenna.png'))

    const files = await
          Promise.all([fs.promises.readFile('./tests/resources/lenna.png'),
                       fs.promises.readFile(`dist/public/assets/${result.url}`)])

    expect(util.checksum(files[1])).toBe(util.checksum(files[0]))

    await imageStorage.remove(result['id'])
})
