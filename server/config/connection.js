const mongoose = require('mongoose');

/**
 * connects to a MongoDB database.
 * uses the MONGODB_URI env variable, which contains the connection string to a MongoDB from a cloud service, if it is set.
 * if not, use the local instance at 'mongodb://127.0.0.1:27017/ClotheStation'
 */
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ClotheStation'
    );

module.exports = mongoose.connection;