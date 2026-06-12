import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import LoanSizingCalc from '@/components/LoanSizingCalc'
import { sbaPulse, expressLenderNotes } from '@/lib/sbaData'

export const metadata = {
 title: 'SBA Express Loans | Fast Funding Up to $500K | Bridgit',
 description: 'SBA Express loans $100K to $500K. Low rates, 10-year terms, 0% down. Streamlined process. 100% free for borrowers.',
}

export default function SBAExpressPage() {
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
       { '@type': 'ListItem', position: 2, name: 'SBA Express Loans', item: 'https://www.bridgitfunding.com/sba-express' },
     ],
   },
   {
     '@context': 'https://schema.org',
     '@type': 'FinancialProduct',
     name: 'SBA Express Loan',
     description: 'SBA Express loans $100K to $500K. Faster approvals, streamlined documentation, 0% down. 100% free for borrowers.',
     provider: { '@type': 'FinancialService', name: 'Bridgit Funding', url: 'https://www.bridgitfunding.com' },
     feesAndCommissionsSpecification: '100% free for borrowers. Lenders pay broker fees after closing per SBA Form 159.',
     loanType: 'SBA Express',
   },
   {
     '@context': 'https://schema.org',
     '@type': 'FAQPage',
     mainEntity: [
       { '@type': 'Question', name: 'How fast can I get an SBA Express loan?', acceptedAnswer: { '@type': 'Answer', text: 'SBA Express loans can issue term sheets in 48–72 hours and typically close in 30 to 45 days. The streamlined process bypasses the standard SBA credit memo, allowing lenders to make credit decisions faster using their own underwriting.' } },
       { '@type': 'Question', name: 'What is the SBSS score requirement for SBA Express?', acceptedAnswer: { '@type': 'Answer', text: 'SBA Express loans require a minimum SBSS (Small Business Scoring Service) score of 155. This score is pulled automatically by lenders — you don\'t need to do anything to generate it. It factors in both business and personal credit history.' } },
       { '@type': 'Question', name: 'Can I use SBA Express to buy a business?', acceptedAnswer: { '@type': 'Answer', text: 'No. SBA Express is designed for working capital, equipment, and small buildout projects — not business acquisitions. Acquisitions require standard SBA 7(a) financing, which we also broker. If your acquisition is under $500K, contact us to discuss the best structure.' } },
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
             <div className="page-hero-badge">SBA 7(a) Small / Express Loans</div>
             <h1>Fast Capital.<br /><em>Up to $500K.</em></h1>
             <p className="page-hero-sub">SBA Express loans are built for speed. Less paperwork, faster decisions, and SBA-capped rates — for businesses that need working capital without the wait.</p>
             <ul className="highlights">
               <li><strong>$100K to $500K</strong>&nbsp; loan amounts</li>
               <li><strong>Rates from 10.5%</strong>&nbsp; SBA-capped APR</li>
               <li><strong>10-year terms</strong>&nbsp; for low monthly payments</li>
               <li><strong>0% down payment</strong>&nbsp; required</li>
               <li><strong>Streamlined process</strong>&nbsp; fewer docs, faster close</li>
               <li><strong>100% free</strong>&nbsp; for borrowers</li>
             </ul>
             <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
               <Link href="#apply" className="btn btn-primary">Apply Free →</Link>
               <Link href="/working-capital" className="btn btn-outline">Need over $500K?</Link>
             </div>
             <div className="highlight-cards">
               <div className="h-card"><div className="h-card-val">$500K</div><div className="h-card-label">Max Loan</div></div>
               <div className="h-card"><div className="h-card-val">10.5%</div><div className="h-card-label">Rates From</div></div>
               <div className="h-card"><div className="h-card-val">10 Yrs</div><div className="h-card-label">Max Term</div></div>
               <div className="h-card"><div className="h-card-val">0%</div><div className="h-card-label">Down Payment</div></div>
             </div>
           </div>
           <LeadForm defaultLoanType="SBA Express" dealSizes={['$100K to $250K','$250K to $500K']} source="bridgitfunding.com/sba-express" notesPlaceholder="Brief description of what you need capital for..." />
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
           <h2 className="section-heading">Current SBA Express Environment.</h2>
           <p className="section-sub" style={{ marginBottom: '8px' }}>What the SBA Express lending market looks like right now.</p>
           <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Page data as of: <strong>{generatedAt}</strong></p>
         </div>

         <div className="card-grid-3" style={{ marginBottom: '40px' }}>
           {[
             { label: 'SBA Express Rate Range', val: sbaPulse.sbaExpressRateRange, note: 'Prime + up to 6.5% for loans under 7 years. SBA-capped — lenders cannot charge more.' },
             { label: 'Max Loan Amount', val: '$500K', note: 'Hard cap for the Express program. Over $500K requires standard 7(a) — we do both.' },
             { label: 'Down Payment', val: '0%', note: 'No down payment required for Express working capital. The business cash flow supports the loan.' },
             { label: 'Min SBSS Score', val: '155', note: 'The SBA small business scoring threshold for Express eligibility. Pulled automatically by lenders.' },
             { label: 'Avg. Days to Term Sheet', val: '48–72 hrs', note: 'Fastest in the SBA product lineup. Lenders make their own credit decision — no SBA review required.' },
             { label: 'Avg. Days to Close', val: '30–45 days', note: 'Streamlined documentation and faster lender decision-making mean quicker closings.' },
           ].map(c => (
             <div key={c.label} className="feature-card" style={{ background: 'var(--gray-pale)', border: '1px solid var(--border)' }}>
               <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>{c.label}</div>
               <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.1, marginBottom: '8px' }}>{c.val}</div>
               <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{c.note}</p>
             </div>
           ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
           {expressLenderNotes.map(n => (
             <div key={n.point} style={{ background: 'var(--dark)', borderRadius: '8px', padding: '20px 24px' }}>
               <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '6px' }}>{n.point}</div>
               <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{n.note}</p>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* LOAN SIZING CALCULATOR */}
     <LoanSizingCalc mode="sba-express" />

     {/* PROCESS */}
     <section style={{ background: 'var(--white)' }}>
       <div className="container">
         <div className="section-header">
           <p className="section-tag">The Process</p>
           <h2 className="section-heading">Four Steps to Funded.</h2>
           <p className="section-sub">We handle the heavy lifting. You focus on running your business.</p>
         </div>
         <div className="steps-grid">
           {[
             { n:'01', t:'Tell Us What You Need', d:'Fill out a quick form. We review your situation and assess your fit — no credit pull required.' },
             { n:'02', t:'We Go to Multiple Lenders', d:'We take your file to our SBA Express lender network simultaneously and collect competing term sheets.' },
             { n:'03', t:'You Pick the Best Offer', d:'We walk you through each term sheet. You choose the best rate and terms. When lenders compete, you win.' },
             { n:'04', t:'Close and Get Funded', d:'We coordinate closing from start to finish. SBA Express loans typically fund in 30 to 45 days.' },
           ].map(s => <div key={s.n} className="step"><div className="step-num">Step {s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
         </div>
       </div>
     </section>

     {/* QUALIFICATIONS */}
     <section>
       <div className="container">
         <div className="section-header">
           <p className="section-tag">Qualifications</p>
           <h2 className="section-heading">Do You Qualify?</h2>
           <p className="section-sub">SBA Express loans have streamlined requirements compared to traditional 7(a) loans. Here's what most lenders look for.</p>
         </div>
         <div className="req-grid">
           <div className="req-card">
             <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Eligibility Requirements</h3>
             <ul className="req-list">
               {['Minimum $250K annual revenue','Minimum $30K annual profit','Credit score of 650 or higher','SBSS score of at least 155','3+ years in business','No bankruptcies in the last 4 years','All business and personal debts current','U.S. citizen or permanent resident'].map(r => <li key={r}><span>{r}</span></li>)}
             </ul>
             <div className="req-note green">Not sure if you qualify? Submit free — we'll tell you within 2 hours.</div>
           </div>
           <div className="req-card">
             <h3><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><polyline points="14 2 14 8 20 8"/></svg>Documents You'll Need</h3>
             <ul className="req-list">
               {['3 years of business tax returns','3 years of personal tax returns','Year-to-date income statement and balance sheet','Current business debt schedule','3 months of business bank statements','Articles of organization or incorporation'].map(r => <li key={r}><span>{r}</span></li>)}
             </ul>
             <div className="req-note neutral">Don't have everything ready? We help you gather and organize what's needed.</div>
           </div>
         </div>
       </div>
     </section>

     <section className="final-cta">
       <div className="container">
         <p className="section-tag">Get Started</p>
         <h2>Ready to Move Fast?</h2>
         <p>Free assessment. No credit check. Response within 2 hours.</p>
         <div className="cta-btns">
           <Link href="#apply" className="btn btn-white">Apply Free →</Link>
           <Link href="/working-capital" className="btn btn-ghost">Need over $500K?</Link>
         </div>
       </div>
     </section>
   </>
 )
}
