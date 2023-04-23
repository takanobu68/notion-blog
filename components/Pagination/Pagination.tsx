import Link from 'next/link';
import { getPageLink } from '../../lib/blog-helper';

type Pagination = {
  numberOfPage: number;
  tag?: string;
};

const Pagination = (props: Pagination) => {
  const { numberOfPage, tag } = props;

  const pages: number[] = [];
  for (let i = 1; i <= numberOfPage; ++i) {
    pages.push(i);
  }

  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) => (
          <li key={page} className='bg-sky-900 rounded-lg w-6 h-8 relative'>
            <Link
              href={getPageLink(tag, page)}
              className=' absolute text-gray-100 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
