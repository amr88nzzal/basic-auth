'use strict';
const {start}=require('./src/server')
const {db}=require('./src/models/index')
require('dotenv').config();
db.sync()
  .then(() => {
    start(process.env.PORT|| 3001) 
  }).catch(e => {
    console.error('Could not start server', e.message);
  });