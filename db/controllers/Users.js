const { Users } = require('../model');

module.exports.Users = {

  verifyUser: (req, res) => {

    const user = req.params.username;
    const pass = req.params.password;

    console.log('un and pass', user, pass);

    Users.findOne({ where: {username: user.toUpperCase(), password: pass } })
      .then(({dataValues}) => {
        console.log(dataValues);
        res.json(dataValues.id);
      })
      .catch((err) => {
        console.log(err);
        res.json(0);
      });

  },

  saveUser: (req, res) => {

    const user = req.body.username;
    const pass = req.body.password;

    // const newUser = Users.build({username: user, password: pass});

    Users.create({username: user, password: pass})
    // newUser.save()
      .then(({dataValues}) => {
        console.log(dataValues.id);
        res.json(dataValues.id);
      })
      .catch((err) => res.json(err));
  }

};