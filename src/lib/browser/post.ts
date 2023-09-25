const shareButton = document.querySelector('#share') as HTMLElement;
const shareButtonText = document.querySelector('#share-title') as HTMLElement;

const backButton = document.querySelector('.back-to-top') as HTMLLinkElement;

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
  console.log(pageOffset);

  pageOffset > 900
    ? backButton.classList.add('show')
    : backButton.classList.remove('show');
}

/**
 * Copy post permalink on button click.
 */
function listenToOnShareClick() {
  shareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const value = shareButton.getAttribute('href')!;
    await navigator.clipboard.writeText(value);

    shareButtonText.innerText = 'Copied!';
    setTimeout(() => {
      shareButtonText.innerText = 'Share';
    }, 2000);
  });
}
