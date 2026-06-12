'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/sba-express', label: 'SBA Express' },
  { href: '/working-capital', label: 'Working Capital' },
  { href: '/business-acquisition', label: 'Acquisitions' },
  { href: '/best-sba-lenders', label: 'Best Lenders' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>Bridgit</Link>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>
        <ul>
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
          <li><Link href="/#contact" onClick={() => setOpen(false)}>Get Started Free</Link></li>
        </ul>
      </div>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">Bridgit</Link>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={pathname === l.href ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="nav-cta">Get Started Free</Link>
            </li>
          </ul>
          <button className="hamburger" onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  )
}
