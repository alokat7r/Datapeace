var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SchemaObject = mongoose.Schema;

var app = express();

/**
 * Connecting to mongodb server which is on mlabs.
 */
mongoose.connect("mongodb://datapeace:datapeace123@ds119969.mlab.com:19969/temp" /*MONGODB SERVER URI*/ , function(error) {
    if (!error) {
        console.log('Connection to database successful');
    } else {
        console.log('Error in connection to database due to %s', error)
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Disabeling JWT for this project, but through JWT we can easily increase the security of HTTP request response Restful API.
 */
// app.use('/', function(req, res, next) {
//     //Varify JWT    
//     var token = req.get("x-access-token") || req.body.x_access_token;
//     jwt.verify(token, Variables.JWTSecret, function(err, decoded) {
//         if (err) {
//             console.log("Token error..%s", err);
//             res.sendStatus(500);
//         } else {
//             next();
//         }
//     });
// });
app.use('/', indexRouter);
app.use('/api', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log("ERROR HERE");
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.sendStatus(err.status || 500);
    //res.render('error');
});

module.exports = app;