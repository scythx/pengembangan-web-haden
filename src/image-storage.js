import fs from 'fs'
import path from 'path'
import * as uuid from 'uuid'
import db from './database'

const storagePath = path.resolve('dist/static')

export const createTable = async () => {
    return db.pool.query(`CREATE TABLE IF NOT EXISTS images (
                              id INT GENERATED ALWAYS AS IDENTITY,
                              name TEXT NOT NULL,
                              unique_name TEXT NOT NULL,
                              extension TEXT NOT NULL,
                          PRIMARY KEY(ID));`)
}

export const getOne = async (id) => {
    const queryResult =
          await db.pool.query(`SELECT * FROM images WHERE id = $1;`,
                              [id])

    if (queryResult.rows == 0) {
        throw `Cannot find image with 'id' = '${id}'`
    }

    return {
        'id': queryResult.rows['id'],
        'name': queryResult.rows[0]['name'] + queryResult.rows[0]['extension'],
        'url': queryResult.rows[0]['unique_name'] + queryResult.rows[0]['extension']
    }
}

export const getMany = async (criteria) => {
    if (criteria['limit'] > 100) {
        criteria['limit'] = 100
    }

     const queryResult =
          await db.pool.query(`SELECT * FROM images LIMIT $1 OFFSET $2;`,
                              [criteria['limit'], criteria['offset']])

    return queryResult.rows.map((currentValue) => {
        return {
            'id': currentValue['id'],
            'name': currentValue['name'] + currentValue['extension'],
            'url': currentValue['unique_name'] + currentValue['extension']
        }
    })
}

const generateBaseName = () => {
    return Buffer.from(uuid.parse(uuid.v4()))
                 .toString('base64')
                 .replace('+', '-')
                 .replace('/', '_')
                 .replace(/=+$/, '')
}

export const insertEmpty = async (data) => {
    if (!isValidImageExtension(data['extension'])) {
        throw "Invalid image extension"
    }

    const baseName = generateBaseName()

    const queryResult =
          await db.pool
                  .query(`INSERT INTO images (name, unique_name, extension)
                          VALUES ($1, $2, $3)
                          RETURNING id;`,
                         [data['name'], baseName, data['extension']])

    if (queryResult.rows.length == 0) {
        throw "Unable to insert entry to table `images` to database."
    }

    await fs.promises.writeFile(path.join(storagePath, baseName + data['extension']), "")

    return {
        'id': queryResult.rows[0]['id']
    }
}

export const overwrite = async (data) => {
    const queryResult =
          await db.pool.query(`SELECT * FROM images WHERE id = $1`, [data['id']])

    if (queryResult.rows.length == 0) {
        throw "Unable to overwrite content of " + data['id']
    }

    await new Promise((resolve) => {
        const fileName = queryResult.rows[0]['unique_name'] + queryResult.rows[0]['extension']

        const writable = fs.createWriteStream(path.join(storagePath, fileName))

        writable.on('finish', () => {
            resolve()
        })

        data['content'].pipe(writable)
    })
}

const isValidImageExtension = (extension) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(extension)
}
