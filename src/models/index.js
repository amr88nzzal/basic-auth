'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user.model');
require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV ==='test' ? 'sqlite:memory' : process.env.DATABASE_URL;
console.log(DATABASE_URL);
const sequelizeOptions = process.env.NODE_ENV === 'production' ?{dialectOptions: {
    ssl: {require: true,
          rejectUnauthorized: false}}}:{};

const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions)
// const sequelize = new Sequelize(DATABASE_URL,{})
const user = new UserModel(sequelize,DataTypes)  
console.log(`process.env.NODE_ENV:${process.env.NODE_ENV}\nDATABASE_URL:${DATABASE_URL}\nsequelize${sequelize}\nUser${user}`);

module.exports = {
    db:sequelize,
    user:user
}