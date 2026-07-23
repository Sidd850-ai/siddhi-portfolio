export default function robots() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://ux-frontend-hub-1.preview.emergentagent.com'
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/admin'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
