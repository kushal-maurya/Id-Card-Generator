import {compare, getSalt, hash} from 'bcryptjs';
import {Schema, model} from 'mongoose';

const tokenSchema = new Schema({
  key: {type: String, require: true, unique: true},
}, {timestamps: {createdAt: 'created'}});

const userSchema = new Schema({
  email: {type: String, require: true, unique: true},
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  password: {type: String, require: true},
  isAdmin: {type: Boolean, require: false, default: false},
  isActive: {type: Boolean, require: true, default: true},
  dateJoined: {type: Date, require: true, default: Date.now},
  lastLogin: {type: Date, require: false},
  token: {type: tokenSchema, require: false},
});

userSchema.pre('save', async function(next) {
  // eslint-disable-next-line no-invalid-this
  if (!this.isModified(this.password)) return next();
  try {
    const salt = await getSalt(12);
    // eslint-disable-next-line no-invalid-this
    const hashedPassword = await hash(this.password, salt);
    // eslint-disable-next-line no-invalid-this
    this.password = hashedPassword;
    return next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods.validatePassowrd = async function(password) {
  // eslint-disable-next-line no-invalid-this
  const success = await compare(password, this.password);
  return success;
};

const User = model('User', userSchema);

export default User;
