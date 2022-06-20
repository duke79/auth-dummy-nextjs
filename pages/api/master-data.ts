// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { JWTData } from '../../types/first-factor.types';
import db_connection from '../../utils/db';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { RequestArgs, ResponseData } from '../../types/master-data.types';

const JWT_TOKEN_KEY = 'THE_PRIVATE_KEY'; // TODO: must come from config

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {} = (req.body || {}) as RequestArgs;

  let username = '';
  try {
    const jwtData = jwt.verify(req.cookies.auth, JWT_TOKEN_KEY) as JWTData;
    username = jwtData.username;
  } catch (error) {
    res
      .setHeader('Set-Cookie', `auth=${''}; HttpOnly; secure;`)
      .status(401)
      .json({ errorMessage: 'Invalid token!' });
  }

  try {
    const queryGetUserByUsername = `SELECT username, phone from auth_user 
        WHERE username=lower('${username}')`;
    const resGetUserByUsername = await db_connection.query(queryGetUserByUsername);
    if (!resGetUserByUsername.rows.length) {
      throw new Error('Empty record!');
    }
    const { phone } = resGetUserByUsername.rows[0];

    const queryGetUserRoles = `SELECT role.title FROM role 
      JOIN user_role ON role.id = user_role.role_id
      JOIN auth_user ON auth_user.id = user_role.user_id
      WHERE auth_user.username = '${username}';`;
    const resGetUserRoles = await db_connection.query(queryGetUserRoles);
    if (!resGetUserRoles.rows.length) {
      throw new Error('Empty record!');
    }
    const resRoles = resGetUserRoles.rows as [{ title: string }];
    const roles = resRoles.map(e => e.title);

    res
      .status(200)
      .json({
        username,
        phone,
        roles,
      });
  } catch (errorMessage: any) {
    res.status(401).send({ errorMessage });
  }
}
