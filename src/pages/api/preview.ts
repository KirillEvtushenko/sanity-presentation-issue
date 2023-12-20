import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { NextApiRequest, NextApiResponse } from 'next';

import { sanityClient } from '@/services/sanity';

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(sanityClient, req.url);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid secret token' });
  }

  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });

  return res.end();
};

export default preview;
