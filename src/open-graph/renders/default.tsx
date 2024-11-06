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
          padding: '2.5rem',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            border: '2px solid #fff',
            padding: '0 6rem',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <h3
              style={{
                border: '1.5px solid #fff',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
              }}
            >
              {top}
            </h3>
            <div
              style={{
                height: '2px',
                flex: '1',
                backgroundColor: 'white',
              }}
            ></div>
          </div>
          <h1
            style={{
              fontSize: '3.5em',
            }}
          >
            {title}
          </h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2em',
            }}
          >
            <h3>{`~/lucasjosino.com/${slug}`}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
