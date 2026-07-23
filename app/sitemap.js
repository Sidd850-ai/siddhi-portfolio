export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://ux-frontend-hub-1.preview.emergentagent.com'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#services`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
