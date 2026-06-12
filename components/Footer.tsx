import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">Bridgit</Link>
            <p>Chicago-based SBA loan brokerage, licensed nationwide. We match borrowers with the right lenders — faster, with better terms, and a higher certainty of close. 100% free for borrowers.</p>
          </div>
          <div className="footer-col">
            <h4>Loan Types</h4>
            <ul>
              <li><Link href="/sba-express">SBA Express Loans</Link></li>
              <li><Link href="/working-capital">Working Capital</Link></li>
              <li><Link href="/business-acquisition">Business Acquisition</Link></li>
              <li><Link href="/#services">Partnership Buyouts</Link></li>
              <li><Link href="/#services">Commercial Real Estate</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/best-sba-lenders">Best SBA Lenders</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/#how">How It Works</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><Link href="/#contact">Free Consultation</Link></li>
              <li><a href="mailto:info@bridgitfunding.com">info@bridgitfunding.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bridgit Funding. All rights reserved.</p>
          <p>SBA loans subject to credit approval. Bridgit is a loan broker, not a lender.</p>
        </div>
      </div>
    </footer>
  )
}
