import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader('Set-Cookie', `auth=${''}; HttpOnly; secure;`)
    .status(200)
    .end();
}
