import * as db from './database'
import * as bcrypt from 'bcrypt'

const TABLE_NAME = 'users'

export async function createTable() {
    console.log("here user");
    return db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id_user BIGSERIAL PRIMARY KEY NOT NULL,
        fullname VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL,
        password_digest VARCHAR (60) NOT NULL,
        is_subscribed_newsletter boolean NOT NULL,
        is_writer boolean NOT NULL,
        created_on date NOT NULL
    );`)
}

export async function deleteTable() {
    return db.query(`DROP TABLE ${TABLE_NAME};`)
}

export const authenticate = async ({email, password}) => {
  const queryResult = await db
    .query(`SELECT
              id_user, password_digest
            FROM
              users
            WHERE
             email = $1;`,
           [email])

  const user = queryResult.rows[0]

  const isPasswordMatch = await bcrypt
    .compare(password, user['password_digest'])

  if (!isPasswordMatch)
    return null

  return {
    'id': user['id_user']
  }
}

export async function getAll() {
    const users = await db.query(`SELECT * FROM ${TABLE_NAME};`)
    return users
}

export async function getOne(userId) {
    const user = await db.query(`SELECT * FROM ${TABLE_NAME}
        WHERE id_user = $1;`, [userId])
    return user
}

export async function createOne(fullname, email, password, isSubsribed, isWriter) {
  const password_digest = await bcrypt.hash(password, 10)
    db.query(`INSERT INTO ${TABLE_NAME} VALUES (DEFAULT, $1, $2, $3, $4, $5, NOW());`,
        [fullname, email, password_digest, isSubsribed, isWriter])
}

export async function updateOne(userId, fullname, email, password, isSubsribed, isWriter) {
    db.query(`UPDATE ${TABLE_NAME} 
        SET fullname=$2, email=$3, password=$4, is_subscribed_newsletter=$5, is_writer=$6 WHERE id_user=$1;`
        , [userId, fullname, email, password, isSubsribed, isWriter])
}

export async function deleteOne(userId) {
    db.query(`DELETE FROM ${TABLE_NAME} WHERE id_user = $1;`, [userId])
}

export const isWriter = async (userId) => {
  const user = await
    db
      .query(`SELECT
                *
              FROM
                ${TABLE_NAME}
              WHERE
                id_user = $1;`,
              [userId])

  return user.rows[0]['is_writer']
}
