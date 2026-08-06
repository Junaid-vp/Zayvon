import { ImageResponse } from 'next/og';

export const alt = 'ZAYVON Digital Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030303',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 140, fontWeight: 800, letterSpacing: '-0.05em', marginBottom: 20 }}>ZAYVON</div>
        <div style={{ fontSize: 32, fontWeight: 300, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          Digital Studio
        </div>
      </div>
    ),
    { ...size }
  );
}
