const { Users } = require('../model');

module.exports.Users = {

  verifyUser: (req, res) => {

    const user = req.query.username;
    const pass = req.query.password;

    console.log('un and pass', user, pass);

    Users.findOne({ where: {username: user, password: pass } })
      .then((res) => {
        console.log(res);
        res.sendStatus(200).json(1);
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
      .then((res) => {
        console.log(res.dataValues.id);
        res.sendStatus(201).end(res.dataValues.id);
      })
      .catch((err) => res.json(err));
  }

};