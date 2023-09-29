const generateUniqueId = require("../utils/uuid4");

// Generate unique IDs for categories
const categoryId1 = generateUniqueId();
const categoryId2 = generateUniqueId();

// Store the generated category IDs in a data structure for later reference
const categoryIds = {
  shirt: categoryId1,
  sweater: categoryId2,
};

const categoryData = [
  {
    _id: categoryId1,
    name: "Shirt",
    description: "Shirt",
    products: [],
  },
  {
    _id: categoryId2,
    name: "Sweater",
    description: "Sweater",
    products: [],
  },
];

module.exports = { categoryData, categoryIds };
