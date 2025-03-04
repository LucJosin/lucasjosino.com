import { visit } from 'unist-util-visit';

const languageColors = {
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Go: '#00ADD8',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  Python: '#3572A5',
  Astro: '#ff5a03',
  Dart: '#00B4AB',
};

/**
 * Remark plugin to process `::github{repo="owner/repo"}` directives into GitHub cards.
 *
 * Modified from: https://github.com/saicaca/fuwari/blob/main/src/plugins/rehype-component-github-card.mjs
 */
export default function remarkGitHubCard(options) {
  if (!options?.languageColors) options = { languageColors };

  return (tree) => {
    visit(tree, 'leafDirective', (node, index, parent) => {
      if (node.name !== 'github') return;

      const repo = node.attributes?.repo;
      if (!repo || !repo.includes('/')) {
        parent.children[index] = {
          type: 'html',
          value: `<div class="hidden">Invalid repository. ("repo" must be "owner/repo")</div>`,
        };
        return;
      }

      const cardUuid = `GC${Math.random().toString(36).slice(-6)}`;
      const html = `
        <a id="${cardUuid}-card" class="card-github fetch-waiting no-styling"
           href="https://github.com/${repo}" target="_blank">
          <div class="gc-titlebar">
            <div class="gc-titlebar-left">
              <div class="gc-owner">
                <div id="${cardUuid}-avatar" class="gc-avatar"></div>
                <div class="gc-user">${repo.split('/')[0]}</div>
              </div>
              <div class="gc-divider">/</div>
              <div class="gc-repo">${repo.split('/')[1]}</div>
              <div id="${cardUuid}-archived" class="gc-archived">Public archive</div>
            </div>
            <div class="github-logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="github-logo-icon">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
              </svg>
            </div>
          </div>
          <div id="${cardUuid}-description" class="gc-description">Waiting for api.github.com...</div>
          <div class="gc-infobar">
            <div class="gc-item gc-item-${cardUuid}-stars">
              <svg class="gc-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.46,13.97L5.82,21L12,17.27Z"></path>
              </svg>
              <span id="${cardUuid}-stars" class="gc-stars">00K</span>
            </div>
            <div class="gc-item gc-item-${cardUuid}-forks">
              <svg class="gc-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19.5 1a3.5 3.5 0 0 0-1 6.855V10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V7.855A3.502 3.502 0 0 0 4.5 1a3.5 3.5 0 0 0-1 6.855V10a3 3 0 0 0 3 3H11v3.145A3.502 3.502 0 0 0 12 23a3.5 3.5 0 0 0 1-6.855V13h4.5a3 3 0 0 0 3-3V7.855A3.502 3.502 0 0 0 19.5 1"/>
              </svg>
              <span id="${cardUuid}-forks" class="gc-forks">0K</span>
            </div>
            <div class="gc-item gc-item-${cardUuid}-license">
              <svg class="gc-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M13 7.83c.85-.3 1.53-.98 1.83-1.83H18l-3 7c0 1.66 1.57 3 3.5 3s3.5-1.34 3.5-3l-3-7h2V4h-6.17c-.41-1.17-1.52-2-2.83-2s-2.42.83-2.83 2H3v2h2l-3 7c0 1.66 1.57 3 3.5 3S9 14.66 9 13L6 6h3.17c.3.85.98 1.53 1.83 1.83V19H2v2h20v-2h-9zM20.37 13h-3.74l1.87-4.36zm-13 0H3.63L5.5 8.64zM12 6c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/>
              </svg>
              <span id="${cardUuid}-license" class="gc-license">MIT</span>
            </div>
            <div class="gc-item gc-item-${cardUuid}-watchers">
              <svg class="gc-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/>
              </svg>
              <span id="${cardUuid}-watchers" class="gc-watchers">0</span>
            </div>
            <div class="gc-item gc-item-${cardUuid}-language">
              <div class="gc-icon" style="background-color: #000000; border-radius: 50%; width: 12px; height: 12px;"></div>
              <span id="${cardUuid}-language" class="gc-language">Waiting...</span>
            </div>
          </div>
          <script type="text/javascript" defer>
            fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" })
              .then(response => response.json())
              .then(data => {
                const languageColors = ${JSON.stringify(options.languageColors)};

                document.getElementById('${cardUuid}-description').innerText = data.description || "Description not set";
                document.getElementById('${cardUuid}-language').innerText = data.language || "--";
                document.querySelector('.gc-item-${cardUuid}-language .gc-icon').style.backgroundColor = languageColors[data.language] || '#000000';
                document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks || 0);
                document.getElementById('${cardUuid}-stars').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count || 0);
                document.getElementById('${cardUuid}-avatar').style.backgroundImage = 'url(' + (data.owner?.avatar_url || '') + ')';
                document.getElementById('${cardUuid}-license').innerText = data.license?.spdx_id || "--";
                document.getElementById('${cardUuid}-watchers').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.watchers_count || 0);
                if (data.archived) document.getElementById('${cardUuid}-archived').classList.add("gc-archived-active");
                document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
              }).catch(err => {
                console.log("Error fetching GitHub card data:", err);
                document.getElementById('${cardUuid}-description').innerText = "Failed to create card: " + err;
                document.getElementById('${cardUuid}-card').classList.add("fetch-error");
              });
          </script>
        </a>
      `;

      parent.children[index] = {
        type: 'html',
        value: html,
      };
    });
  };
}
