import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cities } from '@/lib/cities'
import { loanTypes, industries } from '@/lib/locationData'
import { neighborhoodsByCitySlug } from '@/lib/neighborhoods'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { city: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) return {}
  return {
    title: `SBA Loans in ${city.name}, ${city.state} — Bridgit Funding`,
    description: `SBA loan options for business acquisitions, working capital, and real estate in ${city.name}. Current rates, lender notes, and industry-specific deal insights for ${city.name} buyers.`,
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) notFound()

  const generatedAt = new Date().toISOString()
  const neighborhoods = neighborhoodsByCitySlug[city.slug] ?? []
  const topIndustryData = city.topIndustries
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter(Boolean) as typeof industries

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bridgitfunding.com' },
          { '@type': 'ListItem', position: 2, name: 'SBA Loans by City', item: 'https://bridgitfunding.com/sba-loans' },
          { '@type': 'ListItem', position: 3, name: `SBA Loans in ${city.name}`, item: `https://bridgitfunding.com/sba-loans/${city.slug}` },
        ],
      },
      {
        '@type': 'FinancialProduct',
        name: `SBA Loans in ${city.name}, ${city.state}`,
        description: city.marketNote,
        provider: { '@type': 'Organization', name: 'Bridgit Funding', url: 'https://bridgitfunding.com' },
        areaServed: { '@type': 'City', name: city.name, containedIn: { '@type': 'State', name: city.state } },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="city-page">
        <section className="city-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link> › <Link href="/sba-loans">SBA Loans</Link> › <span>{city.name}</span>
            </div>
            <h1>SBA Loans in {city.name}, {city.state}</h1>
            <p className="hero-sub">
              {city.region} market · Avg. {city.avgDaysToClose} days to close · Updated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="section-card">
          <div className="container">
            <h2>{city.name} SBA Market Overview</h2>
            <p>{city.marketNote}</p>
            <div className="lender-note">
              <strong>Lender note:</strong> {city.lenderNote}
            </div>
          </div>
        </section>

        <section className="section-card bg-light">
          <div className="container">
            <h2>SBA Loan Programs Available in {city.name}</h2>
            <div className="loan-grid">
              {loanTypes.map((lt) => (
                <Link key={lt.slug} href={`/sba-loans/${city.slug}/${lt.slug}`} className="loan-card">
                  <div className="loan-card-name">{lt.name}</div>
                  <div className="loan-card-stats">
                    <span>Up to {lt.max}</span>
                    <span>{lt.rateRange}</span>
                    <span>{lt.term}</span>
                  </div>
                  <div className="loan-card-cta">Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="container">
            <h2>Most Active SBA Acquisition Categories in {city.name}</h2>
            <p>Based on current lender activity and buyer demand in the {city.name} market.</p>
            <table className="industry-table">
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>SDE Multiple</th>
                  <th>Lender Notes</th>
                </tr>
              </thead>
              <tbody>
                {topIndustryData.map((ind) => (
                  <tr key={ind.slug}>
                    <td>
                      <Link href={`/sba-loans/${city.slug}/business-acquisition/${ind.slug}`}>
                        {ind.name}
                      </Link>
                    </td>
                    <td>{ind.sdeMultiple}</td>
                    <td>{ind.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {neighborhoods.length > 0 && (
          <section className="section-card bg-light">
            <div className="container">
              <h2>{city.name} Neighborhoods</h2>
              <p>SBA acquisition activity varies significantly by neighborhood. Each area below has its own market dynamics, buyer profiles, and lender considerations.</p>
              <div className="neighborhood-grid">
                {neighborhoods.map((n) => (
                  <Link key={n.slug} href={`/sba-loans/${city.slug}/neighborhoods/${n.slug}`} className="neighborhood-card">
                    <div className="neighborhood-name">{n.name}</div>
                    <div className="neighborhood-zip">ZIP {n.zip}</div>
                    <div className="neighborhood-note">{n.note}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-card">
          <div className="container">
            <h2>All Industries — {city.name} SBA Loans</h2>
            <div className="industry-link-grid">
              {industries.map((ind) => (
                <Link key={ind.slug} href={`/sba-loans/${city.slug}/business-acquisition/${ind.slug}`} className="industry-link">
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-card bg-dark">
          <div className="container cta-section">
            <h2>Get a Term Sheet for Your {city.name} Acquisition</h2>
            <p>Bridgit Funding matches {city.name} borrowers with SBA lenders who know this market. Most deals receive competing term sheets within 5 business days.</p>
            <a href="/#apply" className="btn-primary">Start Your Application</a>
          </div>
        </section>
      </main>
    </>
  )
}
