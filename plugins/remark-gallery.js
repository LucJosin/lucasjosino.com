import { visit } from 'unist-util-visit';

/** @type {import("unified").Plugin<[], import("mdast").Root>} */
export default function remarkGallery() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'gallery') {
        const images = node.children
          .filter((child) => child.type === 'paragraph')
          .flatMap((p) => p.children?.filter((c) => c.type === 'image') || []);

        const imageData = images.map((img, index) => ({
          url: img.url,
          alt: img.alt || `Image ${index + 1}`,
          index,
        }));

        node.data = {
          hName: 'div',
          hProperties: { className: 'gallery-wrapper', 'data-gallery': true },
          hChildren: [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: 'gallery-main' },
              children: [
                {
                  type: 'element',
                  tagName: 'figure',
                  properties: {
                    className: 'gallery-main-figure',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'button',
                      properties: {
                        className: 'gallery-prev',
                        type: 'button',
                        'aria-label': 'Previous image',
                      },
                      children: [{ type: 'text', value: '←' }],
                    },
                    {
                      type: 'element',
                      tagName: 'button',
                      properties: {
                        className: 'gallery-next',
                        type: 'button',
                        'aria-label': 'Next image',
                      },
                      children: [{ type: 'text', value: '→' }],
                    },
                    {
                      type: 'element',
                      tagName: 'img',
                      properties: {
                        className: 'gallery-active-img',
                        src: imageData[0]?.url,
                        alt: imageData[0]?.alt || '',
                        title: imageData[0]?.alt || '',
                      },
                      children: [],
                    },
                    {
                      type: 'element',
                      tagName: 'figcaption',
                      properties: {},
                      children: [
                        { type: 'text', value: imageData[0]?.alt || '' },
                        { type: 'text', value: ' - ' },
                        {
                          type: 'element',
                          tagName: 'a',
                          properties: {
                            href: imageData[0]?.url || '',
                            title: 'Click to open image in a new tab',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          },
                          children: [
                            { type: 'text', value: 'View image in a new tab' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: 'gallery-thumbs' },
              children: imageData.map(({ url, alt, index }) => ({
                type: 'element',
                tagName: 'img',
                properties: {
                  src: url,
                  alt,
                  className:
                    index === 0 ? 'thumb active no-zoom' : 'thumb no-zoom',
                  'data-index': index,
                },
                children: [],
              })),
            },
          ],
        };
      }
    });
  };
}
