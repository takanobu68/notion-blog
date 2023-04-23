import Link from 'next/link';

const Pagination = () => {
  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        <li className='bg-sky-900 rounded-lg w-6 h-8 relative'>
          <Link
            href={'/'}
            className=' absolute text-gray-100 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
          >
            1
          </Link>
        </li>
        <li className='bg-sky-900 rounded-lg w-6 h-8 relative'>
          <Link
            href={'/'}
            className=' absolute text-gray-100 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
          >
            2
          </Link>
        </li>
        <li className='bg-sky-900 rounded-lg w-6 h-8 relative'>
          <Link
            href={'/'}
            className=' absolute text-gray-100 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
          >
            3
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Pagination;
