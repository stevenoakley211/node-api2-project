const app = require("./server.js")

const PORT = 5000

app.listen(PORT, () => [
    console.log('server running on http://locahost:' + PORT)
])         