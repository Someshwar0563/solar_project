export default function TechnologyPage() {
  return (
    <div id="technology">
      <section className="py-20 bg-primary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold">The Heart of Solar Technology</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto font-sans">
              We use only the most advanced, reliable, and efficient technology available.
            </p>
          </div>
          
          <div className="bg-secondary p-8 md:p-12 rounded-lg shadow-xl mb-12 fade-in-section">
            <h3 className="text-3xl font-bold mb-6">What is Solar Energy?</h3>
            <p className="font-sans leading-relaxed mb-4">
              Solar energy is the sun's radiant energy, harnessed to generate clean electricity. It's the most abundant renewable energy source on Earth, offering a path to reduce reliance on the grid and combat rising electricity costs for homes and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <h3 className="text-2xl font-bold mb-4">Tier-1 Solar Panels</h3>
              <p className="font-sans">
                We use high-efficiency (up to 22%) monocrystalline panels from Tier-1 manufacturers, ensuring a 25-year performance warranty and maximum generation even in low-light conditions.
              </p>
            </div>
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <h3 className="text-2xl font-bold mb-4">Smart Inverters</h3>
              <p className="font-sans">
                Our inverters are the brains of the system, converting DC to AC power with up to 98.5% efficiency. They come with built-in monitoring you can track from your phone.
              </p>
            </div>
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <h3 className="text-2xl font-bold mb-4">Lithium-Ion Batteries</h3>
              <p className="font-sans">
                For complete energy security, we offer Lithium-ion (LFP) batteries with a 10-15 year lifespan, providing safe, reliable power during outages and at night.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-16 fade-in-section">
            <h2 className="text-4xl font-extrabold">The Renewable Energy Family</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto font-sans">
              Solar is a leading member of the clean energy ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <div className="text-6xl mb-4">💨</div>
              <h3 className="text-2xl font-bold mb-2">Wind Power</h3>
              <p className="font-sans">Harnessing the power of wind through turbines to generate electricity.</p>
            </div>
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <div className="text-6xl mb-4">💧</div>
              <h3 className="text-2xl font-bold mb-2">Hydropower</h3>
              <p className="font-sans">Utilizing the flow of water in rivers and dams to create clean energy.</p>
            </div>
            <div className="interactive-card bg-secondary p-8 rounded-lg shadow-xl fade-in-section">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-2">Geothermal</h3>
              <p className="font-sans">Tapping into the Earth's natural heat to generate steam and power turbines.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
