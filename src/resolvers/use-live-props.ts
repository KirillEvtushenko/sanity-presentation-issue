import { useQuery } from '@sanity/react-loader';

import { Options } from '.';
import { getPageQuery } from './get-page-query';

export function useLiveProps(options: Options, initial: unknown): unknown {
  const { query, params } = getPageQuery(options.path);
  const { data } = useQuery<unknown>(query, params, { initial: null });

  if (data) {
    return { data };
  }

  return initial;
}
