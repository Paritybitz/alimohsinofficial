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

export type SectionId = 'career' | 'projects' | 'content' | 'photography'

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

export interface ContentPiece {
  title: string
  platform: string
  href: string
  /** Optional small thumbnail, e.g. '/images/content/reel-1.jpg'. */
  thumbnail?: string
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
}

/* ── Identity ──────────────────────────────────────────────── */

export const identity = {
  name: 'Ali Mohsin.',
  subtitle: [
    'Software engineer by profession.',
    'Creator by curiosity.',
    'Photographer by perspective.',
  ],
  pageTitle: 'Ali Mohsin',
  metaDescription:
    'Ali Mohsin — software engineer by profession, creator by curiosity, photographer by perspective.',
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
      width: 1084,
      height: 1404,
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
    intro: {
      text: 'A short statement about what you make and why — your creative voice in one or two lines.',
      placeholder: true,
    },
    /** Up to three. Thumbnails are optional. */
    items: [
      { title: 'Piece title', platform: 'Platform', href: '', placeholder: true },
      { title: 'Piece title', platform: 'Platform', href: '', placeholder: true },
      { title: 'Piece title', platform: 'Platform', href: '', placeholder: true },
    ],
    link: { label: 'Follow on Instagram', ref: 'instagram' },
  },

  photography: {
    id: 'photography',
    label: 'Photography',
    intro: {
      text: 'Add three to five of your own photographs below.',
      placeholder: true,
    },
    /** Three to five. Ratios shape the empty frames until real images arrive. */
    photos: [
      { src: '', alt: 'Photograph one', ratio: 4 / 5 },
      { src: '', alt: 'Photograph two', ratio: 3 / 2 },
      { src: '', alt: 'Photograph three', ratio: 4 / 5 },
      { src: '', alt: 'Photograph four', ratio: 3 / 2 },
      { src: '', alt: 'Photograph five', ratio: 4 / 5 },
    ],
    link: { label: 'More on Instagram', ref: 'instagram' },
  },
}

export const sectionOrder: SectionId[] = ['career', 'projects', 'content', 'photography']

export type SocialKey = keyof typeof socialLinks
