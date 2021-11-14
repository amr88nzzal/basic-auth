'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { user } = require('../models/index');

async function basicAuth(req, res, next) {
  try {
    let headerEncoded = req.headers.authorization.split(' ').pop();
    console.log(headerEncoded);
    let [ username, password ] = base64.decode(headerEncoded).split(':')
console.log(username, password);
    let userRecord = await user.findOne({ where: {username } });
    let valid = await bcrypt.compare(password, userRecord.password);
    console.log(valid);
    if (valid) {
      res.status(200).json(userRecord);
    } else {
      next('=========\nInvalid Password \n(BasicAuth)\n=========')
    }
  } catch (error) {
    res.status(403).send('=========\nInvalid Login (UserName) \n(BasicAuth)\n=========')
  }
  //new()}
}
module.exports = basicAuth;