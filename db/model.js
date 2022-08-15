

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('magicDB', 'root', 'root', {
  dialect: 'postgres',
  dialectOptions: {
    keepAlive: true,
    statement_timeout: 2500, 
  },
})
  .then(() => console.log('connected to DB!'))
  .catch((err) => console.log('Error trying to connect to DB:', err)); //db and user, no password


const Users = sequelize.define('Users', {
  id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.String, allowNull: false, unique: true },
  passWord: { type: Sequelize.String, allowNull: false, minLength: 10 }
});

// const UserCards = sequelize.define('UserCards', {
//   user_id: { type: Sequelize.INTEGER, unique: false, allowNull: false, foriegnKey: true },
//   card_id: { type: Sequelize.INTEGER, unique: false, allowNull: false, foriegnKey: true }
// })

const Cards = sequelize.define('Cards', {
  id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.String, allowNull: false, unique: true },
  type: { type: Sequelize.String, allowNull: false, unique: false },
  colors: { type: Sequelize.String, allowNull: false },
  manaCost: { type: Sequelize.String, allowNull: false, unique: false },
  toughness: { type: Sequelize.INTEGER, allowNull: false },
  rarity: { type: Sequelize.String, allowNull: false },
  imageUrl: { isUrl: true, unique: true, allowNull: false }
});

Users.sync();
Cards.sync();

module.exports.Users = Users;
module.exports.Cards = Cards;