import type { ReactNode } from 'react';

export default function noteRender(options: Record<string, string>): ReactNode {
  const { title, language, tags } = options;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: `linear-gradient(to bottom right, #555 5%, #111 30%)`,
        position: 'relative',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundImage: `radial-gradient(circle at 25px 25px, #555 2%, transparent 0%), radial-gradient(circle at 75px 75px, #555 2%, transparent 0%)`,
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
              {tags.toUpperCase()}
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
            <h3>
              {language === 'en'
                ? '~/lucasjosino.com/notes'
                : `~/lucasjosino.com/${language}/notes`}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
