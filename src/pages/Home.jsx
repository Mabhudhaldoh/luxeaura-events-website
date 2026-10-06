import Seo from '../components/seo/Seo'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import ServicesPreview from '../components/sections/ServicesPreview'
import FeaturedWork from '../components/sections/FeaturedWork'
import Marquee from '../components/sections/Marquee'
import WhyLuxeAura from '../components/sections/WhyLuxeAura'
import Process from '../components/sections/Process'
import Testimonial from '../components/sections/Testimonial'
import CtaBand from '../components/sections/CtaBand'
import { site } from '../data/site'

const MARQUEE_ITEMS = [
  'Luxury Weddings',
  'Corporate Events',
  'Private Celebrations',
  'Venue Transformation',
  'Floral Design',
]

export default function Home() {
  return (
    <>
      <Seo
        title="LuxeAura Events | Luxury Event Design & Styling"
        description={site.description}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'LuxeAura Events | Luxury Event Design & Styling',
          url: site.url,
        }}
      />

      <Hero />
      <Intro />
      <ServicesPreview />
      <FeaturedWork />
      <Marquee items={MARQUEE_ITEMS} />
      <WhyLuxeAura />
      <Process />
      <Testimonial />
      <CtaBand secondary="Email the Studio" />
    </>
  )
}
