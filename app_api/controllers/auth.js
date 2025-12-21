const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      name: req.body.name
    });
    user.setPassword(req.body.password);
    await user.save();

    return res.status(200).json({ token: user.generateJwt() });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(404).json(err);
    if (!user) return res.status(401).json(info);

    return res.status(200).json({ token: user.generateJwt() });
  })(req, res);
};

module.exports = { register, login };
