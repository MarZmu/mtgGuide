const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('magicDB', 'root');


const User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
  customer_id: {type: Sequelize.INTEGER, unique: true, allowNull: false, foriegnKey: true},
  username: {type: Sequelize.String, allowNull: false, unique: true},
  passWord: {type: Sequelize.String, allowNull: false, minLength: 10}
});

User.hasM

const Cards = sequelize.define('Cards', {
  id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.String, allowNull: false, unique: true},
  type: {type: Sequelize.String, allowNull: false, unique: false},
  colors: {}
  manaCost: {type: Sequelize.String, allowNull: false, unique: false},
  toughness:
  rarity:
  imageUrl: {isUrl: true,
});

User.sync();

