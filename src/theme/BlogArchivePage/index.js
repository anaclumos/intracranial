import React from 'react'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'

const translate = {
  singular: translate({
    id: 'blog.archive.posts',
    message: 'posts',
    description: 'Number of posts in the archive: plural',
  }),
  plural: translate({
    id: 'blog.archive.post',
    message: 'post',
    description: 'Number of posts in the archive: singular',
  }),
}

function Year({ year, posts }) {
  return (
    <>
      <h3>
        {year} — {posts.length} {posts.length > 1 ? translate.plural : translate.singular}
      </h3>
      <ul>
        {posts.map((post) => (
          <li key={post.metadata.date}>
            <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
function YearsSection({ years }) {
  return (
    <section className='margin-vert--lg'>
      <div className='container'>
        <div className='row'>
          {years.reverse().map((_props, idx) => (
            <div key={idx} className='col col--4 margin-vert--lg'>
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
function listPostsByYears(blogPosts) {
  const postsByYear = blogPosts.reduceRight((posts, post) => {
    const year = post.metadata.date.split('-')[0]
    const yearPosts = posts.get(year) ?? []
    return posts.set(year, [post, ...yearPosts])
  }, new Map())
  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }))
}
export default function BlogArchive({ archive }) {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  })
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  })
  const years = listPostsByYears(archive.blogPosts)
  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className='hero hero--primary'>
          <div className='container'>
            <h1 className='hero__title'>{title}</h1>
            <p className='hero__subtitle'>{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  )
}
