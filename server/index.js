require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  if (!req.body) throw new ClientError(400, 'request requires a body');
  const name = req.body.name;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const location = req.body.location;
  const details = req.body.details;
  /* const image = req.body.image ?? 'url here'; */

  const image = `/images/${req.file.filename}`;
  if (!name) {
    throw new ClientError(400, 'event name is a required field');
  }
  /*   if (!startDate) {
    throw new ClientError(400, 'startDate is a required field');
  }
  if (!endDate) {
    throw new ClientError(400, 'endDate is a required field');
  } */
  const sql = `
    insert into "Events" ("name", "startDate", "endDate", "location", "details", "image")
    values ($1, $2, $3, $4, $5, $6)
    returning *;
    `;
  const params = [name, startDate, endDate, location, details, image];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('line 54:', err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
