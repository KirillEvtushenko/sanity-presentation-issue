import { NextApiRequest, NextApiResponse } from 'next';

const exit = (_: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: false });
  res.writeHead(307, { Location: `/` });
  res.end();
};

export default exit;
