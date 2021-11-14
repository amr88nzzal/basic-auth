'use strict';

// 3rd Party Resources
const express = require('express');
const base64 = require('base-64');
const logger = require('./middleware/logger.middleware');
const err404= require('./error-handler/404')
const err500= require('./error-handler/500')
const router = require('./auth/router')



// Prepare the express app
const app = express();
// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(router)
//==============================
app.use(logger);
app.use('*',err404);
app.use(err500);
//==============================



// make sure our tables are created, start up the HTTP server.
function start(port){
    app.listen(port, () => console.log('server up on Port :',port));
}

module.exports={
  start:start,
  server:app}