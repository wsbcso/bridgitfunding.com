import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cities } from '@/lib/cities'
import { loanTypes, industries } from '@/lib/locationData'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { city: string; loanType: string; industry: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const lt = loanTypes.find((l) => l.slug === params.loanType)
  const ind = industries.find((i) => i.slug === params.industry)
  if (!city || !lt || !ind) return {}
  return {
    title: `${ind.name} ${lt.name} Loans in ${city.name}, ${city.state} — Bridgit Funding`,
    description: `SBA ${lt.name} financing for ${ind.name} businesses in ${city.name}. ${ind.sdeMultiple} SDE multiples. Current rates ${lt.rateRange}, up to ${lt.max}. ${city.name}-specific lender notes.`,
  }
}

export default function CityLoanIndustryPage({ params }: { params: { city: string; loanType: string; industry: string } }) {
  const city = cities.find((c) => c.slug === params.city)
  const lt = loanTypes.find((l) => l.slug === params.loanType)
  const ind = industries.find((i) => i.slug === params.industry)
  if (!city || !lt || !ind) notFound()

  const generatedAt = new Date().toISOString()

  // Related industries in this city (same loan type, different industries)
  const relatedIndustries = industries.filter((i) => i.slug !== ind.slug).slice(0, 8)

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
          { '@type': 'ListItem', position: 5, name: ind.name, item: `https://bridgitfunding.com/sba-loans/${city.slug}/${lt.slug}/${ind.slug}` },
        ],
      },
      {
        '@type': 'FinancialProduct',
        name: `${ind.name} ${lt.name} SBA Loans in ${city.name}, ${city.state}`,
        description: `SBA ${lt.name} financing for ${ind.name} acquisitions in ${city.name}. SDE multiple range: ${ind.sdeMultiple}. ${ind.note}`,
        provider: { '@type': 'Organization', name: 'Bridgit Funding', url: 'https://bridgitfunding.com' },
        loanTerm: lt.term,
        interestRate: lt.rateRange,
        amount: { '@type': 'MonetaryAmount', maxValue: lt.max, currency: 'USD' },
        areaServed: { '@type': 'City', name: city.name, containedIn: { '@type': 'State', name: city.state } },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What SDE multiple should I expect for a ${ind.name} in ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${ind.name} businesses in ${city.name} typically sell for ${ind.sdeMultiple} of SDE. ${ind.note}`,
            },
          },
          {
            '@type': 'Question',
            name: `Can I use an SBA ${lt.name} loan to buy a ${ind.name} in ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. SBA ${lt.name} loans up to ${lt.max} can be used for ${ind.name} acquisitions in ${city.name}. Current rates are ${lt.rateRange} over a ${lt.term} term, with a minimum ${lt.minDown} down payment.`,
            },
          },
          {
            '@type': 'Question',
            name: `How long does an SBA ${lt.name} close in ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The average SBA deal in ${city.name} closes in approximately ${city.avgDaysToClose} days. ${city.lenderNote}`,
            },
          },
          {
            '@type': 'Question',
            name: `What do SBA lenders look for in a ${ind.name} acquisition in ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${ind.note} In ${city.name} specifically: ${city.lenderNote}`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="combo-page">
        <section className="city-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link> ›{' '}
              <Link href="/sba-loans">SBA Loans</Link> ›{' '}
              <Link href={`/sba-loans/${city.slug}`}>{city.name}</Link> ›{' '}
              <Link href={`/sba-loans/${city.slug}/${lt.slug}`}>{lt.name}</Link> ›{' '}
              <span>{ind.name}</span>
            </div>
            <h1>{ind.name} {lt.name} Loans in {city.name}, {city.state}</h1>
            <p className="hero-sub">
              SDE multiple: {ind.sdeMultiple} · Up to {lt.max} · {lt.rateRange} · {lt.minDown} down · Avg. {city.avgDaysToClose} days to close
            </p>
            <p className="hero-timestamp">
              Updated {new Date(generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Deal overview */}
        <section className="section-card">
          <div className="container">
            <h2>{ind.name} Acquisitions in {city.name} — Loan Overview</h2>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">SDE Multiple Range</div>
                <div className="stat-value">{ind.sdeMultiple}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Max Loan Amount</div>
                <div className="stat-value">{lt.max}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Rate Range</div>
                <div className="stat-value">{lt.rateRange}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Loan Term</div>
                <div className="stat-value">{lt.term}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Min. Down Payment</div>
                <div className="stat-value">{lt.minDown}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Avg. Days to Close</div>
                <div className="stat-value">{city.avgDaysToClose}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry lender notes */}
        <section className="section-card bg-light">
          <div className="container">
            <h2>What SBA Lenders Look For in {ind.name} Deals</h2>
            <p>{ind.note}</p>
          </div>
        </section>

        {/* City market notes */}
        <section className="section-card">
          <div className="container">
            <h2>{city.name} Market Context</h2>
            <p>{city.marketNote}</p>
            <div className="lender-note">
              <strong>{city.name} lender note:</strong> {city.lenderNote}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-card bg-light">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>What SDE multiple should I expect for a {ind.name} in {city.name}?</h3>
                <p>{ind.name} businesses in {city.name} typically sell for {ind.sdeMultiple} of SDE. {ind.note}</p>
              </div>
              <div className="faq-item">
                <h3>Can I use an SBA {lt.name} loan to buy a {ind.name} in {city.name}?</h3>
                <p>Yes. SBA {lt.name} loans up to {lt.max} can be used for {ind.name} acquisitions in {city.name}. Current rates are {lt.rateRange} over a {lt.term} term, with a minimum {lt.minDown} down payment.</p>
              </div>
              <div className="faq-item">
                <h3>How long does an SBA {lt.name} close in {city.name}?</h3>
                <p>The average SBA deal in {city.name} closes in approximately {city.avgDaysToClose} days. {city.lenderNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related industries */}
        <section className="section-card">
          <div className="container">
            <h2>Other {lt.name} Categories in {city.name}</h2>
            <div className="industry-link-grid">
              {relatedIndustries.map((ri) => (
                <Link key={ri.slug} href={`/sba-loans/${city.slug}/${lt.slug}/${ri.slug}`} className="industry-link">
                  {ri.name}
                </Link>
              ))}
            </div>
            <p style={{ marginTop: '1rem' }}>
              <Link href={`/sba-loans/${city.slug}/${lt.slug}`}>View all {lt.name} industries in {city.name} →</Link>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-card bg-dark">
          <div className="container cta-section">
            <h2>Get a Term Sheet for Your {city.name} {ind.name} Acquisition</h2>
            <p>Bridgit Funding works with SBA lenders who actively fund {ind.name} acquisitions in {city.name}. Most deals receive competing term sheets within 5 business days.</p>
            <a href="/#apply" className="btn-primary">Start Your Application</a>
          </div>
        </section>
      </main>
    </>
  )
}
