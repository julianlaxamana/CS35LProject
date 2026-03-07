const express = require('express')
const cors = require('cors')
const app = express()

const auth = require('./routes/authRoutes')
const diningHall = require('./routes/diningHallRoutes')
const rating = require('./routes/ratingRoutes')

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/dining-halls', diningHall)
app.use('/api/ratings', rating)

module.exports = app;
