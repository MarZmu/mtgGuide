const { Cards } = require("../model");

module.exports.Cards = {

  getCards: (req, res) => {

    res.send(200);

  },

  saveCard: (req, res) => {
    // Cards.save();
    res.send(201);

  },

  favorite: (req, res) => {

    res.send(204);
  },

  removeCard: (req, res) => {
    res.send(204);

  }
}