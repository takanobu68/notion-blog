import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NUMBER_OF_POSTS_PER_PAGE } from '../constants/constants';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPost = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  };
};

export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metaData = getPageMetaData(page);

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metaData,
    markdown: mdString,
  };
};

// Topページ用記事の取得（4つ）
export const getPostsFourTopPage = async (pageSize = 4) => {
  const allPosts = await getAllPost();
  const fourPosts = allPosts.slice(0, pageSize);
  return fourPosts;
};

export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPost();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

export const getNumberOfPages = async () => {
  const allPosts = await getAllPost();

  return Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE) >
    0
    ? 1
    : 0;
};
