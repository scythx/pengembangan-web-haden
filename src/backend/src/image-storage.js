import fs from 'fs'
import path from 'path'
import stream from 'stream'
import util from 'util'
import _ from 'lodash'
import * as uuid from 'uuid'
import * as db from './database'

const STORAGE_ROOT_PATH = path.resolve('dist/public/assets')

const TABLE_NAME = 'images' + ((process.env.NODE_ENV === 'test') ? Date.now()
                                                                 : (''))
export const createTable = async () => {
    return db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                         id INT GENERATED ALWAYS AS IDENTITY,
                         name TEXT NOT NULL,
                         unique_name TEXT NOT NULL,
                         extension TEXT NOT NULL,
                     PRIMARY KEY(ID));`)
}

export const deleteTable = async () => {
    return db.query(`DROP TABLE IF EXISTS ${TABLE_NAME}`)
}

export const get = async (criteria) => {
    if (_.isNumber(criteria))
        return getById(criteria)

    if (_.isPlainObject(criteria))
        return getByCriteria(criteria)

    throw new Error(`Unexpected passed argument ${criteria}.`)
}

const generateStoreId = () => {
    return Buffer.from(uuid.parse(uuid.v4()))
                 .toString('base64')
                 .replace(/\+/g, '-')
                 .replace(/\//g, '_')
                 .replace(/=+$/g, '')
}

const getByCriteria = async (criteria) => {
    if (!_.isPlainObject(criteria))
        throw new Error(`Unexpected passed argument ${criteria}.`)

    if (!_.isNumber(criteria['limit']) ||
        !_.inRange(criteria['limit'], 1, 101)) {
        throw new Error('The limit has to be between 1 to 100.')
    }

    if (!_.isNumber(criteria['offset']) ||
        !_.gte(criteria['offset'], 0)) {
        throw new Error(`The offset has to be more than or equal to 0.`)
    }

    const queryResult = await
          db.query(`SELECT * FROM ${TABLE_NAME} LIMIT $1 OFFSET $2;`,
                   [criteria['limit'], criteria['offset']])

    return queryResult.rows.map((currentValue) => {
        return {
            'id': currentValue['id'],
            'name': currentValue['name'],
            'url': `http://localhost:${process.env.PORT}/assets/\
${currentValue['unique_name']}${currentValue['extension']}`
        }
    })
}

const getById = async (id) => {
    if (!_.isNumber(id))
        return new Error(`Unexpected passed argument ${id}.`)

    const queryResult = await
          db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1;`,
                   [id])

    if (queryResult.rows.length == 0) {
        throw new Error(`Cannot find image with 'id' = '${id}'`)
    }

    return {
        'id': queryResult.rows['id'],
        'name': queryResult.rows[0]['name'] + queryResult.rows[0]['extension'],
        'url': queryResult.rows[0]['unique_name'] + queryResult.rows[0]['extension']
    }
}

export const remove = async (id) => {
    if (!_.isNumber(id)) {
        throw new Error(`Passed argument 'id' with value ${id} is not a number.`)
    }

    const image = await get(id)

    const queryResult = await
          db.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *;`, [id])

    if (queryResult.rows.length === 0)
        throw new Error(`Unable to delete image with id ${id}.`)

    await fs.promises.unlink(path.join(STORAGE_ROOT_PATH, image['url']))
}

export const insert = async (metadata, data = new stream.Readable.from([])) => {
    if (!_.isPlainObject(metadata))
        throw new TypeError(`'metadata' has invalid argument of ${metadata}.`)

    if (!_.isString(metadata['name']))
        throw new TypeError(`Invalid image name of ${metadata['name']}.`)

    if (!isValidImageExtension(metadata['extension']))
        throw new TypeError(`Invalid image extension of \
                             ${metadata['extension']}.`)

    const storeId = generateStoreId()

    const queryResult = await
          db.query(`INSERT INTO ${TABLE_NAME} (name, unique_name, extension)
                    VALUES ($1, $2, $3)
                    RETURNING id;`,
                   [metadata['name'], storeId, metadata['extension']])

    if (queryResult.rows.length == 0) {
        throw new Error(`Unable insert entry to the ${TABLE_NAME} table.`)
    }

    const ws = fs.createWriteStream(path.join(STORAGE_ROOT_PATH,
                                              storeId + metadata['extension']))

    data.pipe(ws)

    await util.promisify(stream.finished)(ws)

    return {
        'id': queryResult.rows[0]['id']
    }
}

const isValidImageExtension = (extension) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(extension)
}

export const update = async (id, data) => {
    if (!_.isNumber(id))
        throw new Error(`Value {id} for 'id' has to be greater than or equal to 0`)

    const queryResult = await
          db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])

    if (queryResult.rows.length == 0) {
        throw "Unable to overwrite content of " + id
    }

    const filename = queryResult.rows[0]['unique_name'] +
          queryResult.rows[0]['extension']

    const ws = fs.createWriteStream(path.join(STORAGE_ROOT_PATH, filename))


    data.pipe(ws)

    await util.promisify(stream.finished)(ws)
}
