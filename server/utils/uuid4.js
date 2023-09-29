const uuid = require('uuid');

// Example function to generate a unique comment ID (you would implement this)
function generateUniqueId() {
  return uuid.v4();
}

module.exports = generateUniqueId