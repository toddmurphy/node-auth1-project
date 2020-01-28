require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('./data/dbConfig');

const userRouter = require('./api/userRouter');
const authRouter = require('./api/authRouter');

const server = express();

//make session config/cookie object file && knex session store object
const sessionConfig = {
  name: 'hansolo',
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 min cookie in ms
    secure: false, // 'true' in production, only send cookies over HTTPS
    httpOnly: true // JS cannot access the cookies on the brower
  },
  resave: false,
  saveUninitialized: false, // required fro 'GDPR' compliance privacy laws
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'sessions',
    createTable: 'true',
    clearInterval: 60000
  })
};

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig)); // turn on sessions

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send(`<h2>User auth project working</h2>`);
});

module.exports = server;
