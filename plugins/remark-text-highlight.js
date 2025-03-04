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
          const effect = attributes.effect || '';
          const customStyle = attributes.style || '';

          let prefixedEffect = '';
          effect.split(' ').forEach((e) => {
            if (e) {
              prefixedEffect += `__${e} `;
            }
          });

          const style = `color: ${color}; background-color: ${bgColor}; ${customStyle}`;
          node.type = 'html';
          node.value = `<mark class="remark-text-highlight ${classes} ${prefixedEffect}" ${id ? `id="${id}"` : ''} style="${style}">${node.children
            .map((child) => child.value)
            .join('')}</mark>`;
        }
      }
    });
  };
}
