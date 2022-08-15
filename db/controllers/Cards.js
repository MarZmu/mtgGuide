const { Cards } = require('../model');

module.exports.Cards = {

  getCards: (req, res) => {


    Cards.find(req.query)
      .then((res) => res.sendStatus(200).json(res))
      .catch((err) =>  res.sendStatus(500).json(err));

  },

  saveCard: (req, res) => {

    const r = req.body;
    const cardData = {
      id: r.id,
      name: r.imageUrl,
      manaCost: r.manaCost,
      cmc: r.cmc,
      colors: r.colors[0],
      type: r.type,
      rarity: r.rarity,
      text: r.text,
      flavor: r.flavor,
      power: r.power || null,
      toughness: r.toughness || null,
      imageUrl: r.imageUrl
    };

    const newCard = Cards.build(cardData);

    newCard.save()
      .then(() => res.sendStatus(201).json('Card saved!'))
      .catch((err) =>  res.sendStatus(500).json(err));

  },

  favorite: (req, res) => {

    res.send(204);
  },

  removeCard: (req, res) => {
    res.send(204);

  }
}