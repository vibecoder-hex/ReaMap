const express = require('express');
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.json({"message": "Hello World"})
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Starting app on 127.0.0.1:${port}`)
})