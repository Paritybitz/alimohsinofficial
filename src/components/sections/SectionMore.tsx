import { socialLinks, type SocialKey } from '../../data/portfolio'
import { socialHref } from '../../lib/links'
import { MaybeLink } from '../links'

/** The quiet closing link at the bottom of each section. */
export function SectionMore({ label, to }: { label: string; to: SocialKey }) {
  return (
    <footer className="section__footer">
      <MaybeLink
        href={socialHref(to)}
        className="section__more"
        pendingClassName="section__more--pending"
        pendingHint={`Add your ${socialLinks[to].label} link in src/data/portfolio.ts`}
      >
        {label}
      </MaybeLink>
    </footer>
  )
}
