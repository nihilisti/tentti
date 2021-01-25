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

if (process.env.HEROKU) {
  connectInfo = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: ''
  }
} else {
  connectInfo = {
    user: 'postgres',
    host: 'localhost',
    database: 'tenttikanta',
    password: 'vaahter1',
    port: 5432
  }
}

const pool = new Pool(connectInfo)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}