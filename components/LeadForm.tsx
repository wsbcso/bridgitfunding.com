'use client'
import { useState } from 'react'

const WEBHOOK_URL = 'https://eo32hdoucomzbzj.m.pipedream.net'

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const LOAN_TYPES = ['Business Acquisition','Working Capital','Commercial Real Estate','Partnership Buyout','SBA Express','Not Sure Yet']
const DEAL_SIZES = ['Under $500K','$500K to $1M','$1M to $2.5M','$2.5M to $5M','Over $5M']

interface LeadFormProps {
  defaultLoanType?: string
  dealSizes?: string[]
  source?: string
  notesPlaceholder?: string
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
}

export default function LeadForm({
  defaultLoanType = '',
  dealSizes = DEAL_SIZES,
  source = 'bridgitfunding.com',
  notesPlaceholder = "Brief description of what you're looking to finance..."
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    businessName: '', state: '',
    loanType: defaultLoanType, dealSize: '', notes: ''
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    set('phone', formatPhone(e.target.value))
  }

  async function submit() {
    const { firstName, lastName, phone, email, state, loanType, dealSize } = form
    if (!firstName || !lastName || !phone || !email || !state || !loanType || !dealSize) {
      alert('Please fill in all required fields.')
      return
    }
    setLoading(true)
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      business_name: form.businessName,
      city: state,
      neighborhood: loanType,
      industry: dealSize,
      notes: form.notes,
      submitted_at: new Date().toISOString(),
      source
    }
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } catch (e) {}
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="check-circle">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h3>We got it.</h3>
          <p>Expect to hear from us within 2 business hours with your options, estimated rate range, and recommended next steps.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      <h3>Get Your Free Assessment</h3>
      <p>No credit pull. No commitment. Just answers.</p>

      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" required />
        </div>
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={handlePhone}
          placeholder="(312) 555-0100"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          placeholder="john@email.com"
          required
        />
      </div>
      <div className="form-group">
        <label>Business Name <span className="optional-label">(optional)</span></label>
        <input value={form.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Acme LLC" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>State</label>
          <select value={form.state} onChange={e => set('state', e.target.value)} required>
            <option value="">Select state...</option>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Loan Type</label>
          <select value={form.loanType} onChange={e => set('loanType', e.target.value)} required>
            <option value="">Select type...</option>
            {LOAN_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Estimated Loan Amount</label>
        <select value={form.dealSize} onChange={e => set('dealSize', e.target.value)} required>
          <option value="">Select range...</option>
          {dealSizes.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder={notesPlaceholder} />
      </div>
      <button className="form-submit" onClick={submit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Free Assessment →'}
      </button>
      <p className="form-disclaimer">100% free. No credit check. No obligation. We respond within 2 business hours.</p>
    </div>
  )
}
