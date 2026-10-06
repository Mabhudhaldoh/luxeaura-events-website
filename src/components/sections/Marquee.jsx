/**
 * Slim marquee band used between major homepage sections.
 * The list is duplicated so the -50% keyframe loops seamlessly.
 */
export default function Marquee({ items, tone = 'dark' }) {
  if (!items?.length) return null

  return (
    <div
      className={`marquee ${tone === 'dark' ? 'section--dark' : 'section--ivory-deep'}`}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <span className="marquee__item" key={copy}>
            {items.map((item) => (
              <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '3rem' }}>
                {item}
                <span className="marquee__dot" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
