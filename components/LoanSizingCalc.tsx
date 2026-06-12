'use client'
import { useState } from 'react'

type CalcMode = 'acquisition' | 'working-capital' | 'sba-express'

interface Props {
  mode: CalcMode
}

function fmtInput(val: string): string {
  const digits = val.replace(/[^0-9]/g, '')
  if (!digits) return ''
  return parseInt(digits, 10).toLocaleString()
}

function parseNum(val: string): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

function fmtMoney(n: number): string {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K'
  return '$' + n.toLocaleString()
}

// Monthly payment on a fully amortizing loan
function monthlyPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12
  const n = years * 12
  if (r === 0) return principal / n
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function LoanSizingCalc({ mode }: Props) {
  // Acquisition inputs
  const [purchasePrice, setPurchasePrice] = useState('')
  const [downPct, setDownPct] = useState('10')
  const [sellerNotePct, setSellerNotePct] = useState('0')
  const [businessSDE, setBusinessSDE] = useState('')

  // Working capital inputs
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [annualProfit, setAnnualProfit] = useState('')
  const [existingDebt, setExistingDebt] = useState('')

  // SBA Express inputs
  const [expressRevenue, setExpressRevenue] = useState('')
  const [expressProfit, setExpressProfit] = useState('')

  const [shown, setShown] = useState(false)

  // Current SBA rate assumptions
  const PRIME = 7.5
  const ACQ_SPREAD = 2.25
  const WC_SPREAD = 2.5
  const EXPRESS_RATE = 11.5
  const ACQ_RATE = (PRIME + ACQ_SPREAD) / 100
  const WC_RATE = (PRIME + WC_SPREAD) / 100

  function handleChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(fmtInput(e.target.value))
      setShown(false)
    }
  }

  function handleSelect(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value)
      setShown(false)
    }
  }

  // ── Acquisition calc ────────────────────────────────────────────────────────
  function calcAcquisition() {
    const price = parseNum(purchasePrice)
    const down = parseFloat(downPct) / 100
    const sellerNote = parseFloat(sellerNotePct) / 100
    const sde = parseNum(businessSDE)
    if (price === 0) return null

    const downDollars = price * down
    const sellerNoteDollars = price * sellerNote
    const loanAmount = Math.min(price - downDollars - sellerNoteDollars, 5000000)
    const monthly = monthlyPayment(loanAmount, ACQ_RATE, 10)
    const annualDS = monthly * 12
    // DSCR = SDE / annual debt service
    const dscr = sde > 0 ? sde / annualDS : null
    const dscrPass = dscr !== null ? dscr >= 1.25 : null

    // Estimated SDE needed to support the loan
    const sdeNeeded = annualDS * 1.25

    return {
      price, downDollars, sellerNoteDollars, loanAmount,
      monthly, annualDS, dscr, dscrPass, sdeNeeded,
      rate: PRIME + ACQ_SPREAD,
    }
  }

  // ── Working capital calc ────────────────────────────────────────────────────
  function calcWorkingCapital() {
    const revenue = parseNum(annualRevenue)
    const profit = parseNum(annualProfit)
    const debt = parseNum(existingDebt)
    if (revenue === 0 || profit === 0) return null

    // Max loan: DSCR-limited. SDE must cover 1.25x debt service on existing + new
    // Solve: profit / (existingDebtAnnual + newPayment*12) >= 1.25
    // newPayment*12 <= profit/1.25 - existingDebtAnnual
    const availableDS = (profit / 1.25) - debt
    if (availableDS <= 0) return { overLeveraged: true, profit, debt, revenue }

    // Back-solve: what loan amount does availableDS support at WC_RATE, 10yr?
    const r = WC_RATE / 12
    const n = 120
    const maxLoan = Math.min(availableDS / 12 * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))), 5000000)
    const actualMaxLoan = Math.floor(maxLoan / 1000) * 1000

    const monthly = monthlyPayment(actualMaxLoan, WC_RATE, 10)
    const dscr = profit / ((monthly * 12) + debt)

    // Revenue-based rough check (lenders also look at revenue)
    const revenueBasedMax = revenue * 0.4

    return {
      overLeveraged: false,
      maxLoan: actualMaxLoan,
      revenueBasedMax,
      conservative: Math.min(actualMaxLoan, revenueBasedMax),
      monthly, dscr,
      rate: PRIME + WC_SPREAD,
      profit, revenue, debt,
    }
  }

  // ── SBA Express calc ────────────────────────────────────────────────────────
  function calcExpress() {
    const revenue = parseNum(expressRevenue)
    const profit = parseNum(expressProfit)
    if (revenue === 0 || profit === 0) return null

    // Express cap is $500K
    // Simplified: up to lesser of $500K or 2x annual profit or 20% of revenue
    const profitBased = Math.min(profit * 2, 500000)
    const revenueBased = Math.min(revenue * 0.2, 500000)
    const maxLoan = Math.floor(Math.min(profitBased, revenueBased) / 1000) * 1000

    const monthly = monthlyPayment(maxLoan, EXPRESS_RATE / 100, 10)

    const qualifies = revenue >= 250000 && profit >= 30000

    return { maxLoan, monthly, qualifies, revenue, profit, rate: EXPRESS_RATE }
  }

  const acqResult   = mode === 'acquisition'     ? calcAcquisition()    : null
  const wcResult    = mode === 'working-capital'  ? calcWorkingCapital() : null
  const expResult   = mode === 'sba-express'      ? calcExpress()        : null

  const canCalculate =
    (mode === 'acquisition'    && parseNum(purchasePrice) > 0) ||
    (mode === 'working-capital' && parseNum(annualRevenue) > 0 && parseNum(annualProfit) > 0) ||
    (mode === 'sba-express'    && parseNum(expressRevenue) > 0 && parseNum(expressProfit) > 0)

  function scrollToForm() {
    const el = document.getElementById('apply')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section style={{ background: '#0a0a0a', padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-tag" style={{ color: 'var(--green-light)' }}>
            {mode === 'acquisition' ? 'Acquisition Loan Sizing' : mode === 'working-capital' ? 'Working Capital Sizing' : 'SBA Express Sizing'}
          </p>
          <h2 className="section-heading" style={{ color: 'var(--white)' }}>
            {mode === 'acquisition'
              ? 'How Much Can You Borrow to Buy This Business?'
              : mode === 'working-capital'
              ? 'How Much Working Capital Can You Qualify For?'
              : 'How Much Can You Borrow with SBA Express?'}
          </h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto' }}>
            {mode === 'acquisition'
              ? 'Enter the deal details below. We\'ll show you the loan amount, whether the SDE supports the debt, and what you need to qualify.'
              : mode === 'working-capital'
              ? 'Enter your business financials. We\'ll show you the maximum loan amount your DSCR supports at current SBA rates.'
              : 'Enter your revenue and profit. We\'ll show you your estimated SBA Express eligibility in seconds.'}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '8px' }}>
            Based on Prime Rate of {PRIME}% as of calculation date. Actual rates and amounts vary by lender and deal structure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="calc-grid">

          {/* ── INPUTS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ACQUISITION INPUTS */}
            {mode === 'acquisition' && <>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Business Purchase Price</label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="1,200,000" value={purchasePrice} onChange={handleChange(setPurchasePrice)} className="calc-input" />
                </div>
                <div className="calc-hint">The agreed or listed purchase price of the business</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Your Down Payment</label>
                <select value={downPct} onChange={handleSelect(setDownPct)} className="calc-select">
                  <option value="5">5% — minimum with seller note</option>
                  <option value="10">10% — standard SBA minimum</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%+ — strong application</option>
                </select>
                <div className="calc-hint">SBA requires minimum 10% equity injection; 5% possible with seller note</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Seller Note (if any)</label>
                <select value={sellerNotePct} onChange={handleSelect(setSellerNotePct)} className="calc-select">
                  <option value="0">No seller note</option>
                  <option value="5">5% seller note</option>
                  <option value="10">10% seller note</option>
                  <option value="15">15% seller note</option>
                  <option value="20">20% seller note</option>
                </select>
                <div className="calc-hint">A seller note reduces the SBA loan amount and can lower your down payment requirement</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Business Annual SDE <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>optional — for debt service check</span></label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="280,000" value={businessSDE} onChange={handleChange(setBusinessSDE)} className="calc-input" />
                </div>
                <div className="calc-hint">Seller's Discretionary Earnings — we'll check if the deal cash flows at 1.25x DSCR</div>
              </div>
            </>}

            {/* WORKING CAPITAL INPUTS */}
            {mode === 'working-capital' && <>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Annual Business Revenue</label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="1,500,000" value={annualRevenue} onChange={handleChange(setAnnualRevenue)} className="calc-input" />
                </div>
                <div className="calc-hint">Your most recent full year gross revenue</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Annual Net Profit (before owner salary)</label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="320,000" value={annualProfit} onChange={handleChange(setAnnualProfit)} className="calc-input" />
                </div>
                <div className="calc-hint">Net income from your tax return or P&L — add back your owner compensation for best results</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Existing Annual Debt Payments <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>optional</span></label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="60,000" value={existingDebt} onChange={handleChange(setExistingDebt)} className="calc-input" />
                </div>
                <div className="calc-hint">Total annual payments on current business loans — lenders factor this into DSCR</div>
              </div>
            </>}

            {/* SBA EXPRESS INPUTS */}
            {mode === 'sba-express' && <>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Annual Business Revenue</label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="600,000" value={expressRevenue} onChange={handleChange(setExpressRevenue)} className="calc-input" />
                </div>
                <div className="calc-hint">Minimum $250K annual revenue required for SBA Express</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'rgba(255,255,255,0.7)' }}>Annual Net Profit</label>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">$</span>
                  <input type="text" inputMode="numeric" placeholder="80,000" value={expressProfit} onChange={handleChange(setExpressProfit)} className="calc-input" />
                </div>
                <div className="calc-hint">Minimum $30K annual profit required. Add back owner salary for a more accurate estimate.</div>
              </div>
            </>}

            <button
              onClick={() => { if (canCalculate) setShown(true) }}
              disabled={!canCalculate}
              style={{
                padding: '14px 24px', background: canCalculate ? 'var(--green)' : '#2a2a2a',
                color: canCalculate ? '#000' : '#555', border: 'none', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, cursor: canCalculate ? 'pointer' : 'not-allowed',
                transition: 'all .15s',
              }}
            >
              Calculate My Loan Eligibility
            </button>
          </div>

          {/* ── RESULTS ── */}
          <div>
            {!shown ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '320px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '48px', color: 'rgba(255,255,255,0.08)', fontWeight: 700, marginBottom: '16px' }}>$</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, margin: 0 }}>Enter your numbers to see your estimated loan eligibility.</p>
              </div>
            ) : (

              /* ACQUISITION RESULTS */
              acqResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '6px' }}>SBA Loan Amount</div>
                    <div style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: '44px', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{fmtMoney(acqResult.loanAmount)}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>SBA 7(a) at ~{acqResult.rate}% (Prime + {ACQ_SPREAD}%) · 10-year term</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { label: 'Purchase Price', val: fmtMoney(acqResult.price) },
                      { label: 'Your Down Payment', val: fmtMoney(acqResult.downDollars) },
                      { label: 'Seller Note', val: acqResult.sellerNoteDollars > 0 ? fmtMoney(acqResult.sellerNoteDollars) : 'None' },
                      { label: 'Est. Monthly Payment', val: fmtMoney(Math.round(acqResult.monthly)) + '/mo' },
                    ].map(r => (
                      <div key={r.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>{r.label}</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)' }}>{r.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* DSCR check */}
                  {acqResult.dscr !== null && (
                    <div style={{ background: acqResult.dscrPass ? 'rgba(74,222,128,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${acqResult.dscrPass ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: '8px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: acqResult.dscrPass ? 'var(--green-light)' : '#f87171', marginBottom: '6px' }}>
                        Debt Service Coverage: {acqResult.dscr.toFixed(2)}x {acqResult.dscrPass ? '✓ Passes' : '✗ Below 1.25x Minimum'}
                      </div>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                        {acqResult.dscrPass
                          ? `The business SDE of ${fmtMoney(parseNum(businessSDE))} covers the annual debt service at ${acqResult.dscr.toFixed(2)}x — above the 1.25x lender minimum. This deal cash flows.`
                          : `The business needs at least ${fmtMoney(Math.round(acqResult.sdeNeeded))} in SDE to support this loan at 1.25x DSCR. Consider a higher down payment or seller note to reduce the loan amount.`}
                      </p>
                    </div>
                  )}

                  {acqResult.dscr === null && (
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px' }}>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
                        Add the business SDE above to check whether the deal cash flows at lender-required 1.25x DSCR. The business needs at least <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{fmtMoney(Math.round(acqResult.sdeNeeded))}</strong> in SDE to support this loan.
                      </p>
                    </div>
                  )}

                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.5, margin: 0 }}>
                    Estimate based on current SBA guidelines. Actual loan amount depends on lender, business type, credit profile, and deal structure. Max SBA 7(a) loan is $5M.
                  </p>
                  <button onClick={scrollToForm} style={{ padding: '14px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                    Get a Real Term Sheet — Free →
                  </button>
                </div>
              )
            )}

            {/* WORKING CAPITAL RESULTS */}
            {shown && wcResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(wcResult as any).overLeveraged ? (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f87171', marginBottom: '8px' }}>Current Debt Load May Limit Eligibility</div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                      Your current annual profit of {fmtMoney((wcResult as any).profit)} may not support additional debt service above your existing {fmtMoney((wcResult as any).debt)} in annual payments at the 1.25x DSCR minimum. Talk to us — debt refinancing may improve your eligibility.
                    </p>
                    <button onClick={scrollToForm} style={{ marginTop: '16px', padding: '12px 20px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                      Talk to an Advisor Free →
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '24px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '6px' }}>Estimated Max Loan</div>
                      <div style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: '44px', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{fmtMoney((wcResult as any).conservative)}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>SBA 7(a) at ~{(wcResult as any).rate}% (Prime + {WC_SPREAD}%) · 10-year term</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {[
                        { label: 'DSCR-Based Max', val: fmtMoney((wcResult as any).maxLoan) },
                        { label: 'Revenue-Based Max', val: fmtMoney(Math.round((wcResult as any).revenueBasedMax)) },
                        { label: 'Est. Monthly Payment', val: fmtMoney(Math.round((wcResult as any).monthly)) + '/mo' },
                        { label: 'DSCR', val: ((wcResult as any).dscr as number).toFixed(2) + 'x' },
                      ].map(r => (
                        <div key={r.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>{r.label}</div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)' }}>{r.val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '8px', padding: '14px' }}>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                        We show the lower of your DSCR-based and revenue-based maximum as the conservative estimate. Lenders use both tests — the binding constraint determines the actual offer.
                      </p>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.5, margin: 0 }}>
                      Estimate based on current SBA guidelines. Actual eligibility depends on credit score, time in business, industry, and lender appetite.
                    </p>
                    <button onClick={scrollToForm} style={{ padding: '14px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                      Get a Real Term Sheet — Free →
                    </button>
                  </>
                )}
              </div>
            )}

            {/* SBA EXPRESS RESULTS */}
            {shown && expResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!(expResult as any).qualifies ? (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f87171', marginBottom: '8px' }}>May Not Meet SBA Express Minimums</div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                      SBA Express requires at least $250K in annual revenue and $30K in annual profit. Your numbers are close — talk to us, as some lenders are flexible and we know which ones.
                    </p>
                    <button onClick={scrollToForm} style={{ marginTop: '16px', padding: '12px 20px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                      Talk to an Advisor Free →
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '24px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '6px' }}>Estimated Max SBA Express Loan</div>
                      <div style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: '44px', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{fmtMoney((expResult as any).maxLoan)}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>SBA Express at ~{(expResult as any).rate}% · 10-year term · 0% down</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {[
                        { label: 'SBA Express Cap', val: '$500K' },
                        { label: 'Est. Monthly Payment', val: fmtMoney(Math.round((expResult as any).monthly)) + '/mo' },
                        { label: 'Down Payment', val: '0%' },
                        { label: 'Time to Close', val: '30–45 days' },
                      ].map(r => (
                        <div key={r.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px' }}>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>{r.label}</div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)' }}>{r.val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '8px', padding: '14px' }}>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                        If you need more than $500K, the traditional SBA 7(a) working capital program goes up to $5M at a slightly lower rate with the same lender network.
                      </p>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.5, margin: 0 }}>
                      Estimate based on current SBA Express guidelines. Final amount depends on credit score, SBSS score, industry, and lender.
                    </p>
                    <button onClick={scrollToForm} style={{ padding: '14px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                      Get a Real Term Sheet — Free →
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
