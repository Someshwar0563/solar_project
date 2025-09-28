'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'
import AboutPage from '@/components/AboutPage'
import ServicesPage from '@/components/ServicesPage'
import TechnologyPage from '@/components/TechnologyPage'
import CalculatorPage from '@/components/CalculatorPage'
import ContactPage from '@/components/ContactPage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.fade-in-section')
    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [currentPage])

  const showPage = (pageId: string) => {
    setCurrentPage(pageId)
    // Scroll to top when changing pages
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-[100]">
        <div className="w-24 h-24 rounded-full bg-yellow-400 shadow-[0_0_20px_yellow,0_0_60px_yellow,0_0_100px_yellow] animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="bg-primary text-primary">
      <Header onPageChange={showPage} currentPage={currentPage} />
      
      <main>
        {currentPage === 'home' && <HomePage onPageChange={showPage} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'technology' && <TechnologyPage />}
        {currentPage === 'calculator' && <CalculatorPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      
      <Footer />
    </div>
  )
}
