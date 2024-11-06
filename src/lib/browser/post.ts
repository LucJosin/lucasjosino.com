import { listenToBackToTop, showHideBackToTopButton } from './back-to-top';

const shareButtons = document.querySelectorAll(
  '#share'
) as NodeListOf<HTMLElement>;
const shareButtonTexts = document.querySelectorAll(
  '#share-title'
) as NodeListOf<HTMLElement>;

const progressBar = document.querySelector('.progress-bar') as HTMLElement;

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
