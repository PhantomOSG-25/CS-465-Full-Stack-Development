const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

// POST /api/register
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const existing = await User.findOne({ email: req.body.email.toLowerCase() }).exec();
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase()
    });

    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// POST /api/login
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(404).json(err);

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    }

    return res.status(401).json(info);
  })(req, res);
};

module.exports = { register, login };
