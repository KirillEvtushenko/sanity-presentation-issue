import Link from 'next/link';

const Page = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <Link href="/no-issue" className='mr-10 underline font-bold text-green-600'>Small building page without the issue</Link>

      <Link href="/issue" className='underline font-bold text-red-600'>Huge building page with the issue</Link>
    </div>
  );
};

export default Page;
