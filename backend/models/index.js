const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = {};

db.mongoose = mongoose;
db.config = dbConfig;
db.todoList = require('./todolist.model.js')(mongoose);

module.exports = db;