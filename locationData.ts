// ─── Loan Types ───────────────────────────────────────────────────────────────
export const loanTypes = [
  { name: 'Business Acquisition', slug: 'business-acquisition', short: 'Acquisition', max: '$5M', minDown: '10%', rateRange: '8.00%–10.00%', term: '10 years', calcMode: 'acquisition' as const },
  { name: 'Working Capital', slug: 'working-capital', short: 'Working Capital', max: '$5M', minDown: '0%', rateRange: '8.50%–11.75%', term: '10 years', calcMode: 'working-capital' as const },
  { name: 'SBA Express', slug: 'sba-express', short: 'SBA Express', max: '$500K', minDown: '0%', rateRange: '10.50%–13.50%', term: '10 years', calcMode: 'sba-express' as const },
  { name: 'Equipment Financing', slug: 'equipment-financing', short: 'Equipment', max: '$5M', minDown: '10%', rateRange: '8.00%–10.50%', term: '10 years', calcMode: 'working-capital' as const },
  { name: 'Commercial Real Estate', slug: 'commercial-real-estate', short: 'CRE / 504', max: '$13M', minDown: '10%', rateRange: '6.50%–8.50%', term: '25 years', calcMode: 'working-capital' as const },
  { name: 'Partnership Buyout', slug: 'partnership-buyout', short: 'Partner Buyout', max: '$5M', minDown: '10%', rateRange: '8.00%–10.00%', term: '10 years', calcMode: 'acquisition' as const },
]

export type LoanType = typeof loanTypes[number]
export type CalcMode = 'acquisition' | 'working-capital' | 'sba-express'

// ─── Industries ───────────────────────────────────────────────────────────────
export const industries = [
  { name: 'Restaurant / Diner', slug: 'restaurant', sdeMultiple: '2.0×–3.0×', note: 'Lease assignment and liquor license transfer are the most common deal complications. POS-verified sales data is the first thing lenders request.' },
  { name: 'Coffee Shop / Cafe', slug: 'coffee-shop', sdeMultiple: '1.8×–2.8×', note: 'Location and lease quality are the dominant value drivers. High-traffic corner leases with years remaining command significant premiums.' },
  { name: 'Bar / Nightclub', slug: 'bar-nightclub', sdeMultiple: '2.2×–3.2×', note: 'Liquor license transfer requires state approval and adds 60–90 days to the timeline. Established operations with consistent revenue attract strong lender interest.' },
  { name: 'Dental Practice', slug: 'dental-practice', sdeMultiple: '3.0×–4.0×', note: 'DSO-backed buyers are active nationwide. Patient retention and payer mix are the primary underwriting variables lenders focus on.' },
  { name: 'Medical Practice / Clinic', slug: 'medical-practice', sdeMultiple: '2.8×–3.8×', note: 'Provider credentialing and payer contract assignments add complexity. SBA lenders are very active in healthcare acquisitions.' },
  { name: 'Veterinary Clinic', slug: 'veterinary-clinic', sdeMultiple: '3.5×–4.6×', note: 'One of the hottest SBA acquisition categories. Corporate consolidators and individual practitioners both compete aggressively.' },
  { name: 'Physical Therapy', slug: 'physical-therapy', sdeMultiple: '2.9×–3.7×', note: 'Insurance payer mix and documented patient volume are the primary lender focus areas. Multi-site operators are active buyers.' },
  { name: 'HVAC Company', slug: 'hvac', sdeMultiple: '2.7×–3.6×', note: 'Maintenance contract books are highly valued. Lenders require a licensed technician in the org chart to fund without the owner.' },
  { name: 'Plumbing Company', slug: 'plumbing', sdeMultiple: '2.5×–3.3×', note: 'Licensed master plumber in the org chart is a lender requirement. Commercial relationships drive premium multiples.' },
  { name: 'Electrical Contractor', slug: 'electrical-contractor', sdeMultiple: '2.4×–3.2×', note: 'Master electrician license and documented commercial relationships are the core lender requirements.' },
  { name: 'Landscaping / Lawn Care', slug: 'landscaping', sdeMultiple: '2.0×–2.8×', note: 'Documented commercial contract revenue is the primary value driver. Equipment and crew transferability close the deal.' },
  { name: 'Roofing Contractor', slug: 'roofing', sdeMultiple: '2.3×–3.1×', note: 'Storm restoration network and recurring service agreements command premium multiples in the SBA market.' },
  { name: 'IT / Managed Services', slug: 'it-msp', sdeMultiple: '3.3×–4.4×', note: 'MRR contracts and low customer concentration drive top multiples. PE-backed roll-up buyers are extremely active.' },
  { name: 'Accounting / CPA Firm', slug: 'cpa-firm', sdeMultiple: '3.2×–4.0×', note: 'Recurring client relationships and predictable seasonal cash flows make these perennial SBA acquisition targets.' },
  { name: 'Insurance Agency', slug: 'insurance-agency', sdeMultiple: '3.0×–3.8×', note: 'Book of business documentation and carrier appointment history are the primary lender underwriting variables.' },
  { name: 'Financial Advisory', slug: 'financial-advisory', sdeMultiple: '3.4×–4.2×', note: 'AUM documentation and client relationship transferability drive valuations. Succession buyers are very active.' },
  { name: 'Auto Body / Repair Shop', slug: 'auto-repair', sdeMultiple: '2.2×–3.0×', note: 'Recurring fleet accounts and documented technician teams command premium multiples from SBA lenders.' },
  { name: 'Car Wash', slug: 'car-wash', sdeMultiple: '3.8×–5.0×', note: 'Express tunnel operations with membership programs are among the most sought-after SBA acquisition targets nationally.' },
  { name: 'Gym / Fitness Studio', slug: 'gym-fitness', sdeMultiple: '2.2×–3.2×', note: 'EFT membership revenue is the primary SBA lender focus. Month-to-month heavy studios require a larger buyer pool.' },
  { name: 'Hair Salon / Barbershop', slug: 'hair-salon', sdeMultiple: '1.8×–2.5×', note: 'Recurring customers, low inventory, and simple operations make these popular first-time SBA acquisition targets.' },
  { name: 'Nail Salon', slug: 'nail-salon', sdeMultiple: '1.6×–2.4×', note: 'High-velocity SBA acquisition targets. Simple operations and predictable cash flow attract first-time buyers.' },
  { name: 'Daycare / Childcare', slug: 'daycare', sdeMultiple: '2.6×–3.5×', note: 'Full enrollment and long-standing staff are critical. State licensing and enrollment list are the core deal assets.' },
  { name: 'Pharmacy', slug: 'pharmacy', sdeMultiple: '2.8×–3.6×', note: 'Recurring script revenue and established customer relationships command strong SBA multiples. Payer credentialing adds timeline.' },
  { name: 'Optometry / Vision Center', slug: 'optometry', sdeMultiple: '2.6×–3.4×', note: 'Corporate consolidators and individual ODs both compete actively. Patient volume and frame revenue drive valuations.' },
  { name: 'Property Management', slug: 'property-management', sdeMultiple: '2.8×–3.6×', note: 'Door count and recurring fee revenue are the primary SBA lender metrics. Roll-up buyers target these actively.' },
  { name: 'Staffing Agency', slug: 'staffing-agency', sdeMultiple: '2.3×–3.1×', note: 'Gross margin and client concentration are the key underwriting variables. Top account retention is the primary close risk.' },
  { name: 'Home Health / Care Agency', slug: 'home-health', sdeMultiple: '2.8×–3.6×', note: 'Aging demographics drive strong buyer demand. Medicare/Medicaid reimbursement documentation is critical for lender approval.' },
  { name: 'Pest Control', slug: 'pest-control', sdeMultiple: '2.7×–3.5×', note: 'PE-backed roll-up buyers are extremely active. Recurring service agreements are the primary SBA lender focus.' },
  { name: 'Moving Company', slug: 'moving-company', sdeMultiple: '2.0×–2.8×', note: 'Documented fleet, trained crews, and commercial contracts are the deal. Scalability is a key buyer attraction.' },
  { name: 'Janitorial / Cleaning', slug: 'janitorial', sdeMultiple: '2.0×–2.8×', note: 'B2B contracts and low customer concentration make these textbook SBA acquisition targets.' },
  { name: 'Construction Company', slug: 'construction', sdeMultiple: '2.4×–3.2×', note: 'Backlog plus historical earnings drive SBA valuations. Bonding capacity and subcontractor relationships are key lender factors.' },
  { name: 'Manufacturing', slug: 'manufacturing', sdeMultiple: '2.6×–3.5×', note: 'Equipment appraisals can add 2–3 weeks. Real estate inclusion significantly expands the eligible SBA lender pool.' },
  { name: 'Wholesale / Distribution', slug: 'wholesale-distribution', sdeMultiple: '2.4×–3.2×', note: 'Customer account documentation and logistics infrastructure are the primary SBA lender focus areas.' },
  { name: 'Logistics / Trucking', slug: 'logistics-trucking', sdeMultiple: '2.5×–3.3×', note: 'Contracted freight volumes and fleet documentation are required. SBA lenders are active in asset-backed logistics deals.' },
  { name: 'Franchise', slug: 'franchise', sdeMultiple: '2.2×–3.0×', note: 'Franchisor approval process and FDD are central to SBA lender due diligence. Resales are a well-understood category.' },
  { name: 'Hotel / Motel', slug: 'hotel-motel', sdeMultiple: '2.6×–3.4×', note: 'RevPAR data and flag affiliation drive SBA valuations. Real estate-inclusive deals expand the lender pool significantly.' },
  { name: 'Gas Station / C-Store', slug: 'gas-station', sdeMultiple: '2.0×–2.8×', note: 'Environmental assessment and fuel contract documentation are required. SBA lenders familiar with this category move efficiently.' },
  { name: 'Car Dealership', slug: 'car-dealership', sdeMultiple: '2.2×–3.0×', note: 'Manufacturer franchise approval adds complexity. Floor plan financing and real estate are often structured alongside the SBA loan.' },
  { name: 'Self-Storage Facility', slug: 'self-storage', sdeMultiple: '3.2×–4.5×', note: 'Occupancy rate and unit mix drive SBA valuations. Real estate-inclusive deals are preferred by most SBA lenders.' },
  { name: 'Laundromat', slug: 'laundromat', sdeMultiple: '2.0×–2.8×', note: 'Equipment condition and lease tenure are the primary SBA lender focus. Cash business documentation requires extra attention.' },
  { name: 'Funeral Home', slug: 'funeral-home', sdeMultiple: '2.8×–3.6×', note: 'Community trust and staff continuity are the primary value drivers. SBA lenders are comfortable with this category.' },
  { name: 'Printing / Signs', slug: 'printing-signs', sdeMultiple: '2.0×–2.8×', note: 'B2B relationships and equipment assets drive SBA valuations. Recurring accounts significantly increase lender appetite.' },
  { name: 'Event Space / Venue', slug: 'event-venue', sdeMultiple: '2.6×–3.4×', note: 'Forward booking calendar is the primary SBA lender focus. Venues with contracted events attract faster, stronger offers.' },
  { name: 'Marketing Agency', slug: 'marketing-agency', sdeMultiple: '2.4×–3.4×', note: 'Recurring retainer revenue and client concentration are the key SBA underwriting variables. Team retention is the primary close risk.' },
  { name: 'E-Commerce / Online Business', slug: 'ecommerce', sdeMultiple: '2.5×–3.5×', note: 'SBA lenders have become significantly more comfortable with digital businesses. Revenue documentation and platform risk are key factors.' },
]

export type Industry = typeof industries[number]
