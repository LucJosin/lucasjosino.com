import { visit } from 'unist-util-visit';

export default function remarkMention() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective') {
        const { name, attributes } = node;

        if (name === 'mention') {
          let rel = attributes.rel || 'noopener noreferrer';
          let target = attributes.target || '_blank';
          const url = attributes.url;
          const external = attributes.external || true;
          const img = attributes.img;
          const label = node.children?.[0]?.value || '';

          if (!external) {
            target = '_self';
            rel = '';
          }

          if (!url) return;

          const finalImage =
            img ||
            `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;

          node.type = 'html';
          node.value = `<a href="${url}" class="remark-mention" target="${target}" rel="${rel}">
                <img src="${finalImage}" alt="${label}" class="remark-mention-icon" width="16" height="16" />
                <span>${node.children.map((child) => child.value).join('')}</span>
                ${external ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z" /></svg>` : ''}
            </a>`;
        }
      }
    });
  };
}
