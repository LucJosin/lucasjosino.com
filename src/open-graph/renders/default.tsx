import type { ReactNode } from 'react';

export default function defaultRender(
  options: Record<string, string>
): ReactNode {
  const { top, title, color, slug } = options;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: `linear-gradient(to bottom right, ${color} 5%, #111 30%)`,
        position: 'relative',
        color: '#fff',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundImage: `radial-gradient(circle at 25px 25px, ${color} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${color} 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
          opacity: '0.6',
          position: 'absolute',
        }}
      ></div>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2.5rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            border: '2px solid #fff',
            padding: '2.5rem',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <span
            style={{
              width: '100%',
              fontWeight: 'bold',
              fontSize: '1.6em',
              position: 'absolute',
              top: '0',
              padding: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {top}
          </span>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.3em',
              position: 'absolute',
              bottom: '0',
              padding: '2rem',
            }}
          >
            {`~/lucasjosino.com/${slug}`}
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                width: '90%',
                fontSize: '5em',
                fontWeight: 'bold',
                margin: '0',
              }}
            >
              Lucas Josino
            </h1>
            <h1
              style={{
                width: '90%',
                fontSize: '3em',
                fontWeight: 'bold',
                margin: '0',
                textTransform: 'capitalize',
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
