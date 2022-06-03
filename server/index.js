require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const db = require('./db');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/explore-images', (req, res, next) => {
  const sql = `
       select "imageUrl"
       from "photos"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/explore-people', (req, res, next) => {
  const sql = `
      select "firstName",
            "lastName",
            "email",
            "location",
            "profileImageUrl",
            "userId"
       from "users"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/explore-people/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const sql = `
      select "users"."firstName",
      "users"."lastName",
      "users"."email",
      "users"."location",
      "photos"."imageUrl"
      from "users"
      join "photos" using ("userId")
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const user = result.rows;
      if (user[0] === undefined) {
        res.status(404).json({error: `Cannot find userId ${userId}`});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
