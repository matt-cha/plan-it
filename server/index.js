require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
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

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);

app.post('api/events/', (req, res) => {
  const { name } = req.body.name;
  const { details } = req.body.details;
  if (!name) {
    throw new ClientError(400, 'event name is a required field');
  }
  if (!details) {
    throw new ClientError(400, 'details is a required field');
  }
  const sql = `
    insert into "events" ("name", "details")
    values ($1, $2)
    returning *;
    `;
  const params = [name, details];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
