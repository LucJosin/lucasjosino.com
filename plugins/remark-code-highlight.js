import { visit } from 'unist-util-visit';

const INLINECODE_REGEX =
  /(.+?)\[((?:[a-zA-Z0-9_-]+=["'][^"']*["'](?:\s+[a-zA-Z0-9_-]+=["'][^"']*["'])*)\]$)/;

const ATTR_REGEX = /([a-zA-Z0-9_-]+)=["']([^"']*)["']/g;

export default function remarkCodeHighlight() {
  return function transformer(tree) {
    visit(tree, 'inlineCode', (inlineCodeNode) => {
      const match = inlineCodeNode.value.match(INLINECODE_REGEX);

      if (match) {
        const modifiers = {};
        const text = match[1];
        const attributes = match[2];

        let attrMatch;
        while ((attrMatch = ATTR_REGEX.exec(attributes)) !== null) {
          modifiers[attrMatch[1]] = attrMatch[2];
        }

        let className = '';
        if (modifiers.class) {
          className = modifiers.class;
          delete modifiers.class;
        }

        inlineCodeNode.value = text;
        inlineCodeNode.data = {
          hProperties: {
            style: Object.entries(modifiers).map(
              ([key, value]) => `${key}:${value};`
            ),
            className: ['remark-text-highlight', className],
          },
        };
      }
    });
  };
}
