const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('magicDB', 'root');


const User = sequelize.define('User', {
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

User.sync();

