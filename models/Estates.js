"use strict";

module.exports = function(sequelize, DataTypes) {
  var Estates = sequelize.define('Estates', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,20],
        msg: 'Please enter a valid address.'
      }
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,20],
        msg: 'Please enter a valid city.'
      }
    },
    Zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,7],
        msg: 'Please enter a valid zip code.'
      }
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1,9],
        isNumeric: true,
        msg: 'Please enter a valid price.'
      }
    }

  });

  return Estates;
};
