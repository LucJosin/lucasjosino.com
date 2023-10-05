import { visit } from 'unist-util-visit';

const HIGHLIGHT_REGEX = '\\{(.*?)((?:#(.*))(?:-(.*)))?\\}';

export default function remarkCodeHighlight() {
  return function transformer(tree) {
    visit(tree, 'inlineCode', (inlineCodeNode) => {
      const match = inlineCodeNode.value.match(HIGHLIGHT_REGEX);

      if (match) {
        // BUG: Regex returns 5 matches, instead of 4
        const className = match[1];
        const bgColor = match[3];
        const textColor = match[4];

        inlineCodeNode.value = inlineCodeNode.value.replace(match[0], '');

        inlineCodeNode.data = {
          hProperties: {
            style: [
              bgColor && `background-color: ${bgColor}; color: ${textColor}`,
            ],
            className: ['remark-text-highlight', className],
          },
        };
      }
    });
  };
}
