const db = require("../config/connection");
const { User, Category, Comment, Product } = require("../models");

const userData = require("./userData.json");
const { categoryData } = require("./categoryData");
const { productData } = require("./productData");
const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of salt rounds for bcrypt

db.once("open", async () => {
  try {
    //reset the database
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Hash passwords before inserting user data
    const hashedUserData = userData.map((user) => ({
        username: user.username,
        email: user.email,
        password: bcrypt.hashSync(user.password, saltRounds), // Hash the password
      }));

    //seed information
    await User.insertMany(hashedUserData);
    console.table("Users seeded!");

    // Seed categories
    const insertedCategories = await Category.insertMany(categoryData);
    console.log("Categories seeded!");

    // Seed products
    const insertedProducts = await Product.insertMany(productData);
    console.log("Products seeded!");

    // Associate products with categories based on product name
    for (const product of insertedProducts) {
      for (const category of insertedCategories) {
        if (product.name.includes(category.name)) {
          // Update product with category id
          await Product.findByIdAndUpdate(product._id, { $push: { category: category._id } });
          // console.log(await Product.findByIdAndUpdate(product._id, { $push: { category: category._id } }))

          // Update category with product id
          await Category.findByIdAndUpdate(category._id, { $push: { products: product._id } });
        }
      }
    }
    console.log("Products associated with categories and vice-versa!");


    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
