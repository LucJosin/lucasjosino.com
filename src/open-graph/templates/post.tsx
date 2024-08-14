import type { CollectionEntry } from 'astro:content';

export default async function getPostTemplate(post: CollectionEntry<'blog'>) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: `linear-gradient(to bottom right, ${post.data.color} 5%, #111 30%)`,
        position: 'relative'
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundImage: `radial-gradient(circle at 25px 25px, ${post.data.color} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${post.data.color} 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
          opacity: '0.6',
          position: 'absolute',
        }}
      >
      </div>
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
          position: 'relative'
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
          fontWeight: 'bold',
          fontSize: '1.2em',
          position: 'absolute',
          bottom: '0',
          padding: '2rem'
        }}
      >
        {post.data.language === 'en' ? '~/lucasjosino.com/blog' : `~/lucasjosino.com/${post.data.language}/blog`}
      </span>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '1.6em',
          position: 'absolute',
          top: '0',
          padding: '2rem'
        }}
      >
          {post.data.category.toUpperCase()}
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
              fontSize: '3.5em',
              fontWeight: 'bold',
              margin: '0',
            }}
          >
            {post.data.title}
          </h1>
        </div>
      </div>
    </div>
  </div>
  );
}
