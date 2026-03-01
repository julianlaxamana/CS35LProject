require('dotenv').config()
const db = require('../config/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
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
}

exports.authenticateUser = async (req, res) => {
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
}
