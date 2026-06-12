// ─── SBA Rate Pulse data ──────────────────────────────────────────────────────
export const sbaPulse = {
  primeRate: '7.50',
  sba7aRateRange: '8.00% – 11.75%',
  sbaExpressRateRange: '10.50% – 13.50%',
  avgDaysToTermSheet: '7',
  avgDaysToClose: '52',
  approvalRate: '99.1%',
  lenderCount: '50+',
  note: 'SBA 7(a) rates are variable, tied to Prime Rate, and capped by the SBA. Bridgit\'s lender network allows borrowers to receive competing term sheets — driving rates toward the lower end of the range.',
}

// ─── Acquisition industry insights ───────────────────────────────────────────
export const acquisitionIndustryInsights = [
  { industry: 'Restaurants & Food Service', sdeMultiple: '2.0× – 3.0×', avgDealSize: '$450K – $1.8M', keyNote: 'Lease assignment and liquor license transfer are the most common deal-killers. Buyers with relevant experience and clean financials close faster.' },
  { industry: 'Healthcare & Medical', sdeMultiple: '2.8× – 4.0×', avgDealSize: '$800K – $3.5M', keyNote: 'Payer credentialing and provider enrollment add 30–60 days post-close. SBA lenders are active in this space and comfortable with the transition risk.' },
  { industry: 'IT / Managed Services', sdeMultiple: '3.5× – 4.5×', avgDealSize: '$600K – $2.5M', keyNote: 'MRR-heavy businesses command premium multiples. Lenders want to see customer concentration under 40% and documented SLA contracts.' },
  { industry: 'Home Services', sdeMultiple: '2.5× – 3.5×', avgDealSize: '$400K – $2.2M', keyNote: 'Maintenance contract revenue is the primary value driver. Lenders require a licensed technician in the org chart to fund without the owner.' },
  { industry: 'Professional Services', sdeMultiple: '3.0× – 4.2×', avgDealSize: '$300K – $1.8M', keyNote: 'Client relationship transferability is the underwriting focus. Sellers with documented transition plans see faster, cleaner closings.' },
  { industry: 'Manufacturing & Distribution', sdeMultiple: '2.5× – 3.5×', avgDealSize: '$1M – $5M', keyNote: 'Equipment appraisals can add 2–3 weeks to the timeline. Real estate inclusion significantly expands the eligible lender pool.' },
]

// ─── Working capital lender notes ────────────────────────────────────────────
export const wcLenderNotes = [
  { useCase: 'Business Expansion', lenderNote: 'Lenders want a clear revenue projection tied to the expansion plan. A one-page narrative with financial support is enough — we help you build it.' },
  { useCase: 'Equipment Purchase', lenderNote: 'Equipment loans are among the most straightforward SBA deals. Appraisal required for assets over $500K. 10-year terms keep monthly payments low.' },
  { useCase: 'Debt Refinance', lenderNote: 'Refinancing high-interest debt into SBA is one of the highest-ROI moves a profitable business can make. Lenders require proof of business purpose on the original debt.' },
  { useCase: 'Hiring and Payroll', lenderNote: 'Working capital for hiring is fully eligible under SBA 7(a). Lenders look at historical revenue growth and a clear rationale for the headcount increase.' },
]

// ─── SBA Express lender notes ─────────────────────────────────────────────────
export const expressLenderNotes = [
  { point: 'SBSS Score', note: 'The SBA Small Business Scoring Service (SBSS) score must be at least 155 for Express loans. Lenders pull this automatically — no action needed from you.' },
  { point: 'Speed Advantage', note: 'Express loans skip the standard SBA credit memo process. Lenders make their own credit decision, which is why approvals can come in 48–72 hours.' },
  { point: 'Collateral', note: 'Express loans under $50K require no collateral. Above $50K, lenders take available business assets but generally don\'t require real estate for deals under $500K.' },
  { point: 'Best Use Cases', note: 'Equipment, working capital, and small buildouts are the most common Express use cases. Not available for acquisitions — those require standard 7(a).' },
]
