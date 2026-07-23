import './globals.css'
import { Toaster } from 'sonner'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ux-frontend-hub-1.preview.emergentagent.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Siddhi Gaikwad — UI/UX Designer & Frontend Developer',
    template: '%s · Siddhi Gaikwad',
  },
  description:
    'Portfolio of Siddhi Gaikwad — UI/UX Designer and Frontend Developer designing intuitive digital experiences that people genuinely enjoy using.',
  applicationName: 'Siddhi Gaikwad Portfolio',
  keywords: [
    'Siddhi Gaikwad', 'UI/UX Designer', 'Frontend Developer', 'Product Designer',
    'Portfolio', 'YourGate', 'Flara Jewellery', 'Dashboard Redesign',
    'User Research', 'Prototyping', 'Figma', 'React', 'India',
  ],
  authors: [{ name: 'Siddhi Gaikwad', url: SITE_URL }],
  creator: 'Siddhi Gaikwad',
  publisher: 'Siddhi Gaikwad',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Siddhi Gaikwad',
    title: 'Siddhi Gaikwad — UI/UX Designer & Frontend Developer',
    description:
      'Designing intuitive digital experiences that people genuinely enjoy using. Selected projects: YourGate, Flara Jewellery, Dashboard Redesign.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddhi Gaikwad — UI/UX Designer & Frontend Developer',
    description:
      'Designing intuitive digital experiences that people genuinely enjoy using.',
    creator: '@siddhigaikwad',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  category: 'design',
}

export const viewport = {
  themeColor: '#FCFAF6',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siddhi Gaikwad',
  url: SITE_URL,
  image: `${SITE_URL}/assets/portfolio/me/profile.jpg`,
  jobTitle: 'UI/UX Designer & Frontend Developer',
  description:
    'Final year B.Sc Computer Science student passionate about user psychology, accessibility, research and interface design.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  email: 'mailto:siddhigaikwad850@gmail.com',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'B.Sc Computer Science',
  },
  knowsAbout: [
    'UI Design', 'UX Research', 'Wireframing', 'Prototyping',
    'Interaction Design', 'Frontend Development', 'Design Systems',
    'Figma', 'HTML', 'CSS', 'Bootstrap', 'React',
  ],
  sameAs: [
    'https://www.linkedin.com/in/siddhigaikwad850/',
    'https://www.behance.net/siddhigaikwad10',
    'https://dribbble.com/siddhigaikwad850',
    'https://github.com/Sidd850-ai',
  ],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Siddhi Gaikwad Portfolio',
  url: SITE_URL,
  inLanguage: 'en-US',
  author: { '@type': 'Person', name: 'Siddhi Gaikwad' },
}

const worksLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'YourGate — Society Management App',
    creator: { '@type': 'Person', name: 'Siddhi Gaikwad' },
    about: 'Mobile app for society management with role-based experiences for residents, admins and security personnel.',
    url: `${SITE_URL}/#projects`,
    dateCreated: '2025',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Flara Jewellery — Frontend Website',
    creator: { '@type': 'Person', name: 'Siddhi Gaikwad' },
    about: 'Elegant luxury jewellery website with editorial layout and refined typography.',
    url: `${SITE_URL}/#projects`,
    dateCreated: '2026',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Mojito Dashboard Redesign — SaaS Dashboard',
    creator: { '@type': 'Person', name: 'Siddhi Gaikwad' },
    about: 'Redesigned 6 dashboard screens for Mojito People with improved usability, hierarchy, and information architecture.',
    url: `${SITE_URL}/#projects`,
    dateCreated: '2026',
  },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(worksLd) }}
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}
