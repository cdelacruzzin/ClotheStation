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
    console.table("Users seeded!");

    // Seed categories
    await Category.insertMany(categoryData);
    console.log("Categories seeded!");

    // Seed products
    await Product.create(productData);
    console.log("Products seeded!");

    // Fetch all categories and products from the database after insertion
    const allCategories = await Category.find({});
    const allProducts = await Product.find({});
    
    // Associate products with categories and vice versa
    for (const product of allProducts) {
        for (const category of allCategories) {
            if (product.name.includes(category.name)) {
                console.log(`${category.name}: ${category._id}  ${product.name}: ${product._id}`);
                
                // Update product with category id
                await Product.findByIdAndUpdate(product._id, { $push: { categories: category._id } });
                
                // Update category with product id
                await Category.findByIdAndUpdate(category._id, { $push: { products: product._id } });
            }
        }
    }
    
    const newProd = await Product.find();

    console.log(newProd)
    console.log("Categories updated with products!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
