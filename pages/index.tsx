import Head from 'next/head';
import { getAllPost, getPostsFourTopPage } from '../lib/notionAPI';
import SinglePost from '../components/Post/SinglePost';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsFourTopPage();

  return {
    props: {
      fourPosts,
    },
    revalidate: 60,
  };
};

export default function Home({ fourPosts }) {
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
        {fourPosts.map((post) => (
          <div className='mx-4' key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
