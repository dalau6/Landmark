var Schema = require('jugglingdb').Schema;
var schema = new Schema('memory');

// Define models
var Photo = schema.define('Photo', {
  title: {type: String, length: 255},
  image: {type: JSON}
});

module.exports = schema;
