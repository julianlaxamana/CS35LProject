require('dotenv').config()
const authRoutes = require('./routes/authRoutes.js')
const ratingRoutes = require('./routes/ratingRoutes')

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/ratings', ratingRoutes);


// get food 
/*app.get('/get_meal/:id', async (req, res) => {
  try {
    const doc = await db.collection("food").doc(req.params.id).get();
    res.send(doc.data());
  } catch (error) {
    res.send(error);
  }
})*/


// start backend
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
