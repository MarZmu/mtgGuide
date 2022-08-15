const { Users } = require("../model");

module.exports.Users = {

  verifyUser: (req, res) => {

    res.send(200);

  },

  saveUser: (req, res) => {
    // Users.save();
    res.send(201);

  },

}