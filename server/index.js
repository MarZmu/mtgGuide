const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));




const { PORT } = process.env || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

