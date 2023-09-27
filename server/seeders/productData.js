const generateUniqueId = require('../utils/uuid4');
const { categoryIds } = require('./categoryData'); // Import the categoryIds

[
    {
      "_id": generateUniqueId(),
      "name": "Shirt",
      "price": 19.99,
      "description": "A high-end shirt",
      "categories": [categoryIds.shirt],
      "comment": []
    },
    {
      "_id": generateUniqueId(),
      "name": "Shirt Sweater",
      "price": 899.99,
      "description": "A reality warping hybrid",
      "categories": [categoryIds.shirt, categoryIds.sweater],
      "comment": []
    },
    {
      "_id": generateUniqueId(),
      "name": "Black Sweater",
      "price": 29.99,
      "description": "A cozy black sweater",
      "categories": [categoryIds.sweater],
      "comment": []
    }
  ]