const express = require('express')
const app = express()

const auth = require('./routes/authRoutes')
const diningHall = require('./routes/diningHallRoutes')
const rating = require('./routes/ratingRoutes')

app.use(express.json())

//app.use('/api/auth', auth)
//app.use('/api/dining-halls', diningHall)
//app.use('/api/ratings', rating)

module.exports = app;
