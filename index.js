var express = require("express")
var cors = require("cors")
var path = require('path')
var bodyParser = require("body-parser")
var app = express()
module.exports = app
var port = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(express.static('./client/build'))

var io = require('socket.io')(app.listen(9000));
var pg = require('pg');

var con_string = 'tcp://postgres:vaahter1@localhost/tenttikanta';

var pg_client = new pg.Client(con_string);
pg_client.connect();
var query = pg_client.query('LISTEN addedrecord');

io.sockets.on('connection', function (socket) {
  socket.emit('connected', { connected: true });

  socket.on('ready for data', function (data) {
    pg_client.on('notification', function (tentti) {
      socket.emit('update', { message: tentti });
    });
  });
});

app.use('/kello', function (req, res, next) {
  console.log('Kello on:', Date.now())
  next()
})

const db = require('./db')

var corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

app.get('/tiedot', (req, res, next) => {
  db.query('SELECT tenttitulokset.tulos, opiskelija.etunimi, opiskelija.sukunimi FROM tenttitulokset INNER JOIN opiskelija ON opiskelija.op_id = tenttitulokset.op_id', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

app.get('/tulokset', (req, res, next) => {
  db.query('SELECT DISTINCT op_id FROM tenttitulokset', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// for (var x = 0; lista.length > x; x++) {

// }

app.get('/keskiarvo/:op_id', (req, res, next) => {
  db.query('SELECT AVG(tenttitulokset.tulos) FROM tenttitulokset WHERE op_id = $1', [req.params.op_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// tentit

// hae kaikki tentit
app.get('/tentit', (req, res, next) => {
  db.query('SELECT * FROM tentti', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// hae tietty tentti
app.get('/tentti/:id', (req, res, next) => {
  db.query('SELECT * FROM tentti WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})

// lisää uusi tentti
app.post('/lisaatentti/:nimi/:ajankohta', (req, res, next) => {
  db.query('INSERT INTO tentti (nimi, ajankohta) VALUES ($1, $2)', [req.params.nimi, req.params.ajankohta], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Tentin lisäys onnistui")
  })
})

// muokkaa tentin ajankohtaa
app.put('/muokkaatenttia/:ajankohta/:id', (req, res, next) => {
  db.query('UPDATE tentti SET ajankohta = $1 WHERE "id" = $2', [req.params.ajankohta, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Tentin muokkaus onnistui")
  })
})

// muokkaa tentin nimeä
app.put('/muokkaatenttia2/:nimi/:id', (req, res, next) => {
  db.query('UPDATE tentti SET nimi = $1 WHERE "id" = $2', [req.params.nimi, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Tentin muokkaus onnistui")
  })
})

// poista tentti
app.delete('/poistatentti/:id', (req, res, next) => {
  db.query('DELETE FROM tentti WHERE "id" = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Tentin poisto onnistui")
  })
})

// kysymykset

// hae kaikki kysymykset
app.get('/kysymykset', (req, res, next) => {
  db.query('SELECT * FROM kysymys', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// hae kysymys
app.get('/kysymys/:id', (req, res, next) => {
  db.query('SELECT * FROM kysymys WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})

// hae kysymys tentin perusteella
app.get('/tenttikysymykset/:tentti_id', (req, res, next) => {
  db.query('SELECT * FROM kysymys WHERE tentti_id = $1', [req.params.tentti_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// lisää uusi kysymys
app.post('/lisaakysymys/:nimi/:numero', (req, res, next) => {
  db.query('INSERT INTO kysymys (nimi, numero) VALUES ($1, $2) RETURNING id', [req.params.nimi, req.params.numero], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Kysymyksen lisäys onnistui")
  })
})

// muokkaa kysymystä
app.put('/muokkaakysymysta/:nimi/:id', (req, res, next) => {
  db.query('UPDATE kysymys SET nimi = $1 WHERE "id" = $2', [req.params.nimi, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Kysymyksen muokkaus onnistui")
  })
})

// muokkaa kysymyksen numeroa
app.put('/muokkaakysymysta2/:numero/:id', (req, res, next) => {
  db.query('UPDATE kysymys SET numero = $1 WHERE "id" = $2', [req.params.numero, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Kysymyksen muokkaus onnistui")
  })
})

// poista kysymys
app.delete('/poistakysymys/:id', (req, res, next) => {
  db.query('DELETE FROM kysymys WHERE "id" = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Kysymyksen poisto onnistui")
  })
})

// vaihtoehdot

// hae kaikki vaihtoehdot
app.get('/vaihtoehdot', (req, res, next) => {
  db.query('SELECT * FROM vaihtoehto', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// // lisää uusi vaihtoehto
app.post('/lisaavaihtoehto/:numero/:nimi/:oikea', (req, res, next) => {
  db.query('INSERT INTO vaihtoehto (numero, nimi, oikea) VALUES ($1, $2, $3)', [req.params.numero, req.params.nimi, req.params.oikea], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Vastausvaihtoehdon lisäys onnistui")
  })
})

// muokkaa vaihtoehdon nimeä
app.put('/muokkaavaihtoehtoa/:nimi/:id', (req, res, next) => {
  db.query('UPDATE vaihtoehto SET nimi = $1 WHERE "id" = $2', [req.params.nimi, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Vastausvaihtoehdon muokkaus onnistui")
  })
})

// muokkaa vaihtoehdon numeroa
app.put('/muokkaavaihtoehtoa2/:numero/:id', (req, res, next) => {
  db.query('UPDATE vaihtoehto SET numero = $1 WHERE "id" = $2', [req.params.numero, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Vastausvaihtoehdon muokkaus onnistui")
  })
})

// poista vaihtoehto
app.delete('/poistavaihtoehto/:id', (req, res, next) => {
  db.query('DELETE FROM vaihtoehto WHERE "id" = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send("Vastausvaihtoehdon poisto onnistui")
  })
})

////

// app.get('/', (req, res) => {
//   res.send('Goodbye World! GET')
// })

// app.post('/', (req, res) => {
//   res.send('Hello World! POST')
// })

// app.delete('/', (req, res) => {
//   res.send('Hello World! DELETE')
// })

// app.put('/', (req, res) => {
//   res.send('Hello World! PUT')
// })

app.get('*', (req, rest) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// ÄLÄ POISTA
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})