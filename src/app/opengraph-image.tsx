import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const runtime = 'edge'
export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 0% 110%, rgba(123, 92, 245, 0.3) 0%, transparent 55%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
          <div style={{ color: '#7B5CF5', fontSize: '18px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            AI-Powered Compliance
          </div>
          <div style={{ color: '#ffffff', fontSize: '72px', fontWeight: 800, lineHeight: 1.05 }}>
            {SITE_NAME}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', fontWeight: 300, maxWidth: '800px', lineHeight: 1.5 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size
  )
}
