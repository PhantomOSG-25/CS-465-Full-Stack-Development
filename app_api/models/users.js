const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

// Set password (creates salt + hash)
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, 'sha512')
    .toString('hex');
};

// Validate password
userSchema.methods.validPassword = function (password) {
  if (!this.salt || !this.hash) return false;

  const hash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, 'sha512')
    .toString('hex');
  const storedHash = Buffer.from(this.hash, 'hex');
  const suppliedHash = Buffer.from(hash, 'hex');
  return storedHash.length === suppliedHash.length
    && crypto.timingSafeEqual(storedHash, suppliedHash);
};

// Generate JWT
userSchema.methods.generateJWT = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000, 10)
    },
    process.env.JWT_SECRET
  );
};

mongoose.model('User', userSchema);
