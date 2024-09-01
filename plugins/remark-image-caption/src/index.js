import { visit } from 'unist-util-visit';

export default function remarkImageCaption() {
  return function transformer(tree) {
    visit(tree, 'image', (imageNode) => {
      const src = imageNode.url;
      const alt = imageNode.alt;
      const title = imageNode.title || alt || '';

      if (!src.match('\\.(jpeg|jpg|gif|png|webp|svg)$')) return;

      let newNode = null;
      if (alt) {
        newNode = {
          type: 'html',
          value: `<figure class="remark-image-caption">
                    <img src=${src} alt="${alt}" title="${title}" loading="lazy" decoding="async" />
                    <figcaption>
                      ${alt} - 
                      <a 
                        href="${src}" 
                        title="Click to open image in a new tab" 
                        target="_blank">
                        View image in a new tab
                      </a>
                    </figcaption>
                  </figure>`,
        };
        Object.assign(imageNode, newNode);
      }
    });
  };
}
