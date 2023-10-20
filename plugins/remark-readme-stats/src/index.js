import { visit } from 'unist-util-visit';

const API = 'https://github-readme-stats.vercel.app/api/pin';

const defaultOptions = {
  theme: 'default',
  borderRadius: '4.5',
  darkBgColor: '000101',
  lightBgColor: 'fffefe',
  darkBorderColor: 'fff',
  lightBorderColor: '000',
  darkTextColor: 'fff',
  lightTextColor: '000',
  darkIconColor: 'fff',
  lightIconColor: '000',
};

export default function remarkReadmeStats(options) {
  options = { ...defaultOptions, ...options };
  return function transformer(tree) {
    visit(tree, 'paragraph', (paragraphNode) => {
      visit(paragraphNode, 'text', (textNode, _, parent) => {
        if (textNode.value.startsWith('!!!ref:repo ')) {
          textNode.value = textNode.value.replace('!!!ref:repo ', '');

          const params = textNode.value.split('/');
          const user = params[0];
          const repo = params[1];

          const darkUrl =
            `${API}?` +
            `username=${user}&` +
            `repo=${repo}&` +
            `bg_color=${options.darkBgColor}&` +
            `border_radius=${options.borderRadius}&` +
            `border_color=${options.darkBorderColor}&` +
            `title_color=${options.darkTextColor}&` +
            `text_color=${options.darkTextColor}&` +
            `theme=${options.theme}&` +
            `icon_color=${options.darkIconColor}`;

          const lightUrl =
            `${API}?` +
            `username=${user}&` +
            `repo=${repo}&` +
            `bg_color=${options.lightBgColor}&` +
            `border_radius=${options.borderRadius}&` +
            `border_color=${options.lightBorderColor}&` +
            `title_color=${options.lightTextColor}&` +
            `text_color=${options.lightTextColor}&` +
            `theme=${options.theme}&` +
            `icon_color=${options.lightIconColor}`;

          parent.children = [
            {
              type: 'html',
              value: `<div class="remark-readme-stats">
                <a href="https://github.com/${user}/${repo}" 
                  target="_blank" 
                  class="display:block;cursor:pointer;height:100%" 
                  rel="noopener noreferrer"
                  title="GitHub repository '${repo}' of '${user}'"
                  loading="lazy"
                >
                  <embed src="${darkUrl}" class="remark-readme-stats-dark" />
                  <embed src="${lightUrl}" class="remark-readme-stats-light" />
                </a>
              </div>`,
            },
          ];
        }
      });
    });
  };
}
