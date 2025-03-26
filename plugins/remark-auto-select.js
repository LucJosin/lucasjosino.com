import { visit } from 'unist-util-visit';

export default function remarkAutoSelect() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective' && node.name === 'select') {
        node.data = {
          hName: 'strong',
          hProperties: { className: 'auto-select' },
        };
      }
    });
  };
}
