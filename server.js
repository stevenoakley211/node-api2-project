const express = require('express');
const postsRouter = require("./postsRouter")
const commentsRouter = require("./commentsRouter")

const server = express();


server.use(express.json())


server.use('/api/posts', postsRouter)
server.use('/api/posts', commentsRouter)

module.exports = server;