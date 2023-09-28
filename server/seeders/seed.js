const db = require("../config/connection");
const { User, Category, Comment, Product } = require("../models");

const userData = require("./userData.json");
const { categoryData } = require("./categoryData");
const { productData } = require("./productData");

db.once("open", async () => {
  try {
    //reset the database
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    //seed information
    await User.insertMany(userData);
    await Category.insertMany(categoryData);
    await Product.create(productData);
      

    console.table("Users seeded!");
    console.table("Categories seeded!");
    console.table("Products seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
