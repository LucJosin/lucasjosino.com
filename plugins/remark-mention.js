import { visit } from 'unist-util-visit';

export default function remarkMention() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective') {
        const { name, attributes } = node;

        if (name === 'mention') {
          const url = attributes.url;
          const img = attributes.img;
          const label = node.children?.[0]?.value || '';

          if (!url) return;

          const finalImage =
            img ||
            `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;

          node.type = 'html';
          node.value = `<a href="${url}" class="remark-mention">
                <img src="${finalImage}" alt="${label}" class="remark-mention-icon" width="16" height="16" />
                <span>${node.children.map((child) => child.value).join('')}</span>
            </a>`;
        }
      }
    });
  };
}
