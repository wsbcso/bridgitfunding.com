import { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'
import { loanTypes, industries } from '@/lib/locationData'
import { neighborhoodsByCitySlug } from '@/lib/neighborhoods'

const BASE = 'https://bridgitfunding.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/business-acquisition`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/working-capital`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/sba-express`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/best-sba-lenders`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/sba-loans`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ]

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE}/sba-loans/${city.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // City + loan type pages
  const cityLoanTypePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    loanTypes.map((lt) => ({
      url: `${BASE}/sba-loans/${city.slug}/${lt.slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    }))
  )

  // City + loan type + industry pages
  const comboPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    loanTypes.flatMap((lt) =>
      industries.map((ind) => ({
        url: `${BASE}/sba-loans/${city.slug}/${lt.slug}/${ind.slug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.6,
      }))
    )
  )

  // Neighborhood pages
  const neighborhoodPages: MetadataRoute.Sitemap = Object.entries(neighborhoodsByCitySlug).flatMap(
    ([citySlug, hoods]) =>
      hoods.map((hood) => ({
        url: `${BASE}/sba-loans/${citySlug}/neighborhoods/${hood.slug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.65,
      }))
  )

  return [...staticPages, ...cityPages, ...cityLoanTypePages, ...comboPages, ...neighborhoodPages]
}
