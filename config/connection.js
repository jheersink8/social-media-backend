// Import Mongoose 
const { connect, connection } = require('mongoose');

// Connect to local instance of MongoDB
connect('mongodb://127.0.0.1:27017/socialDB');

// Export connection
module.exports = connection;