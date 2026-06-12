import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Bridgit Funding | SBA Loan Broker | Nationwide',
  description: 'Chicago-based SBA loan brokerage. Business acquisitions, working capital, and commercial real estate. 50+ lenders. 100% free for borrowers.',
  verification: {
    google: 'NRMLesGj9Qc1rZG_iDsQHA1ZFa5L5hpWJ6PO5Gxzp2k',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
