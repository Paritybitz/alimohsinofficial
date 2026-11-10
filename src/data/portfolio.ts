/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — the only file you need to edit.
 * ─────────────────────────────────────────────────────────────
 *
 *  All personal text, links and images live here.
 *
 *  • A link left as an empty string ('') renders as plain,
 *    non-clickable text, so nothing points somewhere wrong.
 *  • Anything marked `placeholder: true` shows a quiet
 *    "placeholder" note in the overlay until you replace it.
 *  • Images go in /public/images/... and are referenced as
 *    '/images/photography/your-file.jpg'.
 */

export type SectionId = 'career' | 'projects' | 'content' | 'photography' | 'blog'

export interface ExternalLink {
  label: string
  /** Leave empty until you have the real URL. */
  href: string
}

export interface CareerRole {
  title: string
  organisation: string
  period: string
  /** One line on what you did there. Optional. */
  summary?: string
  placeholder?: boolean
}

export interface Project {
  name: string
  description: string
  /** Impact, one line each. Up to three. */
  points?: string[]
  tags: string[]
  /** Repository or live demo. Empty = not linked yet. */
  href: string
  placeholder?: boolean
}

export interface ContentVideo {
  /** Video file in /public/videos/, e.g. '/videos/polar.mp4'. */
  src: string
  /** Still shown before it plays, e.g. '/images/content/polar-poster.webp'. */
  poster: string
  /** The original Instagram post. */
  instagram: string
}

export interface ContentPiece {
  title: string
  /** Short line under the title, e.g. 'UGC creator'. */
  platform: string
  href: string
  /** One or two sentences about the brand or piece. */
  description?: string
  /** A video you made for them, opened in a player from the entry. */
  video?: ContentVideo
  /** Brand logo shown on a light tile, e.g. '/images/content/polar.svg'. */
  logo?: string
  /** Optional small thumbnail, e.g. '/images/content/reel-1.jpg'. */
  thumbnail?: string
  placeholder?: boolean
}

export interface BlogPost {
  title: string
  /** ISO date, e.g. '2026-11-09'. Newest posts are shown first. */
  date: string
  /** One line shown in the list. */
  summary: string
  /** The post itself: one string per paragraph. */
  body: string[]
  placeholder?: boolean
}

export interface Photograph {
  /** Leave empty to show a placeholder frame. */
  src: string
  alt: string
  /** Width / height, used to keep the frame shape before loading. */
  ratio: number
  caption?: string
}

interface TextBlock {
  text: string
  placeholder?: boolean
}

interface SectionBase {
  id: SectionId
  label: string
  intro: TextBlock
  /** Closing link at the bottom of the overlay, pointing to a social profile. */
  link: { label: string; ref: SocialKey }
}

export interface Sections {
  career: SectionBase & {
    roles: CareerRole[]
    highlights: TextBlock[]
    /** Résumé image shown pinned on the left (below the content on phones). */
    resume?: { src: string; alt: string; width: number; height: number }
  }
  projects: SectionBase & { items: Project[] }
  content: SectionBase & { items: ContentPiece[] }
  photography: SectionBase & { photos: Photograph[] }
  blog: SectionBase & { posts: BlogPost[] }
}

/* ── Identity ──────────────────────────────────────────────── */

export const identity = {
  name: 'Ali Mohsin.',
  subtitle: 'Software Engineer, Creator / UGC, Photographer',
  pageTitle: 'Ali Mohsin',
  metaDescription:
    'Ali Mohsin — Software Engineer, Creator / UGC, Photographer.',
}

/* ── Social links (bottom of the page) ─────────────────────── */

export const socialLinks = {
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alimohsin05/' },
  github: { label: 'GitHub', href: 'https://github.com/Paritybitz' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/aali.mohsin/' },
  /** Use the plain address, e.g. 'hello@example.com'. */
  email: { label: 'Email', href: 'aliugcmohsin@gmail.com' },
} satisfies Record<string, ExternalLink>

/**
 * What the email icon opens:
 *  'gmail'    — a Gmail draft addressed to you, in a new tab (visitors need a Google account)
 *  'mail-app' — the visitor's default mail app (mailto:)
 */
export const emailOpensIn: 'gmail' | 'mail-app' = 'gmail'

/* ── Background clip ───────────────────────────────────────── */

/**
 * Optional video that plays very faintly behind everything.
 * Put an .mp4 (ideally under ~6 MB, no text or logos in it) in
 * /public/videos/ and set src to e.g. '/videos/space.mp4'.
 * Leave empty for no video. It's skipped for visitors who prefer reduced motion.
 */
export const backgroundClip = {
  src: '',
  /** 0–1. Keep it low; around 0.12 reads as "felt, not seen". */
  strength: 0.12,
}

/* ── The four chapters ─────────────────────────────────────── */

export const sections: Sections = {
  career: {
    id: 'career',
    label: 'Career',
    // Source: Ali Mohsin Resume.pdf
    intro: {
      text: 'Applied Computer Science at George Mason University, concentrating in software engineering and graduating December 2026. Three roles since 2024 across machine learning, computer vision and AI tooling.',
    },
    roles: [
      {
        title: 'Data Analyst',
        organisation: 'Federal Reserve Board · Washington, D.C.',
        period: 'Jun 2026 — Present',
        summary:
          'Leading an AWS Bedrock RAG platform that indexes 500+ audit documents for 20 OIG IT auditors, and shipped three internal AI audit tools.',
      },
      {
        title: 'AI/ML Software Developer',
        organisation: 'Network Designs (NDi)',
        period: 'May 2025 — Aug 2025',
        summary:
          'Built a YOLOv8 and OpenCV proof of concept that classifies aerial objects in real time with 92% accuracy.',
      },
      {
        title: 'Data Scientist',
        organisation: 'Ballogy.com · FiveRivers Technologies',
        period: 'May 2024 — Aug 2024',
        summary:
          'Deployed YOLOv8 and MediaPipe pose detection on AWS EC2, auto-annotating 2M+ frames for an AI basketball platform.',
      },
    ],
    /** Up to three. */
    highlights: [
      { text: 'Power BI fraud dashboards across three investigations flagged 15 indicators and sped up auditor decisions by 40%.' },
      { text: 'A FastAPI, LangChain and Qdrant modernization blueprint cut analysis time by 80%.' },
      { text: 'CTO of the GMU CS Club and the official GMU hackathon.' },
    ],
    resume: {
      src: '/images/resume.webp',
      alt: 'Ali Mohsin résumé',
      width: 1190,
      height: 1542,
    },
    link: { label: 'Full experience on LinkedIn', ref: 'linkedin' },
  },

  projects: {
    id: 'projects',
    label: 'Projects',
    intro: { text: 'Selected engineering and AI work.' },
    // Sources: local repos in ~/Documents/Github and hackfaxpatriothacks.org
    items: [
      {
        name: 'Street2Elite',
        description: 'Platform and operating system for a youth football academy.',
        points: [
          'Built the MVP on Next.js 15 and Supabase: player registration with photo and medical-form uploads, an admin approval workflow, and session booking on an interactive calendar.',
          'Role-based dashboards for admins and parents, with real-time updates the moment a player is approved.',
          'Designed the business around the product: an eight-part operating brief (offer, pricing, processes, risks) and an AI leadership team of 8 Claude Code agents and 11 skills, from CEO to Head of Safeguarding.',
        ],
        tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Claude Code'],
        href: 'https://github.com/Paritybitz/street2elite',
      },
      {
        name: 'AXON',
        description: 'Commerce backend, business systems and a self-hosted payment processor.',
        points: [
          'Runs its own payment processor: a self-hosted BTCPay Server with a watch-only wallet, so the server never holds a spendable key. That design sidestepped the August 2026 BTCPay hot-wallet exploit entirely.',
          'Signed (HMAC-SHA256) payment webhooks feed one idempotent settlement path, backed by a 15-minute reconciliation job that catches silently dropped webhooks; underpaid or unconfirmed payments go to review, never to fulfilment.',
          'Customer addresses encrypted per row (AES-256-GCM), two-factor auth required for admins, and a back office for orders, inventory, promo codes and split expenses: 40 API routes and 30 migrations over 96 commits.',
        ],
        tags: ['Next.js 16', 'Supabase', 'BTCPay Server', 'GitHub Actions'],
        href: '',
      },
      {
        name: 'AI Video Editor',
        description: 'Claude Code as the editor for my Instagram reels.',
        points: [
          'Turns raw phone takes into finished vertical reels: on-device transcription at about 11× real time, misspeak and pause cutting, captions, zooms, B-roll, sound effects and rendering.',
          'Two automatic gates before anything exports: a verbatim check that fails any render with re-said or clipped words, and an audio check after mastering to −14 LUFS.',
          'Every note I give becomes a standing rule written back into the playbook, so the editor keeps learning my style. About 2,600 lines of Python engine.',
        ],
        tags: ['Claude Code', 'Python', 'FFmpeg', 'faster-whisper', 'HyperFrames'],
        href: '',
      },
      {
        name: 'HackFax × PatriotHacks',
        description: "Official site for George Mason University's hackathon and CTF, February 13–15, 2026.",
        points: [
          'Co-built the site as CTO of the official GMU hackathon, a joint event run by HackFax and PatriotHacks.',
          'One page carries the whole event: registration, a live countdown, the three-day schedule across four campus venues, volunteer and judge sign-ups, FAQ and code of conduct.',
          'Presents 16 sponsors and supporters, including Microsoft, AWS, EY, Peraton and Red Bull.',
        ],
        tags: ['Web', 'MLH'],
        href: 'https://www.hackfaxpatriothacks.org/',
      },
    ],
    link: { label: 'More on GitHub', ref: 'github' },
  },

  content: {
    id: 'content',
    label: 'Content',
    intro: { text: 'Brands I create UGC for.' },
    /** Up to three. Logos and thumbnails are optional. */
    items: [
      {
        title: 'Polar',
        platform: 'UGC creator · AI browser',
        href: 'https://polarbrowser.com',
        logo: '/images/content/polar.svg',
        video: {
          src: '/videos/polar.mp4',
          poster: '/images/content/polar-poster.webp',
          instagram: 'https://www.instagram.com/p/DettOdWAUE1/',
        },
        description:
          'An AI browser that carries out work from plain-language instructions, from quick requests to hours-long research, recruiting and sales tasks.',
      },
      {
        title: 'DevSignal',
        platform: 'UGC creator · Engineering talent',
        href: 'https://www.devsignal.com',
        logo: '/images/content/devsignal.png',
        description:
          'A remote-engineering talent firm that finds, screens and places senior engineers with companies on short notice.',
      },
    ],
    link: { label: 'Follow on Instagram', ref: 'instagram' },
  },

  photography: {
    id: 'photography',
    label: 'Photography',
    intro: { text: 'Selected photographs.' },
    /**
     * Three to five. While none has a `src`, the Photography chapter stays
     * out of the navigation. Add photos, e.g.
     * { src: '/images/photography/name.jpg', alt: 'What it shows', ratio: 4 / 5 }
     */
    photos: [],
    link: { label: 'More on Instagram', ref: 'instagram' },
  },

  blog: {
    id: 'blog',
    label: 'Blog',
    intro: { text: 'Notes on building, creating and seeing.' },
    /**
     * Newest first. While this is empty, the chapter says the first post is on
     * its way. Add a post, e.g.
     * { title: '…', date: '2026-11-09', summary: 'One line.', body: ['Paragraph one.'] }
     */
    posts: [],
    link: { label: 'More on LinkedIn', ref: 'linkedin' },
  },
}

/** Chapters shown in the navigation. Photography appears once it has a photo. */
const hasContent: Record<SectionId, boolean> = {
  career: true,
  projects: true,
  content: sections.content.items.length > 0,
  photography: sections.photography.photos.some((photo) => photo.src),
  blog: true,
}

export const sectionOrder: SectionId[] = (
  ['career', 'projects', 'content', 'photography', 'blog'] satisfies SectionId[]
).filter((id) => hasContent[id])

export type SocialKey = keyof typeof socialLinks
