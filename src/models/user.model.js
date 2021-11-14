'use strict';

// Create a Sequelize model
function Users (sequelize,DataTypes) {
    return sequelize.define('users',
    {
        username:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })
  
}
module.exports =Users;
