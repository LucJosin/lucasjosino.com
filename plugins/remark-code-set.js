import { parse } from 'node:querystring';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

const metaDelimiter = ' ';

function createTabs(tabs, children) {
  return {
    type: 'wrapper',
    data: {
      hName: 'div',
      hProperties: {
        id: tabs,
        className: 'remark-code-tabs',
      },
    },
    children: children,
  };
}

function createTab(childNode, group, index) {
  const tabId = `${group}#${index}`;
  const code = remark().parse(childNode).children[0];
  const meta = parse(code.meta ?? '', metaDelimiter);

  return [
    {
      type: 'html',
      value: `<label for="${tabId}" class="remark-code-tab">
        <input
          type="radio"
          id=${tabId}
          name="${group}"
          ${index === 0 ? 'checked' : ''}/>
        <span>${meta.label}</span>
      </label>`,
    },
    {
      type: 'wrapper',
      data: {
        hName: 'div',
        hProperties: {
          className: 'remark-code-content',
        },
      },
      children: [code],
    },
  ];
}

export default function remarkCodeTabs() {
  return function transform(tree) {
    visit(tree, 'code', function (node) {
      if (node.lang !== 'codeset') return;

      const meta = parse(node.meta ?? '', metaDelimiter);
      if (!meta.tabs) return;

      const codeList = node.value.split(':-:');

      const tabs = [];
      for (let i = 0; i < codeList.length; i++) {
        tabs.push(...createTab(codeList[i], meta.tabs, i));
      }

      // Create wrapper
      const newNode = createTabs(meta.tabs, [...tabs]);

      Object.assign(node, newNode);
    });
  };
}
