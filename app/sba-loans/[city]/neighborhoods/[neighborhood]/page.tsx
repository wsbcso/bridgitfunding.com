import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cities } from '@/lib/cities'
import { loanTypes, industries } from '@/lib/locationData'
import { neighborhoodsByCitySlug } from '@/lib/neighborhoods'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { city: string; neighborhood: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const hoods = neighborhoodsByCitySlug[params.city] ?? []
  const hood = hoods.find((h) => h.slug === params.neighborhood)
  if (!city || !hood) return {}
  return {
    title: `SBA Loans in ${hood.name}, ${city.name} ${hood.zip} — Bridgit Funding`,
    description: `SBA loan options for business acquisitions in ${hood.name}, ${city.name} (ZIP ${hood.zip}). Current lender notes and acquisition activity for this neighborhood.`,
  }
}

export default function NeighborhoodPage({ params }: { params: { city: string; neighborhood: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const hoods = neighborhoodsByCitySlug[params.city] ?? []
  const hood = hoods.find((h) => h.slug === params.neighborhood)
  if (!city || !hood) notFound()

  const generatedAt = new Date().toISOString()
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
          { '@type': 'ListItem', position: 3, name: city.name, item: `https://bridgitfunding.com/sba-loans/${city.slug}` },
          { '@type': 'ListItem', position: 4, name: hood.name, item: `https://bridgitfunding.com/sba-loans/${city.slug}/${hood.slug}` },
        ],
      },
      {
        '@type': 'FinancialProduct',
        name: `SBA Loans in ${hood.name}, ${city.name}`,
        description: hood.note,
        provider: { '@type': 'Organization', name: 'Bridgit Funding', url: 'https://bridgitfunding.com' },
        areaServed: {
          '@type': 'Place',
          name: hood.name,
          postalCode: hood.zip,
          containedIn: { '@type': 'City', name: city.name },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What SBA loans are available in ${hood.name}, ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `All standard SBA 7(a) loan programs are available in ${hood.name} (${city.name}, ZIP ${hood.zip}), including business acquisition, working capital, equipment, CRE/504, SBA Express, and partnership buyout. ${hood.note}`,
            },
          },
          {
            '@type': 'Question',
            name: `How is the SBA acquisition market in ${hood.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${hood.note} The broader ${city.name} market context: ${city.marketNote}`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="neighborhood-page">
        <section className="city-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link> ›{' '}
              <Link href="/sba-loans">SBA Loans</Link> ›{' '}
              <Link href={`/sba-loans/${city.slug}`}>{city.name}</Link> ›{' '}
              <span>{hood.name}</span>
            </div>
            <h1>SBA Loans in {hood.name}, {city.name}</h1>
            <p className="hero-sub">
              ZIP {hood.zip} · {city.name}, {city.state} · Avg. {city.avgDaysToClose} days to close
            </p>
            <p className="hero-timestamp">
              Updated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Neighborhood context */}
        <section className="section-card">
          <div className="container">
            <h2>{hood.name} SBA Market Notes</h2>
            <p>{hood.note}</p>
            <div className="lender-note">
              <strong>{city.name} lender note:</strong> {city.lenderNote}
            </div>
          </div>
        </section>

        {/* Loan programs */}
        <section className="section-card bg-light">
          <div className="container">
            <h2>SBA Loan Programs for {hood.name} Acquisitions</h2>
            <div className="loan-grid">
              {loanTypes.map((lt) => (
                <Link key={lt.slug} href={`/sba-loans/${city.slug}/${lt.slug}`} className="loan-card">
                  <div className="loan-card-name">{lt.name}</div>
                  <div className="loan-card-stats">
                    <span>Up to {lt.max}</span>
                    <span>{lt.rateRange}</span>
                    <span>{lt.term}</span>
                  </div>
                  <div className="loan-card-cta">View {city.name} details →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top industries */}
        <section className="section-card">
          <div className="container">
            <h2>Top Acquisition Categories Near {hood.name}</h2>
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

        {/* Other neighborhoods */}
        {hoods.length > 1 && (
          <section className="section-card bg-light">
            <div className="container">
              <h2>Other {city.name} Neighborhoods</h2>
              <div className="industry-link-grid">
                {hoods.filter((h) => h.slug !== hood.slug).map((h) => (
                  <Link key={h.slug} href={`/sba-loans/${city.slug}/${h.slug}`} className="industry-link">
                    {h.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section-card bg-dark">
          <div className="container cta-section">
            <h2>Get an SBA Term Sheet for {hood.name}</h2>
            <p>Bridgit Funding matches borrowers in {hood.name} and across {city.name} with SBA lenders who know this market. Most deals receive competing term sheets within 5 business days.</p>
            <a href="/#apply" className="btn-primary">Start Your Application</a>
          </div>
        </section>
      </main>
    </>
  )
}
