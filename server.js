const express = require('express')
const cors = require('cors')
const postsRouter = require("./routers/postsRouter")
const commentsRouter = require("./routers/commentsRouter")
const server = express()

server.use(express.json())

server.use('/api/posts', postsRouter)
server.use('/api/posts', commentsRouter)

server.use(cors())