require('dotenv').config()
var admin = require("firebase-admin");

// set up firebase stuff
var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
module.exports.admin = admin;