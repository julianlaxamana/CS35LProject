require('dotenv').config()
var admin = require("firebase-admin");

// set up firebase stuff
var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lproject-2fe57-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;