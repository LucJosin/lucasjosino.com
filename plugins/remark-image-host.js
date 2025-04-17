import { visit } from 'unist-util-visit';

export default function remarkImageHost(options) {
  const host = options?.host?.replace(/\/+$/, '');

  if (!host) {
    throw new Error("Please provide a 'host' option to remark-image-host");
  }

  return (tree) => {
    visit(tree, 'image', (node) => {
      if (typeof node.url === 'string' && node.url.includes('{{host}}')) {
        node.url = node.url.replace('{{host}}', `https://${host}`);
      }
    });
  };
}
