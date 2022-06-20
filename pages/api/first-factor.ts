// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestArgs, ResponseData, JWTData } from '../../types/first-factor.types';
import db_connection from '../../utils/db';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_KEY = 'THE_PRIVATE_KEY'; // TODO: must come from config

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { username, password } = (req.body || {}) as RequestArgs;
  // console.log({ cookies: req.cookies });
  const userFromRequest = jwt.verify(req.cookies.auth, JWT_TOKEN_KEY) as JWTData;
  // console.log({ userFromRequest });
  if (userFromRequest.username === username) {
    res.status(200).json({ errorMessage: 'User already logged in!' });
  }

  try {
    // console.log("req nom", req.body);
    const query = `SELECT * from auth_user 
        WHERE username=lower('${username}')`;
        // AND password='${await argon2.hash(password)}'`;
    // console.log({ query });
    const { rows } = await db_connection.query(query);
    
    if (!rows.length) {
      throw new Error('Empty record!');
    }

    const record = rows[0];
    if (!await argon2.verify(record.password, password)) {
      throw new Error('Wrong password!');
    }

    const authToken = jwt.sign({ username } as JWTData, JWT_TOKEN_KEY, {
      expiresIn: '1d',
    });
    res
      // .setHeader('Access-Control-Allow-Origin', '*')
      // .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      // .setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie')
      // .setHeader('Access-Control-Allow-Credentials', 'true')
      // .setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
      .setHeader('Set-Cookie', `auth=${authToken}; HttpOnly; secure;`)
      .status(200)
      .json(record);
    // res.status(401).end();

  } catch (errorMessage: any) {
    res.status(401).send({ errorMessage });
  }
}
