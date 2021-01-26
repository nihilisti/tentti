const { Pool } = require('pg')
const { connect } = require('..')
// const pool = new Pool()

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'tenttikanta',
//     password: 'vaahter1',
//     port: 5432,
//   })

var connectInfo = {}
var pool = null

if (process.env.HEROKU) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL })
} else {
  connectInfo = {
    user: 'postgres',
    host: 'localhost',
    database: 'tenttikanta',
    password: 'vaahter1',
    port: 5432
  }
  const pool = new Pool(connectInfo)
}

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}