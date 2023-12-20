
import { cdnSanityClient, sanityClient } from '@/services/sanity';
import { getPageQuery } from './get-page-query';

export interface Options {
  path: string;
  preview: boolean;
}

export async function resolveStaticProps({ path, preview }: Options): Promise<unknown> {
  const client = preview ? sanityClient : cdnSanityClient;
  const { query, params } = getPageQuery(path);

  const props = await client.fetch(query, params);

  return props;
};