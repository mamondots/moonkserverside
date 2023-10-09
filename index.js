const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

//middlewere

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send(' jewelry shop side is running')
  })
  
  app.listen(port, () => {
    console.log(` jewelry shop side is running on port, ${port}`)
  })