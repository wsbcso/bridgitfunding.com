'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: 'How is Bridgit free for borrowers?', a: 'SBA lenders pay a referral fee to brokers after your loan closes, disclosed on SBA Form 159. You never pay anything before, during, or after closing. Same model as a buyer\'s agent in real estate — the lender covers the cost.' },
    { q: 'How is this different from applying directly at a bank?', a: 'When you go direct to one bank, you get one offer. With Bridgit, multiple lenders see your deal and compete for your business — driving down your rate and improving your terms. We also handle the entire application, packaging, and negotiation process.' },
    { q: 'What SBA loan types do you work with?', a: 'We broker all major SBA products: 7(a) loans for business acquisitions and working capital (up to $5M), 504 loans for commercial real estate (up to $13M), and SBA Express loans for faster approvals under $500K.' },
    { q: 'How long does the SBA loan process take?', a: 'Most acquisition deals close in 45 to 75 days from a complete application. Working capital loans can move faster — sometimes 30 to 45 days. Our process consistently beats the national average by 2 to 3 weeks.' },
    { q: 'How much do I need for a down payment to buy a business?', a: 'SBA requires a minimum 10% equity injection for acquisitions. However, if the seller offers a standby seller note, you may only need 5% cash out of pocket. We help structure the deal to minimize your cash requirement.' },
    { q: 'Can you help if my bank already turned me down?', a: 'Yes. We\'ve funded dozens of deals initially declined by other banks. Different lenders have different criteria — what one bank won\'t do, another will. Our job is to find the right lender for your specific situation.' },
    { q: 'Do I need industry experience to buy a business?', a: 'Most SBA lenders want to see relevant management or industry experience, but \"relevant\" is interpreted broadly. Transferable skills from similar industries often qualify. We know which lenders are flexible on experience.' },
  ]

  const deals = [
    { industry: 'Home Services', days: 67, title: 'Home Automation & Security', size: '$4.47M', type: 'Acquisition + LOC', down: '5% + seller note', rate: '8.15% fixed' },
    { industry: 'Food & Beverage', days: 67, title: 'Bakery + Real Estate', size: '$3.6M', type: 'Acquisition + Real Estate', down: '10% + 10% seller note', rate: '6.99% fixed' },
    { industry: 'SaaS', days: 64, title: 'SaaS Business Acquisition', size: '$3.5M', type: 'Full Acquisition', down: '5% + 5% seller note', rate: '7.99% fixed' },
    { industry: 'Healthcare', days: 60, title: 'Medical Billing Company', size: '$1.5M', type: 'Full Acquisition', down: '10%', rate: 'Prime + 2.00%' },
    { industry: 'Manufacturing', days: 71, title: 'Seasonal Manufacturing + RE', size: '$3.45M', type: 'Acquisition + Real Estate', down: '10%', rate: 'Prime + 2.50%' },
    { industry: 'Professional Services', days: 55, title: 'CPA Firm Acquisition', size: '$640K', type: 'Practice Acquisition', down: '~10%', rate: 'Prime + 2.75%' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Bridgit Funding",
            "url": "https://www.bridgitfunding.com"
          })
        }}
      />

      {/* HERO */}
      <section className="hero" style={{ padding: '80px 0 60px', overflow: 'hidden', position: 'relative' }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">Chicago-Based. Nationwide.</div>
              <h1>When Lenders<br /><em>Compete,</em><br />You Win.</h1>
              <p className="hero-sub">Born in Chicago. Built for the whole country. Bridgit is a full-service SBA loan brokerage helping business buyers and owners get funded — 100% free for borrowers.</p>
              <ul className="highlights">
                <li><strong>50+ lenders</strong>&nbsp; competing for your deal</li>
                <li><strong>$320M+ funded</strong>&nbsp; across 126 closed deals</li>
                <li><strong>100% free</strong>&nbsp; full-service support for borrowers</li>
                <li><strong>Full-service</strong>&nbsp; loan packaging and lender outreach</li>
                <li><strong>Best rate guarantee</strong>&nbsp; we match or beat any offer</li>
                <li><strong>Free business plan</strong>&nbsp; and financial projections included</li>
              </ul>
              <div className="hero-btns">
                <Link href="#contact" className="btn btn-primary">Get Your Free Consultation →</Link>
                <a href="tel:+18005551234" className="btn btn-outline">Call Us Free</a>
              </div>
              <div className="lender-strip">
                <p className="lender-label">50+ lender partners including</p>
                <div className="lender-logos">
                  {['Wells Fargo','Bank of America','Live Oak Bank','Huntington','TD Bank','US Bank','+ 44 more'].map(n => <span key={n}>{n}</span>)}
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-tag">Recent Close</div>
              <h3>Business Acquisition — Chicago, IL</h3>
              <div className="card-badges">
                <span className="badge badge-industry">Healthcare Services</span>
                <span className="badge badge-days">Closed in 58 days</span>
              </div>
              <div className="deal-row"><span className="dl">Deal Size</span><span className="dv">$2.8M</span></div>
              <div className="deal-row"><span className="dl">Loan Type</span><span className="dv">SBA 7(a) Acquisition</span></div>
              <div className="deal-row"><span className="dl">Down Payment</span><span className="dv">10% + seller note</span></div>
              <div className="deal-row"><span className="dl">Rate</span><span className="dv rate">Prime + 2.25%</span></div>
              <div className="deal-row"><span className="dl">Lenders Competed</span><span className="dv">7</span></div>
              <Link href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>Start Your Deal →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-stat"><div className="trust-val"><span>#</span>1</div><div className="trust-label">SBA Broker Network</div></div>
            <div className="trust-stat"><div className="trust-val">$<span>320M+</span></div><div className="trust-label">Total Funded</div></div>
            <div className="trust-stat"><div className="trust-val"><span>7</span> Days</div><div className="trust-label">Avg. to Term Sheet</div></div>
            <div className="trust-stat"><div className="trust-val"><span>99</span>.1%</div><div className="trust-label">Approval Rate</div></div>
          </div>
        </div>
      </div>

      {/* CHICAGO STRIP */}
      <div className="chicago-strip">
        <div className="container">
          <div className="chicago-strip-inner">
            <span className="primary">🏘 Headquartered in Chicago, IL</span>
            <span className="divider">|</span>
            <span>🌎 Licensed to broker in all 50 states</span>
            <span className="divider">|</span>
            <span>📞 Midwest roots. National reach.</span>
          </div>
        </div>
      </div>

      {/* LOAN TYPES */}
      <section id="services" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">What We Finance</p>
            <h2 className="section-heading">Financing for Every Deal.</h2>
            <p className="section-sub">From Chicago's neighborhoods to every corner of the country — we match you with the right SBA product and the right lender for your deal.</p>
          </div>
          <div className="loan-list">
            {[
              { href: '/business-acquisition', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>, title: 'Business Acquisition Loans', desc: 'SBA 7(a) financing to buy an existing business. Up to $5M with as little as 5% down.' },
              { href: '/working-capital', icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>, title: 'Working Capital Loans', desc: 'SBA 7(a) loans to fund payroll, inventory, and operating expenses. Up to 10-year terms.' },
              { href: '/#contact', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>, title: 'Commercial Real Estate Loans', desc: 'SBA 504 loans to purchase or refinance owner-occupied commercial property. Up to $13M.' },
              { href: '/#contact', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>, title: 'Partnership Buyout Loans', desc: 'Buy out a business partner using SBA financing. Structured to protect both parties and close clean.' },
              { href: '/sba-express', icon: <><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></>, title: 'SBA Express Loans', desc: 'Faster approvals under $500K. Term sheets in as little as 48 hours.' },
            ].map(l => (
              <Link key={l.title} href={l.href} className="loan-row">
                <div className="loan-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{l.icon}</svg>
                </div>
                <div>
                  <div className="loan-title">{l.title}</div>
                  <div className="loan-desc">{l.desc}</div>
                </div>
                <svg className="loan-arrow" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT DEALS */}
      <section id="deals">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Closed Deals</p>
            <h2 className="section-heading">Recent Transactions.</h2>
            <p className="section-sub">A sample of deals we've funded. Every industry. Every deal size. All fully closed.</p>
          </div>
          <div className="deals-grid">
            {deals.map(d => (
              <div key={d.title} className="deal-card">
                <div className="deal-img-placeholder">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/></svg>
                  <div className="deal-badges">
                    <span className="badge badge-industry">{d.industry}</span>
                    <span className="badge badge-days">{d.days} days</span>
                  </div>
                </div>
                <div className="deal-body">
                  <h3>{d.title}</h3>
                  <div className="deal-row"><span className="dl">Deal Size</span><span className="dv">{d.size}</span></div>
                  <div className="deal-row"><span className="dl">Type</span><span className="dv">{d.type}</span></div>
                  <div className="deal-row"><span className="dl">Down</span><span className="dv">{d.down}</span></div>
                  <div className="deal-row"><span className="dl">Rate</span><span className="dv rate">{d.rate}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRIDGIT */}
      <section id="why" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Why Bridgit</p>
            <h2 className="section-heading">What Makes Us Different.</h2>
            <p className="section-sub">We started in Chicago and grew nationally because the process works. Going direct to one bank gives you one shot. We give you 50.</p>
          </div>
          <div className="adv-grid">
            {[
              { title: '50+ Competing Lenders', desc: 'More lenders means better rates, better terms, and faster approvals. We run a competitive process every time.' },
              { title: '100% Free for Borrowers', desc: 'No fees. No deposits. No exclusivity requirements. Lenders pay us after your loan closes — disclosed on SBA Form 159.' },
              { title: 'Highest Certainty of Close', desc: 'We only submit to lenders we know will close. 99.5% of accepted term sheets make it to funding.' },
              { title: 'Faster Than Going Direct', desc: 'Our streamlined process saves borrowers 2 to 3 weeks on average. Term sheets in as little as 7 days.' },
              { title: 'Best Rate Guarantee', desc: 'Found a lower rate from a qualified SBA lender? We\'ll match it or beat it. Competition always wins.' },
              { title: 'Free Business Plan Included', desc: 'We build your SBA business plan and financial projections to maximize fundability — at no cost.' },
              { title: 'All Deal Structures', desc: 'Pari-passu, investor-heavy, low personal liquidity, large seller notes — we know who will fund each structure.' },
              { title: 'Full-Service from LOI to Close', desc: 'Loan packaging, lender matching, underwriting support, and closing coordination — we handle everything.' },
            ].map(a => (
              <div key={a.title} className="adv-row">
                <div className="adv-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag" style={{ color: 'var(--green-light)' }}>The Process</p>
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>How It Works.</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.55)' }}>Simple, transparent, and designed to get you funded as fast as possible.</p>
          </div>
          <div className="steps-grid">
            {[
              { n: '01', t: 'Tell Us About Your Deal', d: 'Fill out a quick form. We\'ll review your deal, ask follow-up questions, and assess your options — no credit pull required.' },
              { n: '02', t: 'We Package Your Loan', d: 'Our team builds your full loan package, including a business plan and financial projections tailored to SBA underwriting.' },
              { n: '03', t: 'Lenders Compete', d: 'We submit your deal to the right lenders simultaneously. You receive competing term sheets and we help you pick the best.' },
              { n: '04', t: 'You Close', d: 'We coordinate underwriting, appraisals, and closing docs from start to finish. Most deals close in 45 to 75 days.' },
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

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '64px', alignItems: 'start' }} className="page-hero-grid">
            <div>
              <p className="section-tag">Free Consultation</p>
              <h2 className="section-heading">Let's Talk About Your Deal.</h2>
              <p className="section-sub" style={{ marginBottom: '36px' }}>We're based in Chicago but have closed deals in all 50 states. Tell us what you're working on — we'll tell you exactly what you qualify for, which lenders are the best fit, and how to structure it for the best terms. No obligation, no credit pull.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                {[
                  { t: 'Response Within 2 Hours', d: 'Every submission is reviewed personally by our team. Not a bot, not a form letter.' },
                  { t: 'Free Deal Advice and Structuring', d: 'This is a free assessment, not an application. Your credit score is not affected.' },
                  { t: "You'll Know Exactly Where You Stand", d: "We'll tell you what you qualify for, estimated rate, required down payment, and the best next steps." },
                ].map(b => (
                  <div key={b.t} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--green)' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 12 4 9"/><path d="M22 12a10 10 0 1 1-20 0"/></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>{b.t}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{b.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="testimonial-block">
                <p>"I wish I'd called Bridgit first instead of wasting three months at my bank. They had a term sheet in five days."</p>
                <cite>— James L., $4.2M Business Acquisition</cite>
              </div>
            </div>
            <div style={{ position: 'sticky', top: '88px' }}>
              <LeadForm source="bridgitfunding.com/home" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="section-tag">FAQ</p>
            <h2 className="section-heading">Common Questions.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className="faq-icon">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <p className="section-tag">Get Started</p>
          <h2>Ready to Get Your Deal Funded?</h2>
          <p>Free consultation. No credit check. No obligation. Just answers.</p>
          <div className="cta-btns">
            <Link href="#contact" className="btn btn-white">Get Free Assessment →</Link>
            <a href="tel:+18005551234" className="btn btn-ghost">Call Us Free</a>
          </div>
        </div>
      </section>
    </>
  )
}
