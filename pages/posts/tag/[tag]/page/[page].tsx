import Head from 'next/head';
import { getPostsByTagAndPage } from '../../../../../lib/notionAPI';
import SinglePost from '../../../../../components/Post/SinglePost';
import { GetStaticPaths, GetStaticProps } from 'next';
import Pagination from '../../../../../components/Pagination/Pagination';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { tag: 'blog', page: '1' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page.toString();
  const currentTag = context.params?.tag.toString();

  const upperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const posts = await getPostsByTagAndPage(
    upperCaseCurrentTag,
    parseInt(currentPage, 10)
  );

  return {
    props: { posts },
    revalidate: 60,
  };
};

const BlogTagPageList = ({ posts, numberOfPage }) => {
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Notion-Blog</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>
          Notion Blog🚀
        </h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
          {posts.map((post) => (
            <div className='mx-4' key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPage} />
      </main>
    </div>
  );
};

export default BlogTagPageList;
