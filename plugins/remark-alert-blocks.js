import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';

const alerts = {
  '!!!info': 'info',
  '!!!note': 'note',
  '!!!tip': 'tip',
  '!!!issue': 'issue',
  '!!!success': 'success',
  '!!!solution': 'solution',
  '!!!check': 'check',
  '!!!complete': 'complete',
  '!!!warning': 'warning',
  '!!!error': 'error',
  '!!!danger': 'danger',
};

const INFO_REGEX = '!!!(?:.*?)(?:\\{(.*?)(?:#(.*))?\\})?\\s(.*)';

export default function remarkAlertBlocks() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (paragraphNode, _, parent) => {
      visit(paragraphNode, 'text', (textNode) => {
        for (const alert in alerts) {
          if (textNode.value.startsWith(alert)) {
            const data = textNode.value.match(INFO_REGEX);

            const id = data[1];
            const className = data[2];
            const text = data[3];

            textNode.value = text;
            parent.children = parent.children.map((node) => {
              if (is(paragraphNode, node)) {
                return {
                  type: 'wrapper',
                  children: [node],
                  data: {
                    hName: 'div',
                    hProperties: {
                      id,
                      className: [
                        'remark-alerts',
                        `remark-alert-${alerts[alert]}`,
                        className,
                      ],
                    },
                  },
                };
              }

              return node;
            });
          }
        }
      });
    });
  };
}
