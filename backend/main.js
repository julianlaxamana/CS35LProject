const authRoutes = require('./routes/authRoutes.js');
const ratingRoutes = require('./routes/ratingRoutes');
const menuRoutes = require('./routes/menuRoutes');

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/menu', menuRoutes);


// start backend
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
