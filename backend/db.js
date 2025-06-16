const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://harshleenkaur781:innova8252@cluster0.bgwg5ls.mongodb.net/gofoodmern";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    const foodData = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();

    global.food_items = foodData;
    global.food_category = foodCategory;

    console.log("Fetched food items:", foodData.length);
    console.log("Fetched categories:", foodCategory.length);
    
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

module.exports = mongoDB;
