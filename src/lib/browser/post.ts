import { listenToBackToTop, showHideBackToTopButton } from './back-to-top';

const shareButton = document.querySelector('#share-icon') as HTMLElement;
const shareButtonText = document.querySelector('#share-title') as HTMLElement;

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
  shareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const value = shareButton.getAttribute('data-href')!;
    const shareMessage = shareButton.children[0];
    const copyMessage = shareMessage.getAttribute('data-copy')!;
    const copiedMessage = shareMessage.getAttribute('data-copied')!;
    await navigator.clipboard.writeText(value);

    shareButtonText.innerText = copiedMessage;
    setTimeout(() => {
      shareButtonText.innerText = copyMessage;
    }, 2000);
  });
}
