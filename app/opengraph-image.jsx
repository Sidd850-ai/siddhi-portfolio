import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Siddhi Gaikwad — UI/UX Designer & Frontend Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #FCFAF6 0%, #F4F1EB 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* pastel decorative blobs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: '#FBEFF4' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 300, height: 300, borderRadius: '50%', background: '#EAF4FF' }} />
        <div style={{ position: 'absolute', top: 220, left: 480, width: 180, height: 180, borderRadius: '50%', background: '#EAF8F0', opacity: 0.6 }} />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 2 }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%', background: '#6DBE45'
          }} />
          <div style={{ fontSize: 22, letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase' }}>Portfolio · 2025</div>
        </div>

        {/* Middle */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 2 }}>
          <div style={{ fontSize: 96, lineHeight: 1.02, color: '#1D1D1D', letterSpacing: '-0.03em' }}>
            Siddhi Gaikwad.
          </div>
          <div style={{ fontSize: 44, color: '#666', marginTop: 20, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            Designing intuitive digital experiences
          </div>
          <div style={{ fontSize: 32, color: '#666', marginTop: 8 }}>
            that people genuinely enjoy using.
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <div style={{ fontSize: 26, color: '#1D1D1D' }}>UI/UX Designer · Frontend Developer</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['#EAF4FF','#FBEFF4','#EAF8F0','#F2EEFF'].map((c, i) => (
              <div key={i} style={{ width: 40, height: 40, borderRadius: 12, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
