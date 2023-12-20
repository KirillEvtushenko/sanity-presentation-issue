import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';

import { structure } from './desk-structure';
import schemas from './schemas';
import { title, apiVersion, projectId, dataset, appOrigin } from './config';

export default defineConfig({
  title,
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin: appOrigin,
        draftMode: {
          enable: "/api/preview",
          disable: "/api/exit-preview",
        },
      },
    }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
  schema: {
    types: schemas,
  },
});