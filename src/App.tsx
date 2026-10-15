import { useEffect } from 'react'
import { Seam } from './components/ui'
import { ScrollTrigger } from './lib/gsap'
import { AntiTracker } from './sections/AntiTracker'
import { Control } from './sections/Control'
import { Downloads } from './sections/Downloads'
import { Ecosystem } from './sections/Ecosystem'
import { FAQ } from './sections/FAQ'
import { Features } from './sections/Features'
import { FinalCTA } from './sections/FinalCTA'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Locations } from './sections/Locations'
import { Nav } from './sections/Nav'
import { Protocols } from './sections/Protocols'
import { Showcase } from './sections/Showcase'
import { SplitTunneling } from './sections/SplitTunneling'
import { Statement } from './sections/Statement'

export default function App() {
  // Recalculate trigger positions once fonts/images settle
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Showcase />
        <Seam />
        <Features />
        <SplitTunneling />
        <Seam tone="secondary" />
        <Locations />
        <Protocols />
        <AntiTracker />
        <Seam />
        <Control />
        <Ecosystem />
        <Seam tone="secondary" />
        <Downloads />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
