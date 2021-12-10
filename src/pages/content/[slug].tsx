import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import React from 'react';
import Img from 'next/image';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  InlineCode,
  Paragraph,
} from '../../components/Typography';
import { Separator } from '../../components/Separator';
import { OrderedList, UnOrderedList } from '../../components/List';
import Quote from '../../components/Quote';
import slugStyle from './index.module.css';
import Tag from '../../components/Tag';

const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: Separator,
  p: Paragraph,
  ol: OrderedList,
  ul: UnOrderedList,
  blockquote: Quote,
  inlineCode: InlineCode,
  a: ({ children, ...props }) => (
    <Link underline {...props}>
      {children}
    </Link>
  ),
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));
  console.log('staticPaths:', paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', `${slug}.mdx`),
    'utf-8'
  );

  const { data, content } = matter(markdownWithMeta);
  const { date, ...frontMatter } = data;
  const mdxSource = await serialize(content);

  return {
    props: {
      date: dayjs(date).format('YYYY-MM-DD'),
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export default function mdx({ frontMatter, date, mdxSource }) {
  // const post = data.mdx;
  // const meta = [
  //   {
  //     name: 'og:url',
  //     content: data.site.siteMetadata.siteUrl + post.fields.slug,
  //   },
  //   {
  //     name: 'og:type',
  //     content: 'article',
  //   },
  //   {
  //     name: 'og:locale',
  //     content: post.frontmatter.locale,
  //   },
  //   {
  //     name: 'article:author',
  //     content: 'https://www.facebook.com/rathes.de',
  //   },
  // ];
  // const imageMeta = post.frontmatter.image
  //   ? [
  //     {
  //       name: 'twitter:image',
  //       content:
  //           data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
  //     },
  //     {
  //       name: 'og:image',
  //       content:
  //           data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
  //     },
  //     {
  //       name: 'og:image:secure_url',
  //       content:
  //           data.site.siteMetadata.siteUrl + post.frontmatter.image.publicURL,
  //     },
  //   ]
  //   : [];
  const a = '';
  debugger;
  return (
    <Layout>
      <section className="max-w-screen-sm mt2.5">
        <Heading1>{frontMatter.title}</Heading1>
        <section
        className={slugStyle.info}
          marginBottom={8}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
        >
          <section>{date}</section>
          <section>
            {frontMatter.categories.map((category) => (
              <Tag color="gray-500">{category}</Tag>
            ))}
          </section>
        </section>
        <section className={slugStyle.thumbContainer}>
          {frontMatter.image && (
            <Img
              layout="responsive"
              src={frontMatter.image}
              alt="thumbnail"
              width={640}
              height={375}
            />
          )}
        </section>
        <MDXRemote {...mdxSource} components={components} />
        <footer className={slugStyle.footer}>
          <Link underline href="/writings">
            返回文章列表
          </Link>
        </footer>
      </section>
    </Layout>
  );
}
