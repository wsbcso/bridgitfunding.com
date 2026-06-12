import Link from 'next/link'

export const metadata = { title: 'Top 100 SBA Lenders of 2026 | Ranked by Volume | Bridgit', description: 'The definitive ranking of SBA 7(a) lenders based on 2025 FOIA data. Ranked by total dollar volume.' }

// =====================================================
// DATA SOURCE — SWAP THIS FOR GOOGLE SHEETS LATER
// When ready:
// 1. Publish your Google Sheet as CSV (File > Share > Publish to web > CSV)
// 2. Move this array to a server component that fetches the CSV URL
// 3. Parse rows into this same shape: { rank, name, volume, loans, avgLoan }
// =====================================================
const LENDERS = [
  {rank:1,name:"Live Oak Banking Company",volume:"$2.7B",loans:2148,avgLoan:"$1.2M"},
  {rank:2,name:"The Huntington National Bank",volume:"$1.9B",loans:6071,avgLoan:"$307K"},
  {rank:3,name:"Newtek Bank",volume:"$1.5B",loans:4056,avgLoan:"$367K"},
  {rank:4,name:"Northeast Bank",volume:"$1.1B",loans:6307,avgLoan:"$174K"},
  {rank:5,name:"Readycap Lending, LLC",volume:"$901M",loans:2430,avgLoan:"$371K"},
  {rank:6,name:"U.S. Bank",volume:"$853M",loans:3138,avgLoan:"$272K"},
  {rank:7,name:"First Internet Bank of Indiana",volume:"$675M",loans:474,avgLoan:"$1.4M"},
  {rank:8,name:"Celtic Bank Corporation",volume:"$552M",loans:1440,avgLoan:"$383K"},
  {rank:9,name:"Byline Bank",volume:"$501M",loans:461,avgLoan:"$1.1M"},
  {rank:10,name:"GBank",volume:"$488M",loans:178,avgLoan:"$2.7M"},
  {rank:11,name:"Wells Fargo",volume:"$479M",loans:1335,avgLoan:"$359K"},
  {rank:12,name:"JPMorgan Chase",volume:"$465M",loans:1471,avgLoan:"$316K"},
  {rank:13,name:"Harvest Small Business Finance, LLC",volume:"$463M",loans:462,avgLoan:"$1.0M"},
  {rank:14,name:"Bank of America",volume:"$453M",loans:753,avgLoan:"$601K"},
  {rank:15,name:"TD Bank",volume:"$423M",loans:2935,avgLoan:"$144K"},
  {rank:16,name:"First Bank of the Lake",volume:"$393M",loans:575,avgLoan:"$683K"},
  {rank:17,name:"Port 51 Lending LLC",volume:"$359M",loans:217,avgLoan:"$1.7M"},
  {rank:18,name:"United Midwest Savings Bank",volume:"$359M",loans:919,avgLoan:"$390K"},
  {rank:19,name:"US Metro Bank",volume:"$352M",loans:172,avgLoan:"$2.0M"},
  {rank:20,name:"Cadence Bank",volume:"$348M",loans:640,avgLoan:"$543K"},
  {rank:21,name:"Bank of Hope",volume:"$332M",loans:391,avgLoan:"$848K"},
  {rank:22,name:"M&T Bank",volume:"$302M",loans:2782,avgLoan:"$109K"},
  {rank:23,name:"Lendistry SBLC, LLC",volume:"$284M",loans:1334,avgLoan:"$213K"},
  {rank:24,name:"Brookline Bank",volume:"$278M",loans:223,avgLoan:"$1.2M"},
  {rank:25,name:"Enterprise Bank & Trust",volume:"$274M",loans:167,avgLoan:"$1.6M"},
  {rank:26,name:"Pathward",volume:"$268M",loans:124,avgLoan:"$2.2M"},
  {rank:27,name:"Zions Bank",volume:"$229M",loans:1168,avgLoan:"$196K"},
  {rank:28,name:"BayFirst National Bank",volume:"$228M",loans:1372,avgLoan:"$166K"},
  {rank:29,name:"Fifth Third Bank",volume:"$220M",loans:281,avgLoan:"$784K"},
  {rank:30,name:"KeyBank",volume:"$215M",loans:661,avgLoan:"$325K"},
  {rank:31,name:"Citizens Bank",volume:"$211M",loans:270,avgLoan:"$782K"},
  {rank:32,name:"Truliant FCU",volume:"$202M",loans:160,avgLoan:"$1.3M"},
  {rank:33,name:"First Financial Bank",volume:"$200M",loans:177,avgLoan:"$1.1M"},
  {rank:34,name:"Old National Bank",volume:"$199M",loans:206,avgLoan:"$964K"},
  {rank:35,name:"Pinnacle Bank",volume:"$197M",loans:159,avgLoan:"$1.2M"},
  {rank:36,name:"Open Bank",volume:"$192M",loans:108,avgLoan:"$1.8M"},
  {rank:37,name:"Hanmi Bank",volume:"$190M",loans:215,avgLoan:"$883K"},
  {rank:38,name:"Metro City Bank",volume:"$187M",loans:102,avgLoan:"$1.8M"},
  {rank:39,name:"Community Bank & Trust-West Georgia",volume:"$180M",loans:107,avgLoan:"$1.7M"},
  {rank:40,name:"Northwest Bank",volume:"$172M",loans:174,avgLoan:"$991K"},
  {rank:41,name:"VelocitySBA, LLC",volume:"$159M",loans:165,avgLoan:"$965K"},
  {rank:42,name:"First National Bank of Pennsylvania",volume:"$153M",loans:160,avgLoan:"$955K"},
  {rank:43,name:"Centerstone SBA Lending, Inc.",volume:"$152M",loans:106,avgLoan:"$1.4M"},
  {rank:44,name:"T Bank",volume:"$148M",loans:85,avgLoan:"$1.7M"},
  {rank:45,name:"First Savings Bank",volume:"$146M",loans:116,avgLoan:"$1.3M"},
  {rank:46,name:"Climate First Bank",volume:"$144M",loans:127,avgLoan:"$1.1M"},
  {rank:47,name:"United Community Bank",volume:"$143M",loans:148,avgLoan:"$965K"},
  {rank:48,name:"Gulf Coast Bank and Trust Company",volume:"$141M",loans:142,avgLoan:"$993K"},
  {rank:49,name:"Dogwood State Bank",volume:"$141M",loans:146,avgLoan:"$963K"},
  {rank:50,name:"PCB Bank",volume:"$134M",loans:118,avgLoan:"$1.1M"},
  {rank:51,name:"The Bancorp Bank",volume:"$131M",loans:111,avgLoan:"$1.2M"},
  {rank:52,name:"Regions Bank",volume:"$131M",loans:160,avgLoan:"$818K"},
  {rank:53,name:"Meridian Bank",volume:"$122M",loans:121,avgLoan:"$1.0M"},
  {rank:54,name:"Commonwealth Business Bank",volume:"$122M",loans:98,avgLoan:"$1.2M"},
  {rank:55,name:"Mission Valley Bank",volume:"$118M",loans:69,avgLoan:"$1.7M"},
  {rank:56,name:"Wilmington Savings Fund Society FSB",volume:"$118M",loans:155,avgLoan:"$760K"},
  {rank:57,name:"Shoreham Bank",volume:"$116M",loans:112,avgLoan:"$1.0M"},
  {rank:58,name:"East West Bank",volume:"$116M",loans:163,avgLoan:"$713K"},
  {rank:59,name:"City National Bank",volume:"$115M",loans:93,avgLoan:"$1.2M"},
  {rank:60,name:"Grasshopper Bank",volume:"$114M",loans:219,avgLoan:"$520K"},
  {rank:61,name:"First Commonwealth Bank",volume:"$114M",loans:195,avgLoan:"$583K"},
  {rank:62,name:"Merchants Bank of Indiana",volume:"$114M",loans:81,avgLoan:"$1.4M"},
  {rank:63,name:"First Citizens Bank",volume:"$111M",loans:111,avgLoan:"$999K"},
  {rank:64,name:"Bank Five Nine",volume:"$111M",loans:166,avgLoan:"$667K"},
  {rank:65,name:"Heritage Bank Inc",volume:"$111M",loans:148,avgLoan:"$748K"},
  {rank:66,name:"Midwest Regional Bank",volume:"$109M",loans:111,avgLoan:"$979K"},
  {rank:67,name:"CenTrust Bank",volume:"$107M",loans:541,avgLoan:"$197K"},
  {rank:68,name:"Milestone Bank",volume:"$105M",loans:62,avgLoan:"$1.7M"},
  {rank:69,name:"Truist Bank",volume:"$105M",loans:72,avgLoan:"$1.5M"},
  {rank:70,name:"Peoples Bank",volume:"$99.7M",loans:105,avgLoan:"$950K"},
  {rank:71,name:"Colony Bank",volume:"$98.9M",loans:215,avgLoan:"$460K"},
  {rank:72,name:"Southwestern National Bank",volume:"$98.2M",loans:61,avgLoan:"$1.6M"},
  {rank:73,name:"Banc of California",volume:"$95.8M",loans:63,avgLoan:"$1.5M"},
  {rank:74,name:"FinWise Bank",volume:"$91.3M",loans:84,avgLoan:"$1.1M"},
  {rank:75,name:"Stone Bank",volume:"$89.8M",loans:260,avgLoan:"$345K"},
  {rank:76,name:"CalPrivate Bank",volume:"$89.3M",loans:72,avgLoan:"$1.2M"},
  {rank:77,name:"First Bank",volume:"$87.7M",loans:90,avgLoan:"$974K"},
  {rank:78,name:"America First FCU",volume:"$87.1M",loans:74,avgLoan:"$1.2M"},
  {rank:79,name:"Hancock Whitney Bank",volume:"$86.4M",loans:109,avgLoan:"$793K"},
  {rank:80,name:"Comerica Bank",volume:"$86.1M",loans:131,avgLoan:"$658K"},
  {rank:81,name:"Wallis Bank",volume:"$85.8M",loans:85,avgLoan:"$1.0M"},
  {rank:82,name:"SouthState Bank",volume:"$85.1M",loans:131,avgLoan:"$650K"},
  {rank:83,name:"Hanover Community Bank",volume:"$83.9M",loans:88,avgLoan:"$953K"},
  {rank:84,name:"PNC Bank",volume:"$83.8M",loans:289,avgLoan:"$290K"},
  {rank:85,name:"OakStar Bank",volume:"$80.0M",loans:110,avgLoan:"$728K"},
  {rank:86,name:"Bankwell Bank",volume:"$78.2M",loans:79,avgLoan:"$990K"},
  {rank:87,name:"Texas Capital Bank",volume:"$78.1M",loans:46,avgLoan:"$1.7M"},
  {rank:88,name:"Columbia Bank",volume:"$75.1M",loans:666,avgLoan:"$113K"},
  {rank:89,name:"HomeTrust Bank",volume:"$72.1M",loans:72,avgLoan:"$1.0M"},
  {rank:90,name:"Fulton Bank",volume:"$70.8M",loans:102,avgLoan:"$694K"},
  {rank:91,name:"United FCU",volume:"$70.7M",loans:53,avgLoan:"$1.3M"},
  {rank:92,name:"Renasant Bank",volume:"$69.9M",loans:57,avgLoan:"$1.2M"},
  {rank:93,name:"FWBank",volume:"$69.6M",loans:63,avgLoan:"$1.1M"},
  {rank:94,name:"First Business Bank",volume:"$66.7M",loans:47,avgLoan:"$1.4M"},
  {rank:95,name:"Mountain America FCU",volume:"$66.6M",loans:224,avgLoan:"$297K"},
  {rank:96,name:"Banner Bank",volume:"$65.9M",loans:238,avgLoan:"$277K"},
  {rank:97,name:"Webster Bank",volume:"$65.5M",loans:175,avgLoan:"$374K"},
  {rank:98,name:"Global One Bank",volume:"$65.2M",loans:30,avgLoan:"$2.2M"},
  {rank:99,name:"Woori America Bank",volume:"$63.9M",loans:80,avgLoan:"$799K"},
  {rank:100,name:"City National Bank of Florida",volume:"$63.7M",loans:89,avgLoan:"$716K"},
]

const medals: Record<number,string> = {1:'🥇',2:'🥈',3:'🥉'}
const rankColors: Record<number,string> = {1:'rank-1',2:'rank-2',3:'rank-3'}

export default function BestLendersPage() {
  return (
    <>
      <section style={{ background: 'var(--dark)', padding: '64px 0 56px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--green-light)', fontSize: '13px', fontWeight: 600, padding: '6px 14px', borderRadius: '100px', marginBottom: '20px' }}>2025 FOIA Data</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px' }}>Top 100 SBA Lenders<br /><span style={{ color: 'var(--green-light)' }}>of 2026.</span></h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: '600px', marginBottom: '40px' }}>The definitive ranking of SBA 7(a) lenders based on 2025 FOIA loan data — ranked by total dollar volume so you can see who's actually funding small businesses.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {[['100','Top Lenders Ranked'],['1,306','Active SBA Lenders'],['$33.8B','Total SBA Loans (2025)'],['68,435','Businesses Funded']].map(([v,l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '26px', fontWeight: 800, color: 'var(--green-light)', marginBottom: '4px' }}>{v}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--green-pale)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--dark)' }}>Need help choosing the right lender?</p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '2px' }}>We match you with the best one for your deal — at no cost.</p>
          </div>
          <Link href="/#contact" className="btn btn-primary">Get Free Lender Matching →</Link>
        </div>
      </div>

      <section>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>Top 100 SBA Lenders by Volume (2025 Data)</h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px' }}>Source: SBA FOIA Data 2025</span>
          </div>
          <table className="lenders-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Lender</th>
                <th>Total Volume</th>
                <th>Loans</th>
                <th>Avg Loan</th>
              </tr>
            </thead>
            <tbody>
              {LENDERS.map(l => (
                <tr key={l.rank}>
                  <td className={`rank-cell ${rankColors[l.rank] || ''}`}>{medals[l.rank] && <span style={{ marginRight: '2px' }}>{medals[l.rank]}</span>}#{l.rank}</td>
                  <td className="lender-name">{l.name}</td>
                  <td className="volume-cell">{l.volume}</td>
                  <td className="loans-cell">{l.loans.toLocaleString()}</td>
                  <td className="avg-cell">{l.avgLoan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ background: 'var(--green)', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '10px' }}>Don't Waste Time Applying to the Wrong Lender.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '24px' }}>We know which banks are actively funding — and which ones are best for your industry and deal size.</p>
          <Link href="/#contact" className="btn btn-white">Start My Application →</Link>
        </div>
      </div>
    </>
  )
}
