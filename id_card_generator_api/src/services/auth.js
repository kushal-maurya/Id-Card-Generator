import {compareSync, hash} from 'bcryptjs';

import {User} from '../models';
import {generateKey} from '../utils/token';
import {SALT} from '../settings';

export const registerUserService = async (payload) => {
  if (payload.password !== payload.confirmPassword) return null;
  payload.password = await hash(payload.password, SALT);
  delete payload.confirmPassword;
  const newUser = new User(payload);
  return newUser.save();
};

export const loginUserService = async (payload) => {
  const user = await User.findOne({email: payload.email, isActive: true});
  if (!user) return null;
  if (!compareSync(payload.password, user.password)) return null;
  if (!user.token) {
    user.token = {key: generateKey()};
    user.lastLogin = new Date();
    await user.save();
  }
  return {token: user.token.key};
};

export const retrieveUserService = async (user) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateJoined: user.dateJoined,
  };
};

export const logoutUserService = async (user) => {
  user.set('token', undefined, {strict: false});
  await user.save();
  return {};
};
