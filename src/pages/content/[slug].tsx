import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import React from 'react';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
} from '../../components/Typography';
import { Separator } from '../../components/Separator';
import { OrderedList, UnOrderedList } from '../../components/List';
import { Quote } from '../../components/Quote';

const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: Separator,
  p: Paragraph,
  ol: OrderedList,
  // ul: UnOrderedList,
  blockquote: Quote,
  // inlineCode: InlineCode,
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
  debugger;

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
  return (
    <Layout>
      <section className="max-w-screen-sm mt2.5">
        <Heading1>{frontMatter.title}</Heading1>
        <section
          marginBottom={8}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
        >
          <section>{date}</section>
          {/* <section> */}
          {/*  {frontMatter.categories.map((category) => ( */}
          {/*    <Tag color="silver">{category}</Tag> */}
          {/*  ))} */}
          {/* </section> */}
        </section>
        {/* <section marginBottom={4} marginTop={4}> */}
        {/*  {frontMatter.image && ( */}
        {/*    <Img fluid={frontMatter.image.childImageSharp.fluid} /> */}
        {/*  )} */}
        {/* </section> */}
        <MDXRemote {...mdxSource} components={components} />
        <section element="footer" marginTop={32} marginBottom={32}>
          <Link underline href="/writings">
            返回文章列表
          </Link>
        </section>
      </section>
    </Layout>
  );
}
