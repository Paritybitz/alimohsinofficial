import { sectionOrder, sections, type SectionId } from '../data/portfolio'

interface CategoryNavigationProps {
  active: SectionId | null
  onSelect: (id: SectionId) => void
}

export function CategoryNavigation({ active, onSelect }: CategoryNavigationProps) {
  return (
    <nav className="chapters" aria-label="Explore">
      <ul className="chapters__list">
        {sectionOrder.map((id) => (
          <li key={id} className="chapters__item">
            <button
              type="button"
              className="chapters__link"
              aria-haspopup="dialog"
              aria-expanded={active === id}
              onClick={() => onSelect(id)}
            >
              {sections[id].label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
