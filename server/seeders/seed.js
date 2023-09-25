const db = require('../config/connection');
const { User, Category, Comment, Product } = require('../models');

const userData = require('./userData.json');
const categotyData = require('./categoryData.json');
const productData = require('./productData.json');


db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        await User.create(userData);
        await Category.create(categotyData);
        await Product.create(productData);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
    console.log('Users seeded!')
    console.log('Categories seeded!')
    console.log('Products seeded!')
    process.exit(0);
});