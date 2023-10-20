import ogs from 'open-graph-scraper';
import { visit } from 'unist-util-visit';

export function getFormatedDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
}

export default function remarkPostReference() {
  return async function transformer(tree) {
    const posts = [];

    visit(tree, 'paragraph', (paragraphNode) => {
      visit(paragraphNode, 'text', async (textNode, _, parent) => {
        if (textNode.value.startsWith('!!!ref')) {
          const linkNode = paragraphNode.children[1];

          posts.push({
            url: linkNode.url,
            node: parent,
          });
        }
      });
    });

    if (!posts.length) {
      return;
    }

    for (const { url, node } of posts) {
      try {
        const og = await ogs({ url: url });
        const { error, result } = og;

        if (error) {
          node.children = [];
          return;
        }

        const {
          ogTitle,
          ogImage,
          ogDescription,
          requestUrl,
          articlePublishedTime,
          articleSection,
        } = result;

        node.children = [
          {
            type: 'html',
            value: `<div class="remark-post-reference">
              <img 
                src=${ogImage[0].url} 
                alt="${ogTitle}" 
                class="remark-post-reference-image"
              />
              <div class="remark-post-reference-content">
              <span class="remark-post-reference-info">
                ${getFormatedDate(articlePublishedTime)}
                ${' • '}
                ${articleSection}
              </span>
              <span class="remark-post-reference-title">${ogTitle}</span>
              <p class="remark-post-reference-desc">${ogDescription}</p>
              <a
                href=${requestUrl}
                target="_self" 
                title="Read more about: ${ogTitle}"
                class="remark-post-reference-link"
              >
                Read more
              </a>
            </div>
          </div>`,
          },
        ];
      } catch (e) {
        return;
      }
    }
  };
}
