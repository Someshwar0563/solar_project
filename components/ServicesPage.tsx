export default function ServicesPage() {
  return (
    <div id="services">
      <section className="py-20 bg-secondary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">Our Services</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto font-sans">
              Comprehensive solutions tailored to your energy needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-accent-gold">🏠</div>
              <h3 className="text-xl font-bold mb-2">Residential Solar</h3>
              <p className="font-sans">Cut your electricity bills by up to 90% with a custom-designed rooftop solar system for your home.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-accent-gold">🏢</div>
              <h3 className="text-xl font-bold mb-2">Commercial Solar</h3>
              <p className="font-sans">Achieve a return on investment in as little as 4-5 years with solar solutions for your business.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-accent-gold">🔋</div>
              <h3 className="text-xl font-bold mb-2">Battery Storage</h3>
              <p className="font-sans">Get up to 10 hours of backup and complete energy security with our Lithium-ion battery solutions.</p>
            </div>
            <div className="interactive-card bg-primary p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4 text-accent-gold">🛠️</div>
              <h3 className="text-xl font-bold mb-2">Maintenance & O&M</h3>
              <p className="font-sans">Our O&M plans ensure your system operates at over 99% efficiency, guaranteed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
