const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting Into DB"));

db.once('open', function(){
    console.log('Connected To Mongo DB Database Successfully');
});

module.exports = db;