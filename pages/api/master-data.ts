// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { RequestArgs, ResponseData } from '../../types/master-data.types';
import { Role } from '../../utils/db/entity/role';
import { User } from '../../utils/db/entity/user';
import { verifyJwtTokenAndGetUser } from '../../utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {} = (req.body || {}) as RequestArgs;

  let username = '';
  try {
    const jwtData = verifyJwtTokenAndGetUser(req.cookies.auth, config.isTwoFactorEnabled);
    username = jwtData.username;
  } catch (error) {
    res
      .setHeader('Set-Cookie', `auth=${''}; HttpOnly; secure;`)
      .status(401)
      .json({ errorMessage: 'Invalid token!' });
  }

  try {
    const resGetUserByUsername = await User.getUserByUserName(username);
    const { phone } = resGetUserByUsername.rows[0];
    const resGetUserRoles = await Role.getUserRolesByUserName(username);
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
