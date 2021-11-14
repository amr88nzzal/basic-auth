'use strict';
const express = require('express');
const router = express.Router();
// const base64 = require('base-64');
const bcrypt = require('bcrypt');
const basicAuth = require('./basicAuth');
const { user } = require('../models/index')

router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);

async function signUp(req, res, next) {
  try {
    //check if the user is already in database
    let reqUser = req.body.username;
    let checkUser = await user.findOne({ where: { username: reqUser } })
    if (!checkUser) {
      //change password in req.body to hashed password
      req.body.password = await bcrypt.hash(req.body.password, 3)
      //create a new user in the database
      let newUser = await user.create(req.body)
      res.status(201).json(newUser)
    } else {
      next('The Username already exists \n Please try another one')
    }

  } catch (error) {
    res.status(403).send('=========\nInvalid SingUp \n(Router)\n=========')
  }
}
async function signIn(req, res, next) {
}
module.exports =router;