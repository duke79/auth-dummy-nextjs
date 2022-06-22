import { sendSMS } from './../../utils/sms';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestArgs, ResponseData, JWTData } from '../../types/first-factor.types';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../../utils/db/entity/user';
import { config } from '../../config';
import { getFreshJwtToken, verifyJwtTokenAndGetUser } from '../../utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { username, password } = (req.body || {}) as RequestArgs;

  if (req.cookies.auth) {
    // console.log({ cookies: req.cookies });
    const userFromRequest = verifyJwtTokenAndGetUser(req.cookies.auth);
    // console.log({ userFromRequest });
    if (userFromRequest.username === username) {
      res.status(200).json({ errorMessage: 'User already logged in!' });
    }
  }

  try {
    // console.log("req nom", req.body);
    const users = await User.getUserByUserName(username);

    const record = users?.rows[0];
    if (!await argon2.verify(record.password, password)) {
      res.status(401).send({ errorMessage: 'Wrong password!' });
    }

    if (config.isTwoFactorEnabled) {
      const randomOtp = Math.random().toString().slice(2,8);
      User.updateOtp({
        username,
        otp: randomOtp,
      });
      await sendSMS({
        to: record.phone,
        body: `Your OTP is - ${randomOtp}`,
      });
    }

    const authToken = getFreshJwtToken({ username });
    res
      // .setHeader('Access-Control-Allow-Origin', '*')
      // .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      // .setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie')
      // .setHeader('Access-Control-Allow-Credentials', 'true')
      // .setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
      .setHeader('Set-Cookie', `auth=${authToken}; HttpOnly; secure;`)
      .status(200)
      .json({
        name: record.username,
        isTwoFactorEnabled: config.isTwoFactorEnabled,
      });
      // res.status(401).end();
  } catch (errorMessage: any) {
    console.log({ errorMessage });
    res.status(401).send({ errorMessage });
  }
}
