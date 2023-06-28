import crypto from 'crypto';

export const generateKey = () => {
  const key = crypto.randomBytes(20).toString('hex');
  return key;
};
