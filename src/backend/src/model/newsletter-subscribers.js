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

  return Promise.all(queryResult.rows.map(async (result) => {
    return await smtp.sendMail({
      from: '"Harden Newsletter" <newsharden@gmail.com>',
      to: result.email,
      subject: 'Harden daily newsletter',
      html: "Howdy y'all, today to read:"
    })
  }))
}
