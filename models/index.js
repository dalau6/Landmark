"use strict";

var fs = require("fs");
var path = require("path");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('fa17g03', 'fa17g03', 'itsnotdefault037', {
   host: '127.0.0.1',
   dialect: 'mysql',
   operatorsAliases: false,
   pool: {
     max: 5,
     min: 0,
     idle: 10000
   },
   define: {
     timestamps: false
  }
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
