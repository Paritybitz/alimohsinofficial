import { socialLinks, type SocialKey } from '../data/portfolio'
import { socialHref } from '../lib/links'
import { MaybeLink } from './links'
import { SocialIcon } from './SocialIcons'

const order: SocialKey[] = ['linkedin', 'github', 'instagram', 'email']

export function SocialLinks() {
  return (
    <footer className="social">
      <ul className="social__list" aria-label="Elsewhere">
        {order.map((key) => (
          <li key={key} className="social__item">
            <MaybeLink
              href={socialHref(key)}
              className="social__link"
              pendingClassName="social__link--pending"
              title={socialLinks[key].label}
            >
              <SocialIcon name={key} />
              <span className="visually-hidden">{socialLinks[key].label}</span>
            </MaybeLink>
          </li>
        ))}
      </ul>
    </footer>
  )
}
