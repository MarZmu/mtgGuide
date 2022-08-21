require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { Cards } = require('../db/controllers/Cards.js');
const { Users } = require('../db/controllers/Users.js');
const db = require('../db/model.js').sequelize;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/Cards/:user_id', Cards.getCards);
app.post('/Cards/:user_id', Cards.saveCard);
app.put('/Cards/:user_id', Cards.favorite);
app.delete('/Cards/:user_id', Cards.removeCard);

app.get('/user/:username/:password', Users.verifyUser);
app.post('/user', Users.saveUser);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

