import { GetStaticProps } from 'next';

import { resolveStaticProps } from '@/resolvers';
import { SpaceCard } from '@/components/SpaceCard';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async context => {
  const { preview } = context;
  const previewOptions = { path: 'NO-ISSUE-BUILDING', preview: Boolean(preview) };
  const data = await resolveStaticProps(previewOptions);

  return {
    props: { data, previewOptions },
  };
};

const Page = props => {
  const { data } = props;

  return (
    <div className='m-10'>
      <Link href="/" className='mr-10 underline font-bold'>Back to home</Link>

      <h2 className='font-bold text-lg'>{data.name}</h2>

      {data.floors?.map(floor => (
        <div className='m-2 p-2 border border-red-500' key={floor._id}>
          <h4 className='font-bold text-lg'>{floor?.title}</h4>

          <div className='flex flex-wrap gap-4 justify-around'>
            {floor?.spaces?.map(space => (
              <SpaceCard space={space} key={space._id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
