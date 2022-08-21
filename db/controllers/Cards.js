const { Cards } = require('../model');

module.exports.Cards = {

  getCards: (req, res) => {


    Cards.find(req.query)
      .then((res) => res.sendStatus(200).json(res))
      .catch((err) =>  res.sendStatus(500).json(err));

  },

  saveCard: (req, res) => {

    const user = req.params.user_id;
    const r = req.body.card;
    console.log('VALUE OF R:', r);

    if (Array.isArray(r.colors)){
      r.colors = r.colors[0];
    }

    const cardData = {
      id: r.id,
      name: r.name,
      manacost: r.manaCost,
      cmc: r.cmc,
      colors: r.colors,
      type: r.type,
      rarity: r.rarity,
      text: r.text,
      flavor: r.flavor,
      power: r.power || null,
      toughness: r.toughness || null,
      imageUrl: r.imageUrl
    };

    console.log(user, JSON.stringify(r.name));

    Cards.create( {
      // id: r.id,
      name: r.name,
      // manacost: r.manaCost,
      cmc: r.cmc,
      // colors: r.colors,
      type: r.type,
      rarity: r.rarity,
      text: r.text,
      flavor: r.flavor,
      // power: r.power,
      // toughness: r.toughness,
      imageUrl: r.imageUrl })
      .then(({dataValues}) => {
        console.log(dataValues);
        res.json(res);
      })
      .catch((err) =>  res.json(err));
  },

  favorite: (req, res) => {

    res.send(204);
  },

  removeCard: (req, res) => {
    res.send(204);

  }
};