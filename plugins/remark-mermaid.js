// https://github.com/paularmstrong/onerepo/blob/main/docs/src/plugins/remark-mermaid.ts

import { visit } from 'unist-util-visit';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '\n': '%0A',
};

const escapeHtml = (str) => str.replace(/[&<>"']/g, (c) => escapeMap[c] ?? c);

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<div class="mermaid" data-content="${escapeHtml(node.value)}"><p>Loading graph...</p></div>`;
      }
    });
  };
}
