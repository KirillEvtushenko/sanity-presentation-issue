import { ClientStegaConfig, createClient } from '@sanity/client/stega';

export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
export const sanityToken = process.env.SANITY_STUDIO_TOKEN;

export function createSanityClient(config: ClientStegaConfig) {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
    apiVersion: '2023-06-21',
    ...config,
  });
}
// Local development
export const sanityClient = createSanityClient({
  useCdn: false,
  token: sanityToken,
  perspective: 'previewDrafts',
});
// Production
export const cdnSanityClient = createSanityClient({
  useCdn: true,
  token: sanityToken,
  perspective: 'published',
});
// Sanity Presentation feature (client-side)
export const sanityPreviewClient = createSanityClient({
  useCdn: false,
  stega: {
    studioUrl,
    enabled: true,
  },
});