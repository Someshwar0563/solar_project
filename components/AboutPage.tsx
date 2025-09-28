export default function AboutPage() {
  return (
    <div id="about">
      <section className="py-20 bg-primary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">About Radiwrit Solar</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop" 
                className="rounded-lg shadow-2xl" 
                alt="Our Team"
              />
            </div>
            <div>
              <p className="font-sans leading-relaxed mb-4">
                With over 7 years of industry expertise and a team of 20+ highly skilled professionals, Radiwrit Solar is dedicated to making solar energy accessible, affordable, and reliable across the USA & Canada.
              </p>
              <p className="font-sans leading-relaxed mb-4">
                Our team brings tremendous knowledge and hands-on experience in solar permitting and design, ensuring every project is delivered with accuracy, compliance, and efficiency.
              </p>
              <h3 className="text-2xl font-bold mb-4">We specialize in:</h3>
              <ul className="list-disc list-inside space-y-2 font-sans">
                <li>Permit Acquisition & Utility Compliance.</li>
                <li>Pre-Installation & As-Built Designs.</li>
                <li>PE Stamping.</li>
                <li>Residential, Commercial, Battery Storage & EV Charger Designs.</li>
              </ul>
              <p className="font-sans leading-relaxed mt-6">
                By combining technical excellence with a client-first approach, Radiwrit Solar guarantees high-quality designs, timely delivery, and cost-effective solutions that help solar businesses grow faster and stronger.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
