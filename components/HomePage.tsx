'use client'
   
import { useEffect, useRef } from 'react'

interface HomePageProps {
  onPageChange?: (pageId: string) => void
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const heroSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroBg = heroSectionRef.current.querySelector('.hero-bg') as HTMLElement
        if (heroBg) {
          const offset = window.pageYOffset
          heroBg.style.transform = `translateY(${offset * 0.3}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Note: Page navigation is now handled by the parent component

  return (
    <div id="home">
      <section ref={heroSectionRef} id="home-hero" className="hero-section text-white h-[60vh] md:h-[80vh] flex items-center">
        <div className="hero-bg"></div>
        <div className="hero-content container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight text-white">
            Harness the Sun. Empower Your Future.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-200 font-sans">
            Pioneering intelligent, sustainable energy solutions for a radiant, cleaner world.
          </p>
          <button 
            onClick={() => onPageChange?.('contract')}
            className="btn-elegant font-bold py-3 px-8 rounded-full text-lg"
          >
            Get your first design free
          </button>
        </div>
      </section>
      
      <section className="py-20 bg-secondary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">Why Choose Radiwrit Solar?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Highly Qualified Professionals</h3>
              <p className="font-sans">Experienced engineers with deep expertise in USA solar permitting.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Two-Tier Quality Check</h3>
              <p className="font-sans">Every project undergoes double quality verification for accuracy and compliance.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">99% AHJ Pass Rate</h3>
              <p className="font-sans">Proven track record of successful permit approvals across multiple jurisdictions.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Affordable & Efficient</h3>
              <p className="font-sans">Delivering the best service at competitive pricing, without compromising quality.</p>
            </div>
          </div>
          <p className="text-center mt-12 max-w-4xl mx-auto font-sans text-lg">
            By combining technical excellence with a client-first approach, Radiwrit Solar ensures high-quality designs, timely delivery, and reliable solutions that help solar businesses grow faster and stronger.
          </p>
        </div>
      </section>
    </div>
  )
}
