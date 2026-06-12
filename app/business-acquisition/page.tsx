import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import LoanSizingCalc from '@/components/LoanSizingCalc'
import { sbaPulse, acquisitionIndustryInsights } from '@/lib/sbaData'

export const metadata = {
  title: 'SBA Business Acquisition Loans | Buy a Business | Bridgit',
  description: 'SBA 7(a) loans to buy a business. Up to $5M, as little as 5% down with seller notes. Free business plan included. 100% free for borrowers.',
}

const included = [
  { title: 'Free Business Plan', desc: 'We write your full SBA business plan and financial projections — built specifically for SBA underwriting to maximize your approval odds.' },
  { title: 'Lender Competition', desc: 'We submit your deal to multiple lenders simultaneously. You receive competing term sheets and we help you pick the best structure.' },
  { title: 'Complex Deal Structures', desc: 'Pari-passu, large seller notes, low personal liquidity, investor equity — we\'ve done it all and know which lenders will fund each structure.' },
  { title: 'Loan Packaging', desc: 'We prepare your complete loan package — all documents organized, formatted, and presented the way SBA lenders expect to see them.' },
  { title: 'Underwriting Support', desc: 'We stay in the deal through underwriting — answering lender questions, providing additional docs, and keeping the deal on track.' },
  { title: 'Best Rate Guarantee', desc: 'If you find a lower rate from a qualified SBA lender, we\'ll match it or beat it. Competition drives everything we do.' },
]

export default function BusinessAcquisitionPage() {
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
        { '@type': 'ListItem', position: 2, name: 'Business Acquisition Loans', item: 'https://www.bridgitfunding.com/business-acquisition' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: 'SBA 7(a) Business Acquisition Loan',
      description: 'SBA 7(a) financing to buy an existing business. Up to $5M with as little as 5% down. Full-service brokerage, 100% free for borrowers.',
      provider: { '@type': 'FinancialService', name: 'Bridgit Funding', url: 'https://www.bridgitfunding.com' },
      feesAndCommissionsSpecification: '100% free for borrowers. Lenders pay broker fees after closing per SBA Form 159.',
      loanType: 'SBA 7(a) Business Acquisition',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much can I borrow to buy a business with an SBA loan?', acceptedAnswer: { '@type': 'Answer', text: 'SBA 7(a) loans go up to $5M for business acquisitions. The loan amount is limited by the purchase price minus your down payment and any seller note, and must be supportable at a 1.25x Debt Service Coverage Ratio using the business\'s SDE.' } },
        { '@type': 'Question', name: 'How little can I put down to buy a business with SBA?', acceptedAnswer: { '@type': 'Answer', text: 'SBA requires a minimum 10% equity injection. If the seller carries a standby note of at least 5%, your cash requirement can drop to 5% out of pocket. We structure deals to minimize your cash requirement while keeping the deal lender-eligible.' } },
        { '@type': 'Question', name: 'How long does an SBA acquisition loan take to close?', acceptedAnswer: { '@type': 'Answer', text: 'Most acquisition deals close in 45 to 75 days from a complete application. Bridgit\'s process consistently beats the national average by 2 to 3 weeks by submitting to multiple lenders simultaneously and staying in the deal through underwriting.' } },
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
              <div className="page-hero-badge">SBA 7(a) Business Acquisition</div>
              <h1>Own the Business<br /><em>You Want.</em></h1>
              <p className="page-hero-sub">SBA acquisition loans let you buy an existing business with as little as 10% down — or even 5% when the seller carries a note. Up to $5M, rates starting at 8%. We handle everything from LOI to close.</p>
              <ul className="highlights">
                <li><strong>SBA loans up to $5M</strong>&nbsp; for business acquisitions</li>
                <li><strong>As low as 5% down</strong>&nbsp; with a seller note</li>
                <li><strong>Rates starting at 8%</strong>&nbsp; (Prime + 0.5%)</li>
                <li><strong>Free business plan</strong>&nbsp; and financial projections included</li>
                <li><strong>Pari-passu and complex structures</strong>&nbsp; welcome</li>
                <li><strong>100% free</strong>&nbsp; full-service brokerage</li>
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="#apply" className="btn btn-primary">Start Your Acquisition →</Link>
                <Link href="/#deals" className="btn btn-outline">See Closed Deals</Link>
              </div>
              <div className="highlight-cards">
                <div className="h-card"><div className="h-card-val">$5M</div><div className="h-card-label">Max Loan</div></div>
                <div className="h-card"><div className="h-card-val">5%</div><div className="h-card-label">Min Down w/ Note</div></div>
                <div className="h-card"><div className="h-card-val">8%</div><div className="h-card-label">Rates From</div></div>
                <div className="h-card"><div className="h-card-val">Free</div><div className="h-card-label">Biz Plan Included</div></div>
              </div>
            </div>
            <LeadForm defaultLoanType="Business Acquisition" source="bridgitfunding.com/business-acquisition" notesPlaceholder="Industry, asking price, do you have an LOI yet?" />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-stat"><div className="trust-val">$<span>320M+</span></div><div className="trust-label">Total Funded</div></div>
            <div className="trust-stat"><div className="trust-val"><span>126</span></div><div className="trust-label">Acquisitions Closed</div></div>
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
            <h2 className="section-heading">Current Acquisition Loan Environment.</h2>
            <p className="section-sub" style={{ marginBottom: '8px' }}>
              Real-time rate context for SBA business acquisition financing.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Page data as of: <strong>{generatedAt}</strong></p>
          </div>

          <div className="card-grid-3" style={{ marginBottom: '40px' }}>
            {[
              { label: 'Prime Rate', val: sbaPulse.primeRate + '%', note: 'SBA rates float with Prime. All 7(a) rates are Prime-indexed.' },
              { label: 'SBA 7(a) Acquisition Rate Range', val: sbaPulse.sba7aRateRange, note: 'SBA-capped. Actual rate depends on loan size, term, and lender competition.' },
              { label: 'Avg. Days to Term Sheet', val: sbaPulse.avgDaysToTermSheet + ' days', note: 'Bridgit\'s average. National average is 3–4 weeks at a single bank.' },
              { label: 'Avg. Days to Close', val: sbaPulse.avgDaysToClose + ' days', note: 'From complete application to funding. Complex deals may run 75–90 days.' },
              { label: 'Approval Rate', val: sbaPulse.approvalRate, note: 'Of accepted term sheets that reach closing. We only submit deals we know will close.' },
              { label: 'Lender Network', val: sbaPulse.lenderCount + ' lenders', note: 'Active SBA-preferred lenders. More competition means better terms for you.' },
            ].map(c => (
              <div key={c.label} className="feature-card" style={{ background: 'var(--gray-pale)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>{c.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.1, marginBottom: '8px' }}>{c.val}</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{c.note}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--dark)', borderRadius: '10px', padding: '24px 28px' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Rate environment note:</strong> {sbaPulse.note}
            </p>
          </div>
        </div>
      </section>

      {/* LOAN SIZING CALCULATOR */}
      <LoanSizingCalc mode="acquisition" />

      {/* INDUSTRY INSIGHTS */}
      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">By Industry</p>
            <h2 className="section-heading">Acquisition Lending by Business Type.</h2>
            <p className="section-sub">SBA lenders view industries differently. Here's what buyers and lenders are seeing across the most active acquisition categories right now.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {acquisitionIndustryInsights.map((ins, i) => (
              <div key={ins.industry} style={{ display: 'grid', gridTemplateColumns: '220px 140px 140px 1fr', gap: '24px', alignItems: 'start', padding: '22px 0', borderBottom: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--dark)' }}>{ins.industry}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '3px' }}>SDE Multiple</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--green)' }}>{ins.sdeMultiple}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '3px' }}>Avg Deal Size</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dark)' }}>{ins.avgDealSize}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '3px' }}>Lender Note</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>{ins.keyNote}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SERVICE */}
      <section>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Full-Service</p>
            <h2 className="section-heading">Everything Included. Nothing Extra.</h2>
            <p className="section-sub">Our acquisition brokerage service is truly full-service — from the moment you have an LOI to the day you get the keys.</p>
          </div>
          <div className="card-grid-3">
            {included.map(i => (
              <div key={i.title} className="feature-card">
                <div className="feature-icon"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <h3>{i.title}</h3>
                <p>{i.desc}</p>
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>From LOI to Keys.</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)' }}>A typical acquisition closes in 45 to 75 days. Here's how we get there.</p>
          </div>
          <div className="steps-grid">
            {[
              { n:'01', t:'Tell Us About the Deal', d:'Share your deal details — industry, asking price, deal structure. We assess fit and funding options within 2 hours. No credit pull.' },
              { n:'02', t:'We Package the Loan', d:'We build your full loan package including the SBA business plan, financial projections, and all required documents.' },
              { n:'03', t:'Lenders Compete', d:'We submit to multiple acquisition-focused lenders simultaneously. You get competing term sheets and we help you choose.' },
              { n:'04', t:'Close and Take Ownership', d:'We coordinate underwriting, appraisals, and closing docs from start to finish. Most deals close in 45 to 75 days.' },
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
            <h2 className="section-heading">What Lenders Look For.</h2>
            <p className="section-sub">Acquisition loans have specific requirements on both the buyer and the target business. Here's what most lenders need to see.</p>
          </div>
          <div className="req-grid">
            <div className="req-card">
              <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Buyer Requirements</h3>
              <ul className="req-list">
                {['Credit score of 680 or higher','No bankruptcies','All personal debts current','Relevant industry or management experience (preferred)','Minimum 10% equity injection (5% with seller note)','U.S. citizen or permanent resident'].map(r => <li key={r}><span>{r}</span></li>)}
              </ul>
              <div className="req-note green">Turned down before? Different lenders have different criteria — we know who will fund your deal.</div>
            </div>
            <div className="req-card">
              <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><polyline points="14 2 14 8 20 8"/></svg>Documents You'll Need</h3>
              <ul className="req-list">
                {['Signed LOI or purchase agreement','3 years of business tax returns (target business)','3 years of personal tax returns (buyer)','Interim P&L and balance sheet','3 months of business bank statements','AP and AR reports','Articles of organization or incorporation'].map(r => <li key={r}><span>{r}</span></li>)}
              </ul>
              <div className="req-note neutral">Don't have everything ready yet? We'll help you gather and organize everything that's needed.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <p className="section-tag">Get Started</p>
          <h2>Found a Business You Want to Buy?</h2>
          <p>Tell us about the deal. Free assessment, no credit check, response within 2 hours.</p>
          <div className="cta-btns">
            <Link href="#apply" className="btn btn-white">Start Your Acquisition →</Link>
            <Link href="/" className="btn btn-ghost">See All Loan Types</Link>
          </div>
        </div>
      </section>
    </>
  )
}
