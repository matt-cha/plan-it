require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const path = require('path');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/events', (req, res, next) => {
  const sql = `
  select "eventId",
      "name",
      "startDate",
      "endDate",
      "location",
      "details",
      "image"
    from "Events"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/events/:eventId', (req, res) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({
      error: `id ${eventId} is not a positive integer`
    });
    return;
  }
  const sql = `
  select "eventId",
      "name",
      "startDate",
      "endDate",
      "location",
      "details",
      "image"
    from "Events"
    where "eventId" = $1
  `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      const event = result.rows[0];
      if (!event) {
        res.status(404).json({
          error: `Cannot find event with eventId '${eventId}'`
        });
      } else {
        res.json(event);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred in dbquery.'
      });
    });
});

app.post('/api/events/upload', uploadsMiddleware, (req, res, next) => {
  const url = `/images/${req.file.filename}`;
  res.status(200).json(url);
});

app.get('/api/events/:eventId/guests', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({
      error: `id ${eventId} is not a positive integer`
    });
    return;
  }
  const sql = `
  select "guestId",
      "guestName",
      "phoneNumber"
  from "Guests"
  join "EventGuests" using ("guestId")
  where "EventGuests"."eventId" = $1
  `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred103.'
      });
    });
});

app.get('/api/events/:eventId/tasks', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({
      error: `id ${eventId} is not a positive integer`
    });
    return;
  }
  const sql = `
  select "taskId",
      "taskName"
  from "Tasks"
  join "EventTasks" using ("taskId")
  where "EventTasks"."eventId" = $1
  `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred105.'
      });
    });
});

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'Request requires a body'
    });
  }

  const name = req.body.name;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const location = req.body.location;
  const details = req.body.details;
  const image = req.file.filename;

  if (!name) {
    return res.status(400).json({
      error: 'Event name is a required field'
    });
  }

  if (!startDate || isNaN(startDate.getTime())) {
    return res.status(400).json({
      error: 'Start date is not valid'
    });
  }

  if (!endDate || isNaN(endDate.getTime())) {
    return res.status(400).json({
      error: 'End date is not valid'
    });
  }

  /*   if (startDate > endDate) {
    return res.status(400).json({
      error: 'End date must be after start date'
    });
  } */

  if (!location) {
    return res.status(400).json({
      error: 'Location is a required field'
    });
  }

  if (!details) {
    return res.status(400).json({
      error: 'Details is a required field'
    });
  }

  if (!image) {
    return res.status(400).json({
      error: 'Image is a required field'
    });
  }

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
      console.error('Error:', err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/guests', (req, res) => {
  if (!req.body) throw new ClientError(400, 'request requires a body');
  const guestName = req.body.data.guestName;
  const phoneNumber = req.body.data.phoneNumber;

  if (!guestName) {
    throw new ClientError(400, 'guestName name is a required field');
  }
  const sql = `
    insert into "Guests" ("guestName", "phoneNumber")
    values ($1, $2)
    returning *;
    `;
  const params = [guestName, phoneNumber];

  db.query(sql, params)
    .then(result => {
      const guestId = result.rows[0].guestId;
      const eventId = req.body.eventId;
      const paramsEventGuests = [eventId, guestId];
      const sqlEventGuests = `
        insert into "EventGuests" ("eventId", "guestId")
        values ($1, $2)
        returning *;
        `;
      return db.query(sqlEventGuests, paramsEventGuests);
    })
    .then(result => {
      const eventGuest = result.rows[0];
      res.send(eventGuest);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.184'
      });
    });
});

app.post('/api/tasks', (req, res) => {
  if (!req.body) throw new ClientError(400, 'request requires a body');
  const taskName = req.body.data.taskName;

  if (!taskName) {
    return res.status(400).json({
      error: 'Task name is a required field'
    });
  }

  const sql = `
    insert into "Tasks" ("taskName")
    values ($1)
    returning *;
    `;
  const params = [taskName];

  db.query(sql, params)
    .then(result => {
      const taskId = result.rows[0].taskId;
      const eventId = req.body.eventId;
      const paramsEventTasks = [eventId, taskId];
      const sqlEventTasks = `
        insert into "EventTasks" ("eventId", "taskId")
        values ($1, $2)
        returning *;
        `;
      return db.query(sqlEventTasks, paramsEventTasks);
    })
    .then(result => {
      const eventTask = result.rows[0];
      res.send(eventTask);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.184'
      });
    });
});

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/api/events/:eventId/guests/message', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: req.body.from,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ sucess: true }));
    })
    .catch(err => {
      console.error(err);
      res.send(JSON.stringify({ sucess: false }));
    });
});

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
 */
app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
