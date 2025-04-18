import { visit } from 'unist-util-visit';

export default function remarkImageHost(options) {
  const imageBaseUrl = options?.imageBaseUrl?.replace(/\/+$/, '');

  if (!imageBaseUrl) {
    console.log('[remark-image-host] No host provided. Using default.');
  }

  return (tree) => {
    visit(tree, 'image', (node) => {
      if (
        typeof node.url === 'string' &&
        node.url.includes('{{image_base_url}}')
      ) {
        node.url = node.url.replace('{{image_base_url}}', imageBaseUrl);
      }
    });
  };
}
