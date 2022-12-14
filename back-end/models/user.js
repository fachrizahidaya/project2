'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: 
    {
      type:DataTypes.STRING,
     
    },
    email: 
    {
      type:DataTypes.STRING,

    },
    phoneNumber: 
    {
      type:DataTypes.STRING,
     

    },
    password: 
    {
      type:DataTypes.STRING,
      
      
    },
    loginAttempt: 
    {
      type:DataTypes.INTEGER,
      defaultValue: false
    },
    isVerified: 
    {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    isValid: 
    {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};