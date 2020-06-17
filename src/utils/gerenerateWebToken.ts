import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/settings';

const generateWebToken = (userInfo: Object) => {
  const token = jwt.sign(userInfo, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};

export default generateWebToken;
