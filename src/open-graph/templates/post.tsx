import { getFormatedDate } from '@lib/date';
import type { CollectionEntry } from 'astro:content';

export default async function getPostTemplate(post: CollectionEntry<'blog'>) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        color: '#fff',
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
          justifyContent: 'space-between',
          border: '2px solid #fff',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h1
            style={{
              margin: '1rem 0 0 0',
            }}
          >
            lucasjosino.com
          </h1>
          <span
            style={{
              margin: '0.5rem 0',
              height: '2px',
              width: '50%',
              backgroundColor: '#fff',
            }}
          ></span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              marginBottom: '0.6rem',
              fontWeight: '300',
              fontSize: '1.3em',
            }}
          >
            {post.data.category} • {getFormatedDate(post.data.publishedAt)}
          </span>
          <h1
            style={{
              width: '80%',
              fontSize: '4.2em',
              fontWeight: '500',
              margin: '0',
            }}
          >
            {post.data.title}
          </h1>
          <p
            style={{
              width: '80%',
              fontSize: '2.4em',
              fontWeight: '300',
              overflow: 'hidden',
            }}
          >
            {post.data.description}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '1.2em',
            fontWeight: '300',
          }}
        >
          {post.data.tags.map((item) => {
            return <span>#{item}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
