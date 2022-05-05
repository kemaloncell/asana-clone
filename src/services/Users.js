//model ile ara bir katman
const User = require('../models/Users');
const Project = require("../models/Projects");

const insert = (data) => {
  const user = new User(data);
  return user.save();
};

const loginUser = (loginData) => {
  return User.findOne(loginData);
};

const list = () => {
  return User.find({});
};

const modify = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
}

const remove = (id) => {
    return User.findByIdAndDelete(id,);
}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove
}