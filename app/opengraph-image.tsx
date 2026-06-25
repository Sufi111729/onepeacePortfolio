import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

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
          justifyContent: 'center',
          background: '#070707',
          color: '#F8FAFC',
          padding: '72px',
          fontFamily: 'Arial',
          border: '1px solid #242424',
        }}
      >
        <div style={{ color: '#E11D2E', fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' }}>
          Muhammad Sufiyan
        </div>
        <div style={{ marginTop: 28, fontSize: 72, fontWeight: 900, lineHeight: 1.05 }}>
          Full Stack Developer
        </div>
        <div style={{ fontSize: 66, fontWeight: 900, lineHeight: 1.05, color: '#E11D2E' }}>
          AI Web App Developer
        </div>
        <div style={{ marginTop: 38, display: 'flex', gap: 18, fontSize: 30, color: '#A1A1AA' }}>
          <span>Java</span>
          <span>|</span>
          <span>Spring Boot</span>
          <span>|</span>
          <span>React</span>
          <span>|</span>
          <span>AI APIs</span>
        </div>
      </div>
    ),
    size,
  );
}
