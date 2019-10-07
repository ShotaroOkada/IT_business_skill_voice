const express = require('express')
const app = express()
const path = require('path')
const port = 8000

app.use('/static', express.static('static'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))