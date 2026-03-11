const db = require('../config/database.js');

exports.getMenu = async (req, res) => {
  try {
    // validate diningHallID
    const diningHallID = req.body.diningHallID;
    if (!diningHallID)
      return res.status(400).json({ message: "Need value for diningHallID"});
    const validDiningHall = await db.collection('dining_halls').doc(diningHallID).get();
    if (!validDiningHall.exists)
      return res.status(400).json({ message: "Invalid diningHallID" });

    // validate days
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = req.body.day;
    if (day == undefined) {
      day = days[new Date().getDay()];
    }
    if (Number.isInteger(day) && day <= 6 && day >= 0) day = days[day];
    if (!(typeof day == 'string' && days.includes(day)))
      return res.status(400).json({ message: "Invalid value for day"});

    const dayRef = db.collection('menu').doc(diningHallID).collection('current_week').doc(day);
    const daySnapshot = await dayRef.get();

    // menu for the day doesnt exist
    if (!daySnapshot.exists)
      return res.json({ menu: {} });

    const { breakfast, lunch, dinner } = daySnapshot.data();
    const menuMap = {};
    const processMeal = (meal, mealName) => {
      if (!meal) return;
      for (const [station, foodList] of Object.entries(meal)) {
        for (const foodID of foodList) {
          if (menuMap[foodID]) {
            menuMap[foodID].meals.push(mealName);
          } else {
            menuMap[foodID] = {
              station: station,
              meals: [mealName]
            };
          }
        }
      }
    };
    processMeal(breakfast, "breakfast");
    processMeal(lunch, "lunch");
    processMeal(dinner, "dinner");

    // fetch info about each food (tags, allergens, image, rating)
    const names = Object.keys(menuMap);
    const foodDocs = await Promise.all(
      names.map(name =>
        db.collection('dining_halls')
        .doc(diningHallID)
        .collection('Menu')
        .doc(name)
        .get()
      )
    );

    const menu = foodDocs
    .filter(doc => doc.exists)
    .map(doc => {
      let data = doc.data();
      // Filter out None allergens
      if (data.allergens.length == 1 && data.allergens[0] == "None")  data.allergens = [];
      return {
        name: doc.id,
        meals: menuMap[doc.id].meals,
        station: menuMap[doc.id].station,
        tags: data.tags,
        allergens: data.allergens,
        image: data.image
        //TODO: add avg rating
      };
    });

    res.json({
      diningHallID: diningHallID,
      day: day,
      menu: menu
    });

  } catch(error) {
    res.status(400).json({ message: error.message });
  }
}

// Calculates average rating for a certain meal
exports.getAverageRating = async (req, res) => {
  try {
    const mealID = req.body.mealID;
    const diningHallID = req.body.diningHallID;

    // get food docs
    const foodDocs = await db.collection('dining_halls')
        .doc(diningHallID)
        .collection('Menu')
        .doc(mealID)
        .get();

    if (foodDocs.data() == undefined){
      res.status(400).json({message:"Meal Not Found"});
      return
    }

    const ratings = await db.collection('ratings').get();

    let ratingsSum = 0.0;
    let numRatings = 0;

    // filter ratings
    ratings.forEach(doc => {
      if (doc.data()["foodID"] == mealID && doc.data()["rating"] !== undefined){
        ratingsSum = ratingsSum + doc.data()["rating"];
        numRatings = numRatings + 1;
      }
    });

    // calculate average
    let average = ratingsSum / numRatings;
    let data = foodDocs.data();
    data["average_rating"] = average;

    const response = db.collection("dining_halls").doc(diningHallID).collection('Menu').doc(mealID).set(data);
    res.json({average_rating: average});
  } catch (error){
    res.status(400).json({message:error.message});
  }
}

// Returns all menu items that match query
exports.queryMenu = async (req, res) => {
  try {
    // validate diningHallID
    const diningHallID = req.body.diningHallID;
    if (!diningHallID)
      return res.status(400).json({ message: "Need value for diningHallID"});
    const validDiningHall = await db.collection('dining_halls').doc(diningHallID).get();
    if (!validDiningHall.exists)
      return res.status(400).json({ message: "Invalid diningHallID" });

    // validate days
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = req.body.day;
    if (day == undefined) {
      day = days[new Date().getDay()];
    }
    if (Number.isInteger(day) && day <= 6 && day >= 0) day = days[day];
    if (!(typeof day == 'string' && days.includes(day)))
      return res.status(400).json({ message: "Invalid value for day"});

    const dayRef = db.collection('menu').doc(diningHallID).collection('current_week').doc(day);
    const daySnapshot = await dayRef.get();

    // menu for the day doesnt exist
    if (!daySnapshot.exists)
      return res.json({ menu: {} });

    const { breakfast, lunch, dinner } = daySnapshot.data();
    const menuMap = {};
    const processMeal = (meal, mealName) => {
      if (!meal) return;
      for (const [station, foodList] of Object.entries(meal)) {
        for (const foodID of foodList) {
          if (menuMap[foodID]) {
            menuMap[foodID].meals.push(mealName);
          } else {
            menuMap[foodID] = {
              station: station,
              meals: [mealName]
            };
          }
        }
      }
    };
    processMeal(breakfast, "breakfast");
    processMeal(lunch, "lunch");
    processMeal(dinner, "dinner");

    // fetch info about each food (tags, allergens, image, rating)
    const names = Object.keys(menuMap);
    const foodDocs = await Promise.all(
      names.map(name =>
        db.collection('dining_halls')
        .doc(diningHallID)
        .collection('Menu')
        .doc(name)
        .get()
      )
    );

    let menu = foodDocs
    .filter(doc => doc.exists)
    .map(doc => {
      let data = doc.data();
      if (data.allergens.length == 1 && data.allergens[0] == "None")  data.allergens = [];
      return {
        name: doc.id,
        meals: menuMap[doc.id].meals,
        station: menuMap[doc.id].station,
        tags: data.tags,
        allergens: data.allergens,
        image: data.image
        //TODO: add avg rating
      };
    });

    // Sorting
    const sorting = req.body.sorting;
    if (sorting == "alphabetical"){
      menu.sort((a, b) => {if(a.name[0] > b.name[0]) return 1; if(b.name[0] > a.name[0]) return -1; return 0});
    } else if (sorting == "allergies"){
      menu.sort((a, b) => {if(a.allergens.length > b.allergens.length) return 1; if(b.allergens.length > a.allergens.length) return -1; return 0});
    } else if (sorting == "rating"){
      menu.sort((a, b) => {if(a.rating > b.rating) return 1; if(b.rating > a.rating) return -1; return 0});
    }

    // filter strings
    const filter = req.body.filterString;
    if (filter != "" || filter != undefined){
      let filteredMenu = menu.filter(item => {return item.name.startsWith(filter);});
      menu = filteredMenu;
    }

    // rizz

    res.json({
      diningHallID: diningHallID,
      day: day,
      menu: menu
    });
  } catch (error){
    res.status(400).json({message:error.message});
  }
}
