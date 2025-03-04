import { visit } from 'unist-util-visit';

export default function remarkTextHighlight() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective') {
        const { name, attributes } = node;

        if (name === 'highlight') {
          const id = attributes.id || '';
          const color = attributes.color || 'inherit';
          const bgColor = attributes.bg || 'inherit';
          const classes = attributes.classes || '';
          const customStyle = attributes.style || '';

          const style = `color: ${color}; background-color: ${bgColor}; ${customStyle}`;
          node.type = 'html';
          node.value = `<mark class="remark-text-highlight ${classes}" ${id ? `id="${id}"` : ''} style="${style}">${node.children
            .map((child) => child.value)
            .join('')}</mark>`;
        }
      }
    });
  };
}
