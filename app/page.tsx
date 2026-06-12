import Link from 'next/link'
import { cities } from '@/lib/cities'

export const metadata = {
  title: 'SBA Loans by City — Bridgit Funding',
  description: 'SBA loan options for business acquisitions, working capital, and commercial real estate in 120+ US cities. Current rates, lender notes, and market insights by city.',
}

const regions = ['Northeast', 'Southeast', 'South', 'Midwest', 'West', 'Southwest']

export default function SbaLoansIndexPage() {
  const generatedAt = new Date().toISOString()
  const citiesByRegion = regions.reduce((acc, region) => {
    acc[region] = cities.filter((c) => c.region === region).sort((a, b) => a.name.localeCompare(b.name))
    return acc
  }, {} as Record<string, typeof cities>)

  return (
    <main className="sba-index-page">
      <section className="city-hero">
        <div className="container">
          <h1>SBA Loans by City</h1>
          <p className="hero-sub">
            {cities.length} markets covered · Updated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p>
            Bridgit Funding sources competing SBA term sheets for business acquisitions, working capital, equipment, 
            commercial real estate, and partner buyouts in markets across the country. Each city page includes 
            current lender notes, SDE multiples by industry, and market-specific deal context.
          </p>
        </div>
      </section>

      {regions.map((region) => (
        <section key={region} className="section-card">
          <div className="container">
            <h2>{region}</h2>
            <div className="city-link-grid">
              {(citiesByRegion[region] ?? []).map((city) => (
                <Link key={city.slug} href={`/sba-loans/${city.slug}`} className="city-link">
                  <span className="city-link-name">{city.name}</span>
                  <span className="city-link-state">{city.state}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-card bg-dark">
        <div className="container cta-section">
          <h2>Don't See Your City?</h2>
          <p>Bridgit Funding works with SBA lenders nationwide. We can source competing term sheets in markets not listed here — reach out and we'll match you with lenders active in your area.</p>
          <a href="/#apply" className="btn-primary">Get Started</a>
        </div>
      </section>
    </main>
  )
}
