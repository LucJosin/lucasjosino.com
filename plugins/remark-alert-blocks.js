import { visit } from 'unist-util-visit';

export default function remarkAlertBlocks() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name === 'alert') {
        const data = node.data || (node.data = {});

        data.hName = 'div';
        data.hProperties = {
          className: [
            'remark-alert-blocks',
            `remark-alert-${node.attributes?.type}`,
            node.attributes?.className,
          ],
          id: node.attributes?.id,
        };

        const alertContent = {
          type: 'element',
          data: {
            hName: 'div',
            hProperties: {
              className: [
                'remark-alert-content',
                `remark-alert-${node.attributes?.type}-content`,
              ],
            },
          },
          children: node.children,
        };

        node.children = [alertContent];
      }
    });
  };
}
