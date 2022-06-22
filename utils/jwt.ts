// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JWTData } from '../types/first-factor.types';

export const getFreshJwtToken = (options: JWTData) => {
  const authToken = jwt.sign(options, config.jwtTokenKey, {
    expiresIn: '1h',
  });
  return authToken;
};

export const verifyJwtTokenAndGetUser = (token: string, twoFactor = false) => {
  const userFromRequest = jwt.verify(token, config.jwtTokenKey) as JWTData;
  if (!userFromRequest.username || (twoFactor && !userFromRequest.phone)) {
    throw new Error('Invalid token!');
  }
  return userFromRequest;
};
