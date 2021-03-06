const jwt = require('jsonwebtoken');

const jwtMiddleware = require('express-jwt');
const passwordHash = require('password-hash');
const { user } = require('../mongo');
const { jwtSecret } = require("../config");

const configSecurity = (app) => {
  const unprotected = [
    /\/track*/,
    /favicon.ico/,
    /login/,
    /register/
  ];
app.use(jwtMiddleware({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: unprotected }));
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await user.find({ email });
    //const users = await data.user.find({email});

    if (users.length === 1 && passwordHash.verify(password, users[0].password)) {
      const user = users[0];
      console.log('inside', user)
      const token = jwt.sign({ id: user._id }, jwtSecret);
      res.status(200).send({ token, user });
    } else {
      res.status(401).send({ message: 'Username or password incorrect' });
    }
  });

  app.post('/register', async (req, res) => {
    const { password } = req.body;
    req.body.password = passwordHash.generate(password);
    const newUser = new user(req.body);
    newUser.save().then(result => {
      const token = jwt.sign({ id: result._id }, jwtSecret);
      res.send({ token, user:result });
    }).catch(e => {
      res.status(500).send({ error: e.message });
    });
  });

  app.patch('/edituserprofile/:id', async (req, res) => {
    const { password } = req.body;
    const newPassword = passwordHash.generate(password);
    user.findByIdAndUpdate(req.params.id, { password: newPassword })
      .then(result => {
        const token = jwt.sign({ id: result._id }, jwtSecret);
        res.send({ token });
      }).catch(e => {
        res.status(500).send({ error: e.message });
      });
  });
}

module.exports = {
  configSecurity,
}
