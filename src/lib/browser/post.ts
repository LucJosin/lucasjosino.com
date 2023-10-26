const shareButtons = document.querySelectorAll(
  '#share'
) as NodeListOf<HTMLElement>;
const shareButtonTexts = document.querySelectorAll(
  '#share-title'
) as NodeListOf<HTMLElement>;

const backButton = document.querySelector('.back-to-top') as HTMLLinkElement;

const progressBar = document.querySelector('.progress-bar') as HTMLElement;

const codes = document.querySelectorAll('.codeset-wrapper');

document.addEventListener('DOMContentLoaded', () => {
  listenToTabClick();
});

window.onload = () => {
  listenToBackToTop();
  listenToOnShareClick();
};

window.onscroll = () => {
  listenToProgressBar();
  showHideBackToTopButton();
};

/**
 * Update progress bar width following the 'scrollY' value.
 */
function listenToProgressBar() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;

  progressBar.style.width = `${progress}%`;
}

/**
 * Go to page top on button click.
 */
function listenToBackToTop() {
  backButton.addEventListener('click', () => window.scrollTo(0, 0));
}

/**
 * Show or hide 'back to top' button after certain pixels.
 */
function showHideBackToTopButton() {
  const pageOffset =
    document.documentElement.scrollTop || document.body.scrollTop;

  pageOffset > 900
    ? backButton.classList.add('show')
    : backButton.classList.remove('show');
}

/**
 * Copy post permalink on button click.
 */
function listenToOnShareClick() {
  for (let i = 0; i < shareButtons.length; i++) {
    const shareButton = shareButtons[i];
    const shareButtonText = shareButtonTexts[i];

    shareButton.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const value = shareButton.getAttribute('data-href')!;
      await navigator.clipboard.writeText(value);

      shareButtonText.innerText = 'Copied!';
      setTimeout(() => {
        shareButtonText.innerText = 'Copy link';
      }, 2000);
    });
  }
}

function listenToTabClick() {
  for (let i = 0; i < codes.length; i++) {
    const navTabs = document.querySelectorAll(
      `#codeset-${i}-nav-tabs`
    ) as NodeListOf<HTMLElement>;

    const tabContent = document.querySelector(
      `#codeset-${i}-tab-content`
    ) as HTMLElement;

    const tabPanes = tabContent.children as HTMLCollectionOf<HTMLElement>;

    // Only show first tab content
    for (let i = 1; i < tabPanes.length; i++) {
      tabPanes[i].style.display = 'none';
    }

    // Loop over all nav tabs of this current 'codeset-wrapper'
    for (const navTab of navTabs) {
      // All tabs from the current 'codeset-wrapper'
      const navItems = navTab.children as HTMLCollectionOf<HTMLElement>;

      for (let x = 0; x < navItems.length; x++) {
        const navItem = navItems[x];

        const lang = navItem.classList[1].replace('nav-item-', '');

        // Listen to click event
        navItem.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          // Select the code from current tab
          const code = document.querySelector(
            `#codeset-${i}-${x}-${lang}`
          ) as HTMLElement;

          // Hide all tab contents
          for (let i = 0; i < tabPanes.length; i++) {
            tabPanes[i].style.display = 'none';
          }

          // Remove all 'active' class from current 'codeset-wrapper' tab items
          for (const pNavItem of navItems) {
            (pNavItem.firstChild! as HTMLElement).classList.remove('active');
          }

          // Enable selected code
          code.style.display = 'block';
          // Set 'active' class to selected tab item
          (navItem.firstChild! as HTMLElement).classList.add('active');
        });
      }
    }
  }
}
