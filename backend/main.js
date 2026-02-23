require('dotenv').config()


var admin = require("firebase-admin");
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = 3000;

// set up firebase stuff
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lproject-2fe57-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

app.use(express.json());

// authentication middleware
function authMiddleware(req, res, next) {
  const token = req.headers.cookie.split("=")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// create user
app.post('/create', async (req, res) => {
  try {
    // get id and password
    const id = req.body.userID;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const doc = await db.collection("users").doc(id).get();

    // check if user is in db
    if (doc.data() !== undefined){
      res.send('User already in database');
    }

    // create new user json
    const userJson = {
      id: id,
      password: hashedPassword,
      favorites: [],
      ratings: [] 
    };

    // create token
    const token = jwt.sign(
      { userID: id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // put token in cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    });

    // store it in db
    const response = db.collection("users").doc(id).set(userJson);

    res.send(response);
  } catch (error){
    res.send(error);
  }
});

// authenticate user
app.post('/auth', async (req, res) => {
  try {
    const id = req.body.userID;
    const doc = await db.collection("users").doc(id).get();

    // check if password hashes match
    const isMatch = await bcrypt.compare(req.body.password, doc.data().password);

    // create token
    const token = jwt.sign(
      { userID: id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // put token in cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    });

    res.send(isMatch);
  } catch (error){
    res.send(error);
  }
});

// add review
app.post('/add_review', authMiddleware, async (req, res) => {
  try {
    res.send("hello");
  } catch (error){
    res.send(error);
  }
});


// get food 
app.get('/get_meal/:id', async (req, res) => {
  try {
    const doc = await db.collection("food").doc(req.params.id).get();
    res.send(doc.data());
  } catch (error) {
    res.send(error);
  }
})


// start backend
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
