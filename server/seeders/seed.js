const db = require("../config/connection");
const { User, Category, Comment, Product } = require("../models");

const userData = require("./userData.json");
const { categoryData } = require("./categoryData");
const { productData } = require("./productData");

db.once("open", async () => {
  try {
    // Reset the database
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    const user = await User.insertMany(userData);
    const category = await Category.insertMany(categoryData);

    // Create or update products in the database
    const savedProducts = await Product.create(productData);

    for (const product of savedProducts) {
      const categoryIds = product.categories || [];
      const matchingCategories = categoryData.filter((cat) =>
        categoryIds.includes(cat._id.toString())
      );

      for (const category of matchingCategories) {
        category.products.push(product._id);
        await category.save();
      }
    }

    console.table("Users seeded!");
    console.table("Categories seeded!");
    console.table("Products seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
