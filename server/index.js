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


app.get('/cards', Cards.getCards);
app.post('/Cards*', Cards.saveCard);
app.put('/cards', Cards.favorite);
app.delete('/cards', Cards.removeCard);

app.get('/user/:username/:password', Users.verifyUser);
app.post('/user', Users.saveUser);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

