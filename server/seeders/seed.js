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

    const user = await User.insertMany(userData);
    const category = await Category.insertMany(categoryData);
    const product = await Product.create(productData);

    // Loop through productData and add products to categories
    productData.forEach((product) => {
      //store the array of id
      const categoryId = product.category;
      //find category object that matches the product's category ID
      const category = categoryData.find((category) => category._id === categoryId);
      
      //if category matching category is found
      if (category) {
        //push the product's ID, to the products array of the found category
        category.products.push(product._id);
      }
    });

    console.table("Users seeded!");
    console.table("Categories seeded!");
    console.table("Products seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
