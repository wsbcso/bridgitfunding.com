import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cities } from '@/lib/cities'
import { loanTypes, industries } from '@/lib/locationData'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { city: string; loanType: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const lt = loanTypes.find((l) => l.slug === params.loanType)
  if (!city || !lt) return {}
  return {
    title: `${lt.name} Loans in ${city.name}, ${city.state} — Bridgit Funding`,
    description: `${lt.name} SBA loans in ${city.name}. Up to ${lt.max}, ${lt.rateRange}, ${lt.minDown} down. Current lender notes and industry deal insights for ${city.name} borrowers.`,
  }
}

export default function CityLoanTypePage({ params }: { params: { city: string; loanType: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const lt = loanTypes.find((l) => l.slug === params.loanType)
  if (!city || !lt) notFound()

  const generatedAt = new Date().toISOString()
  const topIndustryData = city.topIndustries
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter(Boolean) as typeof industries

  const isAcquisition = lt.slug === 'business-acquisition' || lt.slug === 'partnership-buyout'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bridgitfunding.com' },
          { '@type': 'ListItem', position: 2, name: 'SBA Loans by City', item: 'https://bridgitfunding.com/sba-loans' },
          { '@type': 'ListItem', position: 3, name: city.name, item: `https://bridgitfunding.com/sba-loans/${city.slug}` },
          { '@type': 'ListItem', position: 4, name: lt.name, item: `https://bridgitfunding.com/sba-loans/${city.slug}/${lt.slug}` },
        ],
      },
      {
        '@type': 'FinancialProduct',
        name: `${lt.name} SBA Loans in ${city.name}, ${city.state}`,
        description: `${lt.name} SBA financing for ${city.name} borrowers. Maximum loan ${lt.max}, rate range ${lt.rateRange}, term ${lt.term}.`,
        provider: { '@type': 'Organization', name: 'Bridgit Funding', url: 'https://bridgitfunding.com' },
        loanTerm: lt.term,
        interestRate: lt.rateRange,
        amount: { '@type': 'MonetaryAmount', maxValue: lt.max, currency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the maximum ${lt.name} SBA loan in ${city.name}?`,
            acceptedAnswer: { '@type': 'Answer', text: `${lt.name} SBA loans in ${city.name} go up to ${lt.max}. Most borrowers in the ${city.name} market close in approximately ${city.avgDaysToClose} days.` },
          },
          {
            '@type': 'Question',
            name: `What are current ${lt.name} SBA rates in ${city.name}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Current ${lt.name} SBA rates in ${city.name} range from ${lt.rateRange}. Rates are based on Prime + a lender spread and reset with Fed movements.` },
          },
          {
            '@type': 'Question',
            name: `How long does a ${lt.name} SBA loan take in ${city.name}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The average ${lt.name} SBA deal in ${city.name} closes in approximately ${city.avgDaysToClose} days from signed LOI. ${city.lenderNote}` },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="city-loan-page">
        <section className="city-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link> › <Link href="/sba-loans">SBA Loans</Link> › <Link href={`/sba-loans/${city.slug}`}>{city.name}</Link> › <span>{lt.name}</span>
            </div>
            <h1>{lt.name} SBA Loans in {city.name}, {city.state}</h1>
            <p className="hero-sub">
              Up to {lt.max} · {lt.rateRange} · {lt.minDown} down · {lt.term} · Avg. {city.avgDaysToClose} days to close
            </p>
            <p className="hero-timestamp">Updated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </section>

        {/* Loan details */}
        <section className="section-card">
          <div className="container">
            <h2>{lt.name} Program Details — {city.name}</h2>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Maximum Loan</div>
                <div className="stat-value">{lt.max}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Rate Range</div>
                <div className="stat-value">{lt.rateRange}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Minimum Down</div>
                <div className="stat-value">{lt.minDown}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Loan Term</div>
                <div className="stat-value">{lt.term}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Avg. Days to Close</div>
                <div className="stat-value">{city.avgDaysToClose}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Market</div>
                <div className="stat-value">{city.region}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Market context */}
        <section className="section-card bg-light">
          <div className="container">
            <h2>{city.name} {lt.short} Market Notes</h2>
            <p>{city.marketNote}</p>
            <div className="lender-note">
              <strong>Lender note:</strong> {city.lenderNote}
            </div>
          </div>
        </section>

        {/* Industry combos (acquisition types only) */}
        {isAcquisition && (
          <section className="section-card">
            <div className="container">
              <h2>Top {lt.name} Industries in {city.name}</h2>
              <p>These categories have the most active SBA buyer and lender interest in the {city.name} market right now.</p>
              <div className="industry-combo-grid">
                {topIndustryData.map((ind) => (
                  <Link key={ind.slug} href={`/sba-loans/${city.slug}/${lt.slug}/${ind.slug}`} className="industry-combo-card">
                    <div className="combo-name">{ind.name}</div>
                    <div className="combo-multiple">{ind.sdeMultiple}</div>
                    <div className="combo-note">{ind.note}</div>
                    <div className="combo-cta">View {city.name} details →</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All industries for this loan type */}
        <section className="section-card bg-light">
          <div className="container">
            <h2>All Industries — {lt.name} in {city.name}</h2>
            <div className="industry-link-grid">
              {industries.map((ind) => (
                <Link key={ind.slug} href={`/sba-loans/${city.slug}/${lt.slug}/${ind.slug}`} className="industry-link">
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other loan types */}
        <section className="section-card">
          <div className="container">
            <h2>Other SBA Loan Programs in {city.name}</h2>
            <div className="loan-grid">
              {loanTypes.filter((l) => l.slug !== lt.slug).map((other) => (
                <Link key={other.slug} href={`/sba-loans/${city.slug}/${other.slug}`} className="loan-card">
                  <div className="loan-card-name">{other.name}</div>
                  <div className="loan-card-stats">
                    <span>Up to {other.max}</span>
                    <span>{other.rateRange}</span>
                  </div>
                  <div className="loan-card-cta">View details →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-card bg-dark">
          <div className="container cta-section">
            <h2>Get a {lt.name} Term Sheet for {city.name}</h2>
            <p>Bridgit Funding connects {city.name} borrowers with SBA lenders active in this market. Most borrowers receive competing term sheets within 5 business days.</p>
            <a href="/#apply" className="btn-primary">Start Your Application</a>
          </div>
        </section>
      </main>
    </>
  )
}
