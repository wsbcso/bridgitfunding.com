import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import LoanSizingCalc from '@/components/LoanSizingCalc'
import { sbaPulse, wcLenderNotes } from '@/lib/sbaData'

export const metadata = {
  title: 'SBA Working Capital Loans | $500K to $5M | Bridgit',
  description: 'SBA 7(a) working capital loans $500K to $5M. Expansion, hiring, equipment, debt refinance. 100% free for borrowers.',
}

const useCases = [
  { title: 'Business Expansion', desc: 'Opening a new location, entering a new market, or scaling operations — working capital covers the capital outlay before revenue catches up.' },
  { title: 'Hiring and Payroll', desc: 'Growing your team is one of the best investments you can make. SBA working capital lets you hire ahead of demand without straining cash flow.' },
  { title: 'Equipment Purchase', desc: 'Finance machinery, vehicles, or technology upgrades with long 10-year terms — keeping monthly payments low while you put the equipment to work.' },
  { title: 'Debt Refinance', desc: 'Consolidate high-interest debt into a single SBA loan at a lower rate. Many businesses save six figures a year in interest after refinancing.' },
  { title: 'Inventory and Stock', desc: 'For seasonal businesses or those with large purchase orders, working capital covers inventory before the cash comes in.' },
  { title: 'Bridge Financing', desc: 'Waiting on a contract, receivable, or property sale? Working capital bridges the gap while you wait for cash to arrive.' },
]

export default function WorkingCapitalPage() {
  const generatedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short',
  })

  const schemaLD = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bridgitfunding.com/' },
        { '@type': 'ListItem', position: 2, name: 'Working Capital Loans', item: 'https://www.bridgitfunding.com/working-capital' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: 'SBA 7(a) Working Capital Loan',
      description: 'SBA 7(a) working capital loans $500K to $5M for business expansion, hiring, equipment, and debt refinance. 100% free for borrowers.',
      provider: { '@type': 'FinancialService', name: 'Bridgit Funding', url: 'https://www.bridgitfunding.com' },
      feesAndCommissionsSpecification: '100% free for borrowers. Lenders pay broker fees after closing per SBA Form 159.',
      loanType: 'SBA 7(a) Working Capital',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much working capital can my business qualify for?', acceptedAnswer: { '@type': 'Answer', text: 'Your maximum SBA working capital loan is determined by two tests: your DSCR (annual profit divided by annual debt service must be at least 1.25x) and a revenue-based check. The lower of the two is the binding constraint. Use our calculator above for an estimate, or submit free for a real assessment.' } },
        { '@type': 'Question', name: 'What is the minimum DSCR for an SBA working capital loan?', acceptedAnswer: { '@type': 'Answer', text: 'Most SBA lenders require a minimum Debt Service Coverage Ratio (DSCR) of 1.25x. This means your business must generate at least $1.25 in cash flow for every $1.00 in annual debt payments — including the new SBA loan.' } },
        { '@type': 'Question', name: 'Can I refinance existing business debt into an SBA loan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. SBA 7(a) working capital loans can be used to refinance existing high-interest business debt, provided the original debt was used for a business purpose. This is one of the most effective uses of the program — many businesses cut their annual interest expense significantly.' } },
      ],
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaLD }} />

      {/* HERO */}
      <section className="page-hero" id="apply">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <div className="page-hero-badge">SBA 7(a) Traditional Working Capital</div>
              <h1>Fuel the Next<br /><em>Phase of Growth.</em></h1>
              <p className="page-hero-sub">SBA working capital loans for established businesses ready to expand, hire, buy equipment, or refinance existing debt. Up to $5M with long 10-year terms.</p>
              <ul className="highlights">
                <li><strong>$500K to $5M</strong>&nbsp; loan amounts</li>
                <li><strong>SBA-capped rates</strong>&nbsp; between 8% and 11.75%</li>
                <li><strong>10-year terms</strong>&nbsp; for low monthly payments</li>
                <li><strong>Best for growth and debt refinance</strong></li>
                <li><strong>Best rate guarantee</strong>&nbsp; we match or beat any offer</li>
                <li><strong>100% free</strong>&nbsp; for borrowers</li>
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="#apply" className="btn btn-primary">Apply Free →</Link>
                <Link href="/sba-express" className="btn btn-outline">Need under $500K?</Link>
              </div>
              <div className="highlight-cards">
                <div className="h-card"><div className="h-card-val">$5M</div><div className="h-card-label">Max Loan</div></div>
                <div className="h-card"><div className="h-card-val">8%</div><div className="h-card-label">Rates From</div></div>
                <div className="h-card"><div className="h-card-val">10 Yrs</div><div className="h-card-label">Max Term</div></div>
                <div className="h-card"><div className="h-card-val">1.25x</div><div className="h-card-label">Min DSCR</div></div>
              </div>
            </div>
            <LeadForm defaultLoanType="Working Capital" dealSizes={['$500K to $1M','$1M to $2.5M','$2.5M to $5M','Over $5M']} source="bridgitfunding.com/working-capital" notesPlaceholder="Expansion, hiring, equipment, debt refinance..." />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-stat"><div className="trust-val">$<span>320M+</span></div><div className="trust-label">Total Funded</div></div>
            <div className="trust-stat"><div className="trust-val"><span>126</span></div><div className="trust-label">Deals Closed</div></div>
            <div className="trust-stat"><div className="trust-val"><span>7</span> Days</div><div className="trust-label">Avg. to Term Sheet</div></div>
            <div className="trust-stat"><div className="trust-val"><span>50+</span></div><div className="trust-label">Lender Partners</div></div>
          </div>
        </div>
      </div>

      {/* SBA RATE PULSE */}
      <section style={{ background: 'var(--white)', padding: '64px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">SBA Rate Pulse</p>
            <h2 className="section-heading">Current Working Capital Loan Environment.</h2>
            <p className="section-sub" style={{ marginBottom: '8px' }}>What the working capital lending market looks like right now.</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Page data as of: <strong>{generatedAt}</strong></p>
          </div>

          <div className="card-grid-3" style={{ marginBottom: '40px' }}>
            {[
              { label: 'Prime Rate', val: sbaPulse.primeRate + '%', note: 'Working capital rates float with Prime. SBA caps the spread lenders can charge.' },
              { label: 'SBA 7(a) Rate Range', val: sbaPulse.sba7aRateRange, note: 'Loans over $50K and terms over 7 years: Prime + up to 2.75%.' },
              { label: 'Min DSCR Required', val: '1.25x', note: 'Your annual profit must cover 1.25x your total annual debt service including the new loan.' },
              { label: 'Max Loan Amount', val: '$5M', note: 'SBA 7(a) program cap. Most working capital deals fall in the $500K–$2.5M range.' },
              { label: 'Avg. Days to Term Sheet', val: sbaPulse.avgDaysToTermSheet + ' days', note: 'Bridgit\'s average by running a competitive lender process.' },
              { label: 'Avg. Days to Close', val: sbaPulse.avgDaysToClose + ' days', note: 'Working capital deals often close faster than acquisitions — no business appraisal required.' },
            ].map(c => (
              <div key={c.label} className="feature-card" style={{ background: 'var(--gray-pale)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>{c.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.1, marginBottom: '8px' }}>{c.val}</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{c.note}</p>
              </div>
            ))}
          </div>

          {/* LENDER NOTES BY USE CASE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {wcLenderNotes.map(n => (
              <div key={n.useCase} style={{ background: 'var(--dark)', borderRadius: '8px', padding: '20px 24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '6px' }}>{n.useCase}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{n.lenderNote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOAN SIZING CALCULATOR */}
      <LoanSizingCalc mode="working-capital" />

      {/* USE CASES */}
      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">What It's Used For</p>
            <h2 className="section-heading">Built for Business Growth.</h2>
            <p className="section-sub">Working capital loans are the most flexible SBA product. Here's what established businesses typically use them for.</p>
          </div>
          <div className="card-grid-3">
            {useCases.map(u => (
              <div key={u.title} className="feature-card">
                <div className="feature-icon"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag" style={{ color: 'var(--green-light)' }}>The Process</p>
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Four Steps to Funded.</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)' }}>We handle the packaging, lender outreach, and negotiation. You just show up at closing.</p>
          </div>
          <div className="steps-grid">
            {[
              { n:'01', t:'Tell Us What You Need', d:'Fill out a quick form. We review your situation and assess your options — no credit pull required.' },
              { n:'02', t:'We Go to Multiple Lenders', d:'We package your file and submit to our network simultaneously, collecting competing term sheets.' },
              { n:'03', t:'You Pick the Best Offer', d:'We walk you through every term sheet. You choose the rate and terms that work best for your business.' },
              { n:'04', t:'Close and Get Funded', d:'We coordinate underwriting and closing from start to finish. Most working capital loans fund in 30 to 60 days.' },
            ].map(s => (
              <div key={s.n} className="step" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="step-num">Step {s.n}</div>
                <h3 style={{ color: 'var(--white)' }}>{s.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS */}
      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Qualifications</p>
            <h2 className="section-heading">Do You Qualify?</h2>
            <p className="section-sub">Traditional 7(a) working capital loans are designed for established, profitable businesses. Here's what lenders look for.</p>
          </div>
          <div className="req-grid">
            <div className="req-card">
              <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Eligibility Requirements</h3>
              <ul className="req-list">
                {['At least 1 year in business','Minimum $200K annual profit','Debt Service Coverage Ratio of 1.25x or higher','Credit score of 680 or higher','No bankruptcies in the last 4 years','All business and personal debts current'].map(r => <li key={r}><span>{r}</span></li>)}
              </ul>
              <div className="req-note green">Not sure if you qualify? Submit free — we'll tell you within 2 hours.</div>
            </div>
            <div className="req-card">
              <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><polyline points="14 2 14 8 20 8"/></svg>Documents You'll Need</h3>
              <ul className="req-list">
                {['3 years of business tax returns','3 years of personal tax returns','Year-to-date income statement and balance sheet','Current business debt schedule','3 months of business bank statements','Articles of organization or incorporation'].map(r => <li key={r}><span>{r}</span></li>)}
              </ul>
              <div className="req-note neutral">Don't have everything together? We help you gather and organize what's needed.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <p className="section-tag">Get Started</p>
          <h2>Ready to Grow?</h2>
          <p>Free assessment. No credit check. Response within 2 hours.</p>
          <div className="cta-btns">
            <Link href="#apply" className="btn btn-white">Apply Free →</Link>
            <Link href="/sba-express" className="btn btn-ghost">Need under $500K?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
