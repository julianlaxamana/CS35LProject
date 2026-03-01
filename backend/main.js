const authRoutes = require('./routes/authRoutes.js')
const ratingRoutes = require('./routes/ratingRoutes')

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ratings', ratingRoutes);


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
