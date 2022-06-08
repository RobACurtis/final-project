require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const db = require('./db');
const argon2 = require('argon2'); // eslint-disable-line
const jwt = require('jsonwebtoken');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));
const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/explore-images', (req, res, next) => {
  const sql = `
       select "imageUrl"
       from "photos"
       order by "createdAt" desc
       limit 14
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

app.get('/api/photographer-profile/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
      select "users"."firstName",
      "users"."lastName",
      "users"."email",
      "users"."location",
      "users"."coverImageUrl",
      "users"."profileImageUrl",
      array_agg("photos"."imageUrl" order by "photos"."createdAt" desc) as "photos"
      from "users"
      left join "photos" using ("userId")
      where "users"."userId" = $1
      group by "users"."userId"

  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const user = result.rows;
      if (user[0] === undefined) {
        res.status(404).json({ error: `Cannot find userId ${userId}` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, location, firstName, lastName, email } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields.');
  } else if (!firstName || !lastName) {
    throw new ClientError(400, 'firstName and lastName are required fields.');
  } else if (!email || !location) {
    throw new ClientError(400, 'location and email are required fields.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashedPassword", "location", "firstName", "lastName", "email", "createdAt")
      values ($1, $2, $3, $4, $5, $6, now())
      returning "username", "firstName", "lastName", "email", "createdAt", "location";
      `;
      const params = [username, hashedPassword, location, firstName, lastName, email];
      db.query(sql, params)
        .then(result => {
          const account = result.rows[0];
          res.status(201).json(account);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'username and password are required fields!');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Username not found.');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid password');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/auth/profile-image', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const imageUrl = path.join('/images/profile-images/', req.file.filename);
  const sql = `
       update "users"
       set "profileImageUrl" = $1
       where "userId" = $2
       returning "profileImageUrl",
                "username",
                "userId"
  `;
  const params = [imageUrl, userId];
  db.query(sql, params)
    .then(result => {
      const [image] = result.rows;
      res.json(image);
    })
    .catch(err => next(err));
});

app.post('/api/auth/gallery-images', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const imageUrl = path.join('/images/gallery-images/', req.file.filename);
  const sql = `
       insert into "photos" ("userId", "imageUrl", "createdAt")
       values ($1, $2, now())
       returning "imageUrl",
                 "userId"
  `;
  const params = [userId, imageUrl];
  db.query(sql, params)
    .then(result => {
      const [image] = result.rows;
      res.json(image);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
