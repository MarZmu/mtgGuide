

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('magicDB', 'root'); //db and user, no password


const Users = sequelize.define('Users', {
  id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
  customer_id: {type: Sequelize.INTEGER, unique: true, allowNull: false, foriegnKey: true},
  username: {type: Sequelize.String, allowNull: false, unique: true},
  passWord: {type: Sequelize.String, allowNull: false, minLength: 10}
});

const Cards = sequelize.define('Cards', {
  id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
  name:
  type:
  manaCost:
  toughness:
  rarity:
  imageUrl:
});

Users.sync();
Cards.sync();

module.exports.Users = Users;
module.exports.Cards = Cards;