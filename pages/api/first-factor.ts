// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { FirstFactorRequestArgs } from '../../types/first-factor.types';
import db_connection from '../../utils/db';
import argon2 from 'argon2';

type Data = {
  name: string;
} | {
  errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = (req.body || {}) as FirstFactorRequestArgs;
  console.log({ cookies: req.cookies });

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

    res
      // .setHeader('Access-Control-Allow-Origin', '*')
      // .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      // .setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie')
      // .setHeader('Access-Control-Allow-Credentials', 'true')
      // .setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
      .setHeader('Set-Cookie', `authToken=abcd; HttpOnly; secure;`)
      .status(200)
      .json(record);
    // res.status(401).end();

  } catch (errorMessage: any) {
    res.status(401).send({ errorMessage });
  }
}
