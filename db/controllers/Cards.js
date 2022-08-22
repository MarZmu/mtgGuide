const _  = require('lodash');
const { Cards, UserCards, sequelize } = require('../model');
const { QueryTypes } = require ('sequelize');

module.exports.Cards = {

  getCards: (req, res) => {
    const u_id = req.params.user_id;
    console.log(req.query);
    var options = ``;
    _.each(req.query, (val, key) => {
      options += `and ${key} = '${val}';`;
    });
    const query = `SELECT * FROM "Cards" c INNER JOIN "UserCards" uc ON (c.id = cardid) WHERE userid = ${u_id};`;
    const queryWoptions = `SELECT * FROM "Cards" c INNER JOIN "UserCards" uc ON (c.id = cardid) WHERE userid = ${u_id} ${options};`;

    console.log(queryWoptions);

    sequelize.query(queryWoptions, {type: QueryTypes.SELECT})
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) =>  console.log(err));

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
      name: r.name,
      cmc: r.cmc,
      type: r.type,
      rarity: r.rarity,
      text: r.text,
      flavor: r.flavor,
      power: r.power,
      toughness: r.toughness,
      imageUrl: r.imageUrl
    })
      .then(({dataValues}) => {
        UserCards.create({userid: user, cardid: dataValues.id, favcard: false})
          .then(({data}) => console.log(data));

        console.log(dataValues);
        res.json(res);
      })
      .catch((err) =>  res.json(err));


  },

  favorite: (req, res) => {

    const u_id = req.params.user_id;

    UserCards.query(`UPDATE 'UserCards' SET favcard = true WHERE userid = ${u_id}`)
      .then((data) => {
        console.log('make favorite: ', data);
        res.json(data);
      })
      .catch((err) => console.log(err));
  },

  removeCard: (req, res) => {
    const u_id = req.params.user_id;
    const c_id = req.params.card_id;

    const query = `DELETE FROM "UserCards" WHERE userid = ${u_id} and cardid = ${c_id};`;


    console.log(query);

    sequelize.query(query, {type: QueryTypes.DELETE})
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) =>  console.log(err));


  }
};