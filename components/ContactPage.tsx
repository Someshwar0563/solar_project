'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email),
      message: !formData.message.trim()
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div id="contact">
      <section className="py-20 bg-primary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">Get In Touch</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto font-sans">
              Have questions? Our solar experts are ready to help you on your journey to clean energy.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-secondary p-8 rounded-lg shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-sans mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={`form-input w-full p-3 border rounded bg-primary ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">Please enter your name.</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block font-sans mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`form-input w-full p-3 border rounded bg-primary ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">Please enter a valid email.</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block font-sans mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className={`form-input w-full p-3 border rounded bg-primary ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">Please enter your message.</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-elegant font-bold py-3 rounded-lg text-lg"
                >
                  Send Message
                </button>
                
                {showSuccess && (
                  <p className="text-accent-green mt-4 text-center font-semibold">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
              </form>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6 font-sans">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1 text-accent-gold">📍</span>
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p>123 Solar Way, Toronto, ON M5A 1A1, Canada</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1 text-accent-gold">📞</span>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+1 (416) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1 text-accent-gold">✉️</span>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>contact@radiwritsolar.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1 text-accent-gold">🕒</span>
                  <div>
                    <h4 className="font-bold">Business Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                    <p>Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 w-full h-48 bg-gray-300 rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/800x400/e2e8f0/334155?text=Office+Location+Map"
                  alt="Map of Radiwrit Solar office"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
