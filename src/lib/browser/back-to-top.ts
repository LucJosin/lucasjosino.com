const backButton = document.querySelector('.back-to-top') as HTMLLinkElement;

/**
 * Go to page top on button click.
 */
export function listenToBackToTop() {
  backButton.addEventListener('click', () => window.scrollTo(0, 0));
}

/**
 * Show or hide 'back to top' button after certain pixels.
 */
export function showHideBackToTopButton() {
  const pageOffset =
    document.documentElement.scrollTop || document.body.scrollTop;

  pageOffset > 900
    ? backButton.classList.add('show')
    : backButton.classList.remove('show');
}
