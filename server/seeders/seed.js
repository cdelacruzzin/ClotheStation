const db = require('../config/connection');
const { User, Category, Comment, Product } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const productData = require('./productData.json');


db.once('open', async () => {
    try {
        //reset the database
        await User.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        
        const user = await User.insertMany(userData);
        const category = await Category.insertMany(categoryData);
        const product = await Product.create(productData);

        console.table(user)
        console.table(category)
        console.table(product)
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
    console.table('Users seeded!')
    console.table('Categories seeded!')
    console.table('Products seeded!')
    process.exit(0);
});