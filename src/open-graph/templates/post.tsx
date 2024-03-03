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
        padding: '2.5rem',
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
          justifyContent: 'center',
          border: '2px solid #fff',
          padding: '2.5rem',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            position: 'absolute',
            top: '2rem',
          }}
        >
          <h1>lucasjosino.com</h1>
          <span
            style={{
              margin: '0.8rem 0',
              height: '2px',
              width: '70%',
              backgroundColor: '#fff',
            }}
          ></span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3.5rem',
          }}
        >
          <span
            style={{
              margin: '1.2rem',
              fontWeight: '300',
              fontSize: '1.6em',
            }}
          >
            {post.data.category} • {getFormatedDate(post.data.publishedAt)}
          </span>
          <h1
            style={{
              width: '90%',
              fontSize: '3.5em',
              fontWeight: '500',
              margin: '0',
            }}
          >
            {post.data.title}
          </h1>
          <p
            style={{
              width: '90%',
              fontSize: '2.5em',
              fontWeight: '300',
              overflow: 'hidden',
            }}
          >
            {post.data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
