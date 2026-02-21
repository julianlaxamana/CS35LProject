require('dotenv').config()

var admin = require("firebase-admin");
const bcrypt = require('bcrypt');
const express = require('express');
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

// create user
app.post('/create', async (req, res) => {
  try {
    const id = req.body.userID;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const doc = await db.collection("users").doc(id).get();
    if (doc.data() !== undefined){
      res.send('User already in database');
    }

    const userJson = {
      id: req.body.userID,
      password: hashedPassword 
    };

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
    const isMatch = await bcrypt.compare(req.body.password, doc.data().password);

    res.send(isMatch);
  } catch (error){
    res.send(error);
  }
});

// start backend
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
