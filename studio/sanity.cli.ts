import { defineCliConfig } from 'sanity/cli';

import { dataset, projectId } from './config';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});