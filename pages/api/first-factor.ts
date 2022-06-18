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
  res.status(200).json(req.body);
  // res.status(401).end();
}
