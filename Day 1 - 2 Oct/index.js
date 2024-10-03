const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login', (req, res) => {
res.send('<h1> You must login first</h1>')
})

app.get('/home', (req, res) => {
  res.send('you are at home')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})