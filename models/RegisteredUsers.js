"use strict";

module.exports = function(sequelize, DataTypes) {
  var RegisteredUsers = sequelize.define('RegisteredUsers', {
    email: {
      type: DataTypes.STRING,
    },
    fname: {
      type: DataTypes.STRING,
    },
    lname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  agree: {
    type: DataTypes.STRING,
  },
});

  return RegisteredUsers;
};
