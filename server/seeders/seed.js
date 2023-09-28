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


    //this is wrong or unnecessary 
    productData.forEach(async(product) => {
        // Store the array of category IDs for the product
        const categoryIds = product.categories;
      
        // Initialize an array to store matching categories
        const matchingCategories = [];
        
        //this logic here defines the ability to check for multiple categories
        // Iterate through each category ID in the product
        categoryIds.forEach((categoryId) => {
          // Find the category object that matches the category ID
          const category = categoryData.find((category) => category._id == categoryId);
          // If a matching category is found, push it to the matchingCategories array
          if (category) {
            matchingCategories.push(category);
          }
        });
        
        // Now, matchingCategories contains all categories associated with the product
        console.log('Matching Categories:', matchingCategories);
      
        // You can then loop through matchingCategories and update the category.products array
        matchingCategories.forEach((category) => {
          category.products.push(product._id);
        });

        // Create or update products in the database
        const savedProducts = Product.create(productData);

        console.log(savedProducts)

        matchingCategories.forEach(async (category) => {
            // Update the category.products array in memory
            category.products.push(savedProducts._id);
            // Save the updated category to the database
            await category.save();
        });
      
        console.log('Product ID:', product._id);
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
