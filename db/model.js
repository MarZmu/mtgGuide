

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('magicdb', 'marzmu', 'marzmu', {//db and user, no password
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    keepAlive: true,
    statement_timeout: 2500
  }
}, (err, result) => {
  if (err)  {
    console.log('Error trying to connect to DB:', err);
  } else {
    console.log('connected to DB!');
  }
});


const Users = sequelize.define('Users', {
  id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, allowNull: false, unique: true, isUppercase: true },
  password: { type: Sequelize.STRING, allowNull: false, minLength: 8 }
});

Users.sync().then(() => {
  console.log('User table created');
}).catch((err) => {
  console.log('Error making User Table', err);
});

// future: make the colors an array for when implementing icons
const Cards = sequelize.define('Cards', {
  id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  // manacost: { type: Sequelize.STRING, allowNull: false, unique: false },
  cmc: { type: Sequelize.INTEGER, allowNull: false },
  // colors: { type: Sequelize.STRING, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false, unique: false },
  rarity: { type: Sequelize.STRING, allowNull: false },
  text: { type: Sequelize.STRING, allowNull: false, unique: false },
  flavor: { type: Sequelize.STRING, allowNull: false, unique: false },
  // power: { type: Sequelize.INTEGER, default: 0 },
  // toughness: { type: Sequelize.INTEGER, default: 0},
  imageUrl: { type: Sequelize.STRING, unique: true, allowNull: false }
}, { timestamps: false });

Cards.sync().then(() => {
  console.log('Cards table created');
}).catch((err) => {
  console.log('Error making Cards Table', err);
});

const UserCards = sequelize.define('UserCards', {
  // user_id: { type: Sequelize.INTEGER, unique: false, allowNull: false, foriegnKey: true },
  // card_id: { type: Sequelize.INTEGER, unique: false, allowNull: false, foriegnKey: true },
  fav_card: { type: Sequelize.BOOLEAN, unique: false, default: false, allowNull: false}
}
);

UserCards.sync().then(() => {
  console.log('UC table created');
}).catch((err) => {
  console.log('Error making UC Table', err);
});

Users.belongsToMany(Cards, { through: UserCards, foriegnKey: 'user_id', otherKey: 'card_id' });
Cards.belongsToMany(Users, { through: UserCards, foriegnKey: 'card_id', otherKey: 'user_id' });


module.exports.Users = Users;
module.exports.Cards = Cards;
module.exports.sequelize = sequelize;

/*
table_name = 'UserCards';
table_name | column_name |        data_type
------------+-------------+--------------------------
UserCards  | id          | integer
UserCards  | user_id     | integer
UserCards  | card_id     | integer
UserCards  | createdAt   | timestamp with time zone
UserCards  | updatedAt   | timestamp with time zone
*/