import * as db from '../database'
const nodemailer = require("nodemailer")

let smtp = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'newsharden@gmail.com',
      pass: 'Tombrady12',
  },
})

export const insert = async ({email}) => {
  const queryResult = await db
    .query(`INSERT INTO
              newsletter_subscribers (email)
            VALUES
              ($1);`,
            [email])
}

export const broadcast = async () => {
  const queryResult = await db
    .query(`SELECT
              *
            FROM
              newsletter_subscribers;`)

  const headline = await db
    .query(`SELECT title FROM article WHERE is_headline = 'true' LIMIT 5;`)

  const items = headline
    .rows
    .map((article) => `<li>${article.title}</li>`)
    .join('')

  const content = `Todays headline:<br><ol>${items}</ol>`

  return Promise.all(queryResult.rows.map(async (result) => {
    return smtp.sendMail({
      from: '"Harden Newsletter" <newsharden@gmail.com>',
      to: result.email,
      subject: 'Harden daily newsletter',
      html: content
    })
  }))
}
