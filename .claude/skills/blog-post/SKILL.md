---
name: blog-post
description: Turn Ali's rough thoughts, notes, voice-memo transcripts or bullet points into a short, polished blog post and add it to the Blog chapter of this website (src/data/portfolio.ts), with the publish date and time. Use this skill whenever Ali wants to write, draft, post, publish or polish a blog post, a note, an essay or "a few thoughts" for the site, even when the word "blog" is not used (for example "put this on my site", "turn this into a post", "I've been thinking about X, write it up"). Also use it to edit or fix a post that is already on the site.
---

# Blog post

This skill is written in ASD-STE100 Simplified Technical English.

## 1. Purpose

Use this skill to change Ali's thoughts into a short blog post.
The post goes into the Blog chapter of this website.

The website shows each post in two states:

| State | What the reader sees |
|---|---|
| Closed (in the list) | Title, short date, summary, reading time. |
| Open (after a click on the title) | Title, full date, time, reading time, full text. A button goes back to the list. |

The code for these states is in `src/components/sections/BlogSection.tsx`.
Do not change this code to add a post.
The data for each post is in `src/data/portfolio.ts`, in `sections.blog.posts`.

## 2. Data format

Each post is one object with these fields:

```ts
{
  title: 'Short, specific title',
  date: '2026-11-12T14:30:00-05:00',
  summary: 'One sentence that tells the reader why to open the post.',
  body: [
    'Paragraph one.',
    'Paragraph two.',
  ],
}
```

| Field | Rule |
|---|---|
| `title` | 3 to 8 words. Sentence case. A strong, general message that is true for all readers. Not about Ali: no "I", "my" or "me". No colon in the middle. No question that the post does not answer. |
| `date` | ISO 8601 date and time, with the UTC offset. Get it with the command in step 4.4. |
| `summary` | One sentence. 20 words or less. This text is all that the reader sees before the click. |
| `body` | One string for each paragraph. 3 to 6 paragraphs. 120 to 450 words in total. |

The site calculates the reading time from `body`. Do not add a field for it.
Do not add `placeholder: true` to a real post.

## 3. Writing rules

These rules make the post sound like Ali, but clearer.

### 3.1 Content

1. Keep Ali's ideas, opinions and examples. These are the reason for the post.
2. Do not add facts, numbers, names, quotes or events that Ali did not give.
   A false detail in a personal blog damages trust in all other posts.
3. If a fact is not clear, ask Ali. Do not guess.
4. Keep one main idea in each post.
   If the notes have two or more main ideas, tell Ali. Recommend one post for each idea.
5. Remove ideas that do not support the main idea.

### 3.2 Structure

1. Paragraph 1: Start with the main idea, or with a specific moment that shows it.
   Do not start with background or with a general statement about the world.
2. Middle paragraphs: Give the reasons, the examples and what Ali learned.
3. Last paragraph: End with one clear thought, a decision or a question for the reader.
   Do not start it with "In conclusion" or a similar phrase.
4. Use no headings and no lists. The site shows the body as paragraphs only.

### 3.3 Voice and style

1. Write in the first person ("I").
2. Use Ali's own words and phrases where they are clear.
3. Write short sentences. Use the active voice.
4. Use plain words. Do not use buzzwords, hype or filler.
   Examples of words to remove: "delve", "journey", "game-changer", "unlock", "in today's fast-paced world", "it's worth noting".
5. Do not use markdown, HTML or emoji in the text. The site shows the text as plain text.
6. Use typographic punctuation: ’ “ ” — and …
   These characters look better, and an apostrophe (’) does not break the string in the code.

## 4. Procedure

### 4.1 Get the thoughts

1. Read the thoughts that Ali gives. They can be notes, bullets, a transcript or a draft.
2. If Ali gives no thoughts, ask for them. Ask one question only: "What do you want to say?"
3. If the main idea is not clear, ask a maximum of 2 short questions. Then write.

### 4.2 Write the draft

1. Find the main idea. Write it for yourself in one sentence.
2. Write the `body` with the rules in section 3.
3. Write the `title`. Find the general lesson in the main idea. Write the lesson as the title.
   The post tells Ali's story. The title tells the message that all readers can use.
   Example: for a post about the feedback that Ali gets on a heavy schedule, use "The weight of getting better", not "Working hard or too hard".
   Give Ali the title and 2 alternative titles in step 4.7.
4. Write the `summary` last. It must make the reader want to open the post.
   It must not repeat the title.

### 4.3 Do a check of the draft

Read the draft again. Make sure that:

- All facts come from Ali.
- The word count of `body` is 120 to 450.
- Each sentence is necessary. Remove a sentence if the post is equally good without it.
- The post sounds like a person, not like a press release.

### 4.4 Get the date and time

Run this command to get the local date and time with the UTC offset:

```bash
date +%Y-%m-%dT%H:%M:%S%z | sed -E 's/([+-][0-9]{2})([0-9]{2})$/\1:\2/'
```

The result has this format: `2026-11-12T14:30:00-05:00`.

1. Use this value for `date`.
2. If Ali gives a different publish date or time, use that value. Keep the same format.

NOTE: The colon in the offset (`-05:00`) is necessary. Some browsers cannot read `-0500`.

### 4.5 Add the post to the site

1. Open `src/data/portfolio.ts`.
2. Find `sections.blog.posts`.
3. Add the new post as the first item in the array.
4. Use single quotes for each string, as the rest of the file does.
5. If a string contains a straight quote ('), change it to a typographic quote (’).

CAUTION: Do not change other posts or other sections of the file. Ali writes these by hand.

### 4.6 Do a test of the change

1. Run `npm run lint`.
2. Run `npm run build`.
3. If an error occurs, correct it. Then run the two commands again.
4. If Ali wants to see the post, run `npm run dev`. Give Ali the local URL.
   Tell Ali to open the Blog chapter and click the title.

### 4.7 Report to Ali

Show Ali:

1. The title, the summary and the full text of the post.
2. The date and time that the site will show.
3. The word count and the reading time.

Then ask Ali if the post is correct.
If Ali gives changes, make them. Then do steps 4.3, 4.6 and 4.7 again.

### 4.8 Publish

WARNING: A push to the `main` branch publishes the website at once. Do not commit or push until Ali tells you to.

When Ali approves the post and tells you to publish:

1. Commit only `src/data/portfolio.ts`.
   Use this commit message format: `blog: add "<title>"`.
2. Push to `main`.
3. Tell Ali that the GitHub Actions workflow now builds and publishes the site.

## 5. Edit a post that is on the site

1. Find the post in `sections.blog.posts`.
2. Make only the changes that Ali asks for.
3. Do not change `date`. The date shows when Ali first published the post.
4. Do steps 4.3, 4.6, 4.7 and 4.8.

## 6. Example

### 6.1 Thoughts from Ali

> been using claude code as my video editor for reels. honestly the biggest thing isnt speed its that every time i correct it, it writes the rule down and never makes that mistake again. like a junior editor that actually remembers. took me a while to trust it on cuts tho. the verbatim check is what fixed that — it fails the render if a word got clipped

### 6.2 Post

```ts
{
  title: 'Good tools learn from mistakes',
  date: '2026-11-12T14:30:00-05:00',
  summary: 'The best part of my AI video editor is not the speed, but that it remembers every note.',
  body: [
    'I edit my Instagram reels with Claude Code now. People expect me to say the best part is speed. It isn’t.',
    'The best part is that it remembers. Each time I correct a cut or a caption, it writes that note down as a rule. It does not make the same mistake twice. It is like a junior editor who actually keeps notes.',
    'Trust took longer. For weeks I checked every cut by hand, because one clipped word can ruin a reel. What changed my mind was a simple gate: a verbatim check that fails the render if a word is missing or cut short.',
    'Now I give notes, not instructions. The editor gets better each week, and I spend my time on the ideas instead of the timeline.',
  ],
},
```
