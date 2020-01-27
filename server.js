const express = require('express');
const userRouter = require('./api/userRouter');
const authRouter = require('./api/authRouter');
const server = express();

server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send(`<h2>User auth project working</h2>`);
});

module.exports = server;
