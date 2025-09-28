'use client'

import { useState, useEffect } from 'react'

interface HeaderProps {
  onPageChange: (pageId: string) => void
  currentPage: string
}

export default function Header({ onPageChange, currentPage }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-secondary text-primary shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => handlePageChange('home')}
          className="flex items-center gap-3 text-3xl font-bold"
        >
          <svg width="40" height="40" viewBox="0 0 100 100" className="h-9 w-9">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'var(--accent-gold)'}} />
                <stop offset="100%" style={{stopColor: 'var(--accent-orange)'}} />
              </linearGradient>
            </defs>
            <path d="M 50 10 A 40 40 0 0 1 90 50" stroke="url(#logoGradient)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M 50 10 L 50 40 L 80 40" stroke="url(#logoGradient)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 30 90 L 70 90" stroke="var(--accent-cyan)" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="15" fill="url(#logoGradient)"/>
          </svg>
          <span className="header-title-gradient">Radiwrit Solar</span>
        </button>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handlePageChange('home')} 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handlePageChange('about')} 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={() => handlePageChange('services')} 
            className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
          >
            Services
          </button>
          <button 
            onClick={() => handlePageChange('technology')} 
            className={`nav-link ${currentPage === 'technology' ? 'active' : ''}`}
          >
            Technology
          </button>
          <button 
            onClick={() => handlePageChange('calculator')} 
            className={`nav-link ${currentPage === 'calculator' ? 'active' : ''}`}
          >
            Calculator
          </button>
          <button 
            onClick={() => handlePageChange('contact')} 
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          >
            Contact
          </button>
          <button 
            onClick={toggleTheme}
            className="ml-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary text-2xl"
            style={{color: 'var(--accent-gold)'}}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleTheme}
            className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary text-2xl"
            style={{color: 'var(--accent-gold)'}}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
      
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-6 pt-2 pb-4 space-y-2`}>
        <button 
          onClick={() => handlePageChange('home')} 
          className={`block nav-link ${currentPage === 'home' ? 'active' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => handlePageChange('about')} 
          className={`block nav-link ${currentPage === 'about' ? 'active' : ''}`}
        >
          About Us
        </button>
        <button 
          onClick={() => handlePageChange('services')} 
          className={`block nav-link ${currentPage === 'services' ? 'active' : ''}`}
        >
          Services
        </button>
        <button 
          onClick={() => handlePageChange('technology')} 
          className={`block nav-link ${currentPage === 'technology' ? 'active' : ''}`}
        >
          Technology
        </button>
        <button 
          onClick={() => handlePageChange('calculator')} 
          className={`block nav-link ${currentPage === 'calculator' ? 'active' : ''}`}
        >
          Calculator
        </button>
        <button 
          onClick={() => handlePageChange('contact')} 
          className={`block nav-link ${currentPage === 'contact' ? 'active' : ''}`}
        >
          Contact
        </button>
      </div>
    </header>
  )
}
