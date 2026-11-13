import { useState } from 'react'
import { sections, type BlogPost } from '../../data/portfolio'
import { PlaceholderNote } from '../links'
import { SectionMore } from './SectionMore'

/** True when the post date carries a time ('2026-11-12T14:30:00-05:00'). */
const hasTime = (value: string) => value.includes('T')

/** A date-only value is read as midday, so no time zone moves it to another day. */
const toDate = (value: string) => new Date(hasTime(value) ? value : `${value}T12:00:00`)

const formatDay = (value: string, month: 'long' | 'short') =>
  new Intl.DateTimeFormat('en-US', { month, day: 'numeric', year: 'numeric' }).format(toDate(value))

/** Shown in the reader's own time zone, with its short name (e.g. 2:30 PM EST). */
const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(
    toDate(value),
  )

const WORDS_PER_MINUTE = 220

const readingTime = (body: string[]) => {
  const words = body.join(' ').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`
}

export function BlogSection() {
  const { posts, link } = sections.blog
  const [reading, setReading] = useState<BlogPost | null>(null)
  const sorted = [...posts].sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime())

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
          <p className="entry__meta post__meta">
            <time dateTime={reading.date}>
              {formatDay(reading.date, 'long')}
              {hasTime(reading.date) && (
                <>
                  <span aria-hidden="true"> · </span>
                  {formatTime(reading.date)}
                </>
              )}
            </time>
            <span aria-hidden="true"> · </span>
            {readingTime(reading.body)}
          </p>
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
                    {formatDay(post.date, 'short')}
                  </time>
                </div>
                <p className="entry__text">{post.summary}</p>
                <p className="entry__meta">{readingTime(post.body)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SectionMore label={link.label} to={link.ref} />
    </>
  )
}
