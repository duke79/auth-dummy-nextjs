// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { JWTData } from '../../types/first-factor.types';
import jwt from 'jsonwebtoken';
import { RequestArgs, ResponseData } from '../../types/second-factor.types';
import { User } from '../../utils/db/entity/user';
import { config } from '../../config';
import { getFreshJwtToken, verifyJwtTokenAndGetUser } from '../../utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { otp } = (req.body || {}) as RequestArgs;

  let username = '';
  try {
    const jwtData = verifyJwtTokenAndGetUser(req.cookies.auth);
    username = jwtData.username;
    if (jwtData.phone) {
      res.status(200).json({ errorMessage: 'User already logged in!' });
    }
  } catch (error) {
    res
      .setHeader('Set-Cookie', `auth=${''}; HttpOnly; secure;`)
      .status(401)
      .json({ errorMessage: 'Invalid token!' });
  }

  try {
    const resGetUserByUsername = await User.getUserByUserName(username);
    const record = resGetUserByUsername.rows[0];

    if (otp !== record.otp) {
      console.error({ otp, record });
      throw new Error('Wrong otp!');
    }

    User.updateOtp({
      username,
      otp,
    });

    const { phone } = resGetUserByUsername.rows[0];

    const authToken = getFreshJwtToken({ username, phone });
    res
      .setHeader('Set-Cookie', `auth=${authToken}; HttpOnly; secure;`)
      .status(200)
      .end();
  } catch (errorMessage: any) {
    res.status(401).send({ errorMessage });
  }
}
