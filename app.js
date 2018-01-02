var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cloudinary = require('cloudinary').v2;
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
var methodOverride = require('method-override');
var multer = require('multer');
var session = require('express-session');
var models = require('./models');
var doQuery = require('./controllers/query.js');
var Sequelize = require("sequelize");
var nodemailer = require('nodemailer');

var index = require('./routes/index');
var about = require('./routes/about');
var agents = require('./routes/agents');
var login = require('./routes/login');
var search = require('./routes/search');
var property = require('./routes/property');
var dashboard = require('./routes/dashboard');
var upload = require('./routes/upload');
var success = require('./routes/success');
var David = require('./routes/David');
var Jesse = require('./routes/Jesse');
var Avneesh = require('./routes/Avneesh');
var Matthew = require('./routes/Matthew');
var Jenny = require('./routes/Jenny');
var Huiliang = require('./routes/Huiliang');
var Yingjing = require('./routes/Yingjing');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const saltRounds = 10;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

// session
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

app.use('/', index);
app.use('/about', about);
app.use('/success', success);
app.use('/David', David);
app.use('/Jesse', Jesse);
app.use('/Avneesh', Avneesh);
app.use('/Matthew', Matthew);
app.use('/Jenny', Jenny);
app.use('/Huiliang', Huiliang);
app.use('/Yingjing', Yingjing);

// MySQL
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'fa17g03',
  password : 'itsnotdefault037',
  database : 'fa17g03'
})

// Cloudinary config
cloudinary.config({
  cloud_name: 'ds4czpq2x',
  api_key: '756625512327681',
  api_secret: 'BBMMejB6Omwbr1uVNESJiZmSNrw'
});

// Load environment variables
dotenv.load();

// Typeahead data
init = () => {
  models.Estates.findAll({
    attributes: ['Address', 'City', 'Zip']
  }).then(function (estates) {
    let data = [];
    if (estates)
    data = estates.map((item) => {
      add = item.Address.replace(/ /g,"_");
      return {
        Address: item.Address,
        City: item.City,
        Zip: item.Zip,
        img: cloudinary.image(add + '.jpg', {width: 30, height: 30, crop: "scale"})
      }
    })
    app.locals.myData=data
  })
}

init()

// search
app.get('/search', (req, res, next) => {
  if (!req.query.q) res.render('search');
  query = (req.query.q);
  callback = (response, img, count, matches) => {
    res.render('search', {
      query: query,
      response: response,
      count: count,
      img: img,
      matches: matches
    });
  };
  doQuery(query, connection, callback);
});

// property
app.get('/property', (req, res, next) => {
  if (!req.query.id) {
    res.render('search');
  } else {
    query = 'SELECT * FROM Estates WHERE Address =' + connection.escape(req.query.id);
    connection.query(query, (err, rows, fields) => {
      if (!err) {
        var img = cloudinary.image(rows[0].Address.replace(/ /g,"_") + '.jpg');
        img = img.match(/'([^']+)'/)[1];
        res.render('property', {
          result: rows[0],
          img: img
        });
      }
    })
  }
});

// messaging system
app.post('/send', (req, res) => {
  var output = `
    <p>You have a new message for ${req.body.address}</p>
    <h3>Contact Details</h3>
    <li>Email: ${req.body.reply}</li>
    <h3>Message</h3>
    <p>${req.body.body}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: false,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'projectlandmark2017@gmail.com', // generated ethereal user
          pass: 'itsnotdefault037'  // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'projectlandmark2017@gmail.com', // sender address
      to: `${req.body.email}`, // list of receivers
      replyTo: `${req.body.reply}`,
      subject: `${req.body.subject}`, // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
  res.render('success', {msg: 'Success! Email has been sent!'})

});

// delete listing
app.post('/listings', (req, res) => {
  connection.query('DELETE FROM Estates WHERE Address =' + connection.escape(req.body.val), (error, results, fields) => {
    if (error) throw error;
    init();
    cloudinary.uploader.destroy(req.body.val.replace(/ /g,"_"), function(error, result){console.log(result)});
    res.redirect('/fa17g03/dashboard');
  })
});

// If session does not exists, return to login page
app.get('/login', (req, res) => {
  if(req.session.user){
    res.redirect('/dashboard')
  } else { res.render('login') }
});

// sign up
app.post('/login', (req, res) => {
 connection.query('SELECT email FROM RegisteredUsers WHERE email LIKE ?', [req.body.email], function (error, results, fields) {
  if (error) throw error;
  if(results.length!=0){
    res.render('login', {exists: "Email already exists. Login!"});
  } else {
    myPlaintextPassword=req.body.password
    bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {

      models.RegisteredUsers.create({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        password: hash,
        type: req.body.type,
        agree: req.body.agree}).then(function(user) { console.log('success');}).catch(function(err) { console.log(err, req.body.email); });

      req.session.user = {email: req.body.email, fname: req.body.fname, lname: req.body.lname, password: hash, type: req.body.type};
      res.render('dashboard');
        })
      }
   });
});


var checkSignIn = (req, res, next) => {
  //If session exists, proceed to page
   if(req.session.user){ next(); } else { 
    var err = new Error("Not logged in!");
    //Error, trying to access unauthorized page!
    next(err);
   }
}

app.get('/dashboard', checkSignIn, (req, res) => {
  connection.query('SELECT * FROM Estates WHERE Email = ?', [req.session.user.email], function (error, results, fields) {
    if (error) throw error;
    var property = [];
    for (var index=0; index<results.length; index++) {
      property.push({
        img: cloudinary.image(results[index].Address.replace(/ /g,"_") + '.jpg', {width: 70, height: 70, crop: "scale"}),
        Address: results[index].Address,
        City: results[index].City,
        Zip: results[index].Zip,
        Price: results[index].Price,
        Bedrooms: results[index].Bedrooms,
        Bathrooms: results[index].Bathrooms
      });
    }
    res.render('dashboard', {results: property})
  });
});

// login
app.post('/dashboard', (req, response) => {
  connection.query('SELECT * FROM RegisteredUsers WHERE email LIKE ?', [req.body.email], function (error, results, fields) {
    if (error) throw error;
    if(results.length===0){
      response.render('login', {message: "No email found. Please sign up!"});
    } else {   
      myPlaintextPassword=req.body.password
      hash = results[0].password
      bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        if(res) {
          req.session.user = results[0];
          response.redirect('/dashboard');
        } else {
          response.render('login', {message: "Invalid credentials!"});
        }
      });
    }
  });
});

// User should be authenticated! Redirect him to log in.
app.use('/dashboard', (err, req, res, next) => {
   res.redirect('/login');
});

// logout
app.get('/logout', (req, res) => {
   req.session.destroy(function(){})
   res.redirect('/login');
});

// agents
app.get('/agents', (req, res) => {
  var query = connection.query('SELECT email, fname, lname FROM RegisteredUsers WHERE type="agent"', function (error, results, fields) {
    if (error) throw error;
    res.render('agents', {results:results});
  });
});

// Wire request 'pre' actions
wirePreRequest(app);
// Wire request controllers
var photosController = require('./controllers/photos_controller');
photosController.wire(app);

// Wire request 'post' actions
wirePostRequest(app);

function wirePreRequest(app){
  app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.res = res;

    if (typeof(process.env.CLOUDINARY_URL)=='undefined'){
      throw new Error('Missing CLOUDINARY_URL environment variable')
    }else{
      // Expose cloudinary package to view
      res.locals.cloudinary = cloudinary;
      next()
    }
  })
}

function wirePostRequest(app){
  app.use((err, req, res, next) => {
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }
  })
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
