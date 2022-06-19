// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { FirstFactorRequestArgs } from '../../types/first-factor.types';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = (req.body || {}) as FirstFactorRequestArgs;
  console.log({ cookies: req.cookies });
  res
    // .setHeader('Access-Control-Allow-Origin', '*')
    // .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // .setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie')
    // .setHeader('Access-Control-Allow-Credentials', 'true')
    // .setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
    .setHeader('Set-Cookie', `authToken=abcd; HttpOnly; secure;`)
    .status(200)
    .json(req.body);
  // res.status(401).end();
}
