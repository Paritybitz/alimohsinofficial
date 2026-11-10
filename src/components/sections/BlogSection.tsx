import { useState } from 'react'
import { sections, type BlogPost } from '../../data/portfolio'
import { PlaceholderNote } from '../links'
import { SectionMore } from './SectionMore'

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    new Date(`${iso}T12:00:00`),
  )

export function BlogSection() {
  const { posts, link } = sections.blog
  const [reading, setReading] = useState<BlogPost | null>(null)
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  if (reading) {
    return (
      <div className="section__body">
        <article className="post">
          <button type="button" className="post__back" onClick={() => setReading(null)}>
            All posts
          </button>
          <h3 className="post__title">
            {reading.title}
            <PlaceholderNote show={reading.placeholder} />
          </h3>
          <time className="entry__meta" dateTime={reading.date}>
            {formatDate(reading.date)}
          </time>
          <div className="post__body">
            {reading.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    )
  }

  return (
    <>
      <div className="section__body">
        {sorted.length === 0 ? (
          <p className="entry__text">The first post is on its way.</p>
        ) : (
          <ul className="entries">
            {sorted.map((post, i) => (
              <li key={i} className="entry">
                <div className="entry__head">
                  <h3 className="entry__title">
                    <button type="button" className="post__open" onClick={() => setReading(post)}>
                      {post.title}
                    </button>
                    <PlaceholderNote show={post.placeholder} />
                  </h3>
                  <time className="entry__meta" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="entry__text">{post.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SectionMore label={link.label} to={link.ref} />
    </>
  )
}
