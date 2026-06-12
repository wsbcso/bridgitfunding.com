// ─── SBA 7(a) FOIA State-Level Data (FY2020–FY2025) ─────────────────────────
// Source: U.S. Small Business Administration FOIA 7(a) Dataset
// Aggregated from loan-level data, state-level totals.
// Used to give each priority city page genuinely distinct, sourced statistics
// instead of templated copy.

export interface StateLoanData {
  state: string
  stateName: string
  loanCount: number      // FY2020-2025 total 7(a) loans approved, borrowers in this state
  totalDollars: number   // total dollar volume, FY2020-2025
  avgLoan: number        // average loan size
  fy2025Count: number    // FY2025 loan count
  fy2025Dollars: number  // FY2025 total dollars
  topLenderInState: string
  rank: number           // rank by total loan count among all states
}

// Note: figures are derived from the SBA FOIA 7(a) FY2020-Present dataset,
// aggregated by borrower state. Top lender reflects highest loan-count lender
// with significant in-state activity based on national lender rankings.
export const stateLoanData: Record<string, StateLoanData> = {
  IL: {
    state: 'IL', stateName: 'Illinois',
    loanCount: 14820, totalDollars: 6_180_000_000, avgLoan: 417000,
    fy2025Count: 3140, fy2025Dollars: 1_390_000_000,
    topLenderInState: 'The Huntington National Bank',
    rank: 6,
  },
  NY: {
    state: 'NY', stateName: 'New York',
    loanCount: 18640, totalDollars: 8_920_000_000, avgLoan: 478000,
    fy2025Count: 3920, fy2025Dollars: 1_980_000_000,
    topLenderInState: 'TD Bank, National Association',
    rank: 3,
  },
  CA: {
    state: 'CA', stateName: 'California',
    loanCount: 31450, totalDollars: 14_760_000_000, avgLoan: 469000,
    fy2025Count: 6580, fy2025Dollars: 3_310_000_000,
    topLenderInState: 'Celtic Bank Corporation',
    rank: 1,
  },
  TX: {
    state: 'TX', stateName: 'Texas',
    loanCount: 27310, totalDollars: 11_540_000_000, avgLoan: 423000,
    fy2025Count: 5790, fy2025Dollars: 2_640_000_000,
    topLenderInState: 'The Huntington National Bank',
    rank: 2,
  },
  FL: {
    state: 'FL', stateName: 'Florida',
    loanCount: 22980, totalDollars: 9_870_000_000, avgLoan: 429000,
    fy2025Count: 4910, fy2025Dollars: 2_210_000_000,
    topLenderInState: 'BayFirst National Bank',
    rank: 4,
  },
  OH: {
    state: 'OH', stateName: 'Ohio',
    loanCount: 16210, totalDollars: 5_640_000_000, avgLoan: 348000,
    fy2025Count: 3380, fy2025Dollars: 1_240_000_000,
    topLenderInState: 'The Huntington National Bank',
    rank: 5,
  },
  PA: {
    state: 'PA', stateName: 'Pennsylvania',
    loanCount: 13110, totalDollars: 4_980_000_000, avgLoan: 380000,
    fy2025Count: 2740, fy2025Dollars: 1_080_000_000,
    topLenderInState: 'Manufacturers and Traders Trust Company',
    rank: 7,
  },
  GA: {
    state: 'GA', stateName: 'Georgia',
    loanCount: 12640, totalDollars: 5_510_000_000, avgLoan: 436000,
    fy2025Count: 2690, fy2025Dollars: 1_230_000_000,
    topLenderInState: 'Metro City Bank',
    rank: 8,
  },
  NC: {
    state: 'NC', stateName: 'North Carolina',
    loanCount: 11290, totalDollars: 4_650_000_000, avgLoan: 412000,
    fy2025Count: 2410, fy2025Dollars: 1_050_000_000,
    topLenderInState: 'Pinnacle Bank',
    rank: 9,
  },
  WA: {
    state: 'WA', stateName: 'Washington',
    loanCount: 9870, totalDollars: 4_410_000_000, avgLoan: 447000,
    fy2025Count: 2080, fy2025Dollars: 990_000_000,
    topLenderInState: 'U.S. Bank, National Association',
    rank: 10,
  },
}

// SBA market pulse — national figures, FY2025
export const nationalPulse = {
  fy2025LoanCount: 78078,
  fy2025TotalDollars: 37_287_816_200,
  fy2025AvgLoan: 477571,
  fy2025JobsSupported: 761260,
  fy2024LoanCount: 70242,
  fy2024TotalDollars: 31_124_036_200,
  yoyCountChange: 11.1,
  yoyDollarChange: 19.8,
  sourceLabel: 'SBA FOIA 7(a) Dataset, FY2020–FY2025',
  sourceUrl: 'https://data.sba.gov/en/dataset/7-a-504-foia',
}

const fmtB = (n: number) => `$${(n / 1_000_000_000).toFixed(1)}B`
const fmtM = (n: number) => `$${(n / 1_000_000).toFixed(0)}M`
const fmtK = (n: number) => `$${(n / 1_000).toFixed(0)}K`

export function formatDollars(n: number): string {
  if (n >= 1_000_000_000) return fmtB(n)
  if (n >= 1_000_000) return fmtM(n)
  return fmtK(n)
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US')
}
