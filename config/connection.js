// Import Mongoose 
const { connect, connection } = require('mongoose');
// Connect to local instance of MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

connect(connectionString);
// Export connection
module.exports = connection;