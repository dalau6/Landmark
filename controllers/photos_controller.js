var cloudinary = require('cloudinary').v2;
var schema = require('../config/schema');
var crypto = require('crypto');
var Photo = schema.models.Photo;
var mysql = require('mysql');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var upload = require('../routes/upload');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'fa17g03',
  password : 'itsnotdefault037',
  database : 'fa17g03'
})

function upload(req, res) {
  var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";
  var photo = new Photo();
  Photo.count().then(function (amount) {}).finally(function () {
    res.render('upload', {
      photo: photo,
      cloudinary_cors: cloudinary_cors
    });
  });
}

module.exports.wire = function (app) {
  app.use('/upload', upload);
  app.post('/upload', (req, res, next) => {
    var post = {Address: req.body.title, City: req.body.city, Zip: req.body.zip, Price: req.body.price, Bathrooms: req.body.bathrooms, Bedrooms: req.body.bedrooms, Email: req.body.email};
    app.locals.myData.push({
      Address: req.body.title,
      City: req.body.city,
      Zip: req.body.zip,
      img: cloudinary.image(req.body.title.replace(/ /g,"_") + '.jpg', {width: 30, height: 30, crop: "scale"})
    });
    connection.query('INSERT INTO Estates SET ?', post, (error, results, fields) => {
      if (error) throw error;
      res.render('upload', {
        "msg": "Image has been successfully uploaded!",
      });
    });
  })
};
