import { listenToBackToTop, showHideBackToTopButton } from './back-to-top';

const shareButton = document.querySelector('#share-icon') as HTMLElement;
const shareButtonText = document.querySelector('#share-title') as HTMLElement;

const progressBar = document.querySelector('.progress-bar') as HTMLElement;

window.onload = () => {
  listenToBackToTop();
  listenToOnShareClick();
  listenToGallery();
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

function listenToGallery() {
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const activeImg = gallery.querySelector(
      '.gallery-active-img'
    ) as HTMLImageElement;
    const thumbs = Array.from(gallery.querySelectorAll('.thumb'));
    let current = 0;

    thumbs.forEach((t) => t.classList.remove('medium-zoom-image'));

    function show(index: number) {
      if (index < 0 || index >= thumbs.length) return;
      current = index;

      const thumb = thumbs[index] as HTMLImageElement;

      activeImg.src = thumb.src;
      activeImg.alt = thumb.alt;

      thumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');

      // Update caption and link
      const figure = activeImg.closest('figure');
      if (figure) {
        const caption = figure.querySelector('figcaption');
        const link = caption?.querySelector('a');

        if (caption && link) {
          caption.childNodes[0].textContent = thumb.alt + ' – ';
          link.textContent = 'View image in a new tab';
          link.setAttribute('href', thumb.src);
          link.setAttribute('title', 'Click to open image in a new tab');
        }
      }
    }

    const prevButton = gallery.querySelector('.gallery-prev');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        show((current - 1 + thumbs.length) % thumbs.length);
      });
    }

    const nextButton = gallery.querySelector('.gallery-next');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        show((current + 1) % thumbs.length);
      });
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => show(idx));
    });

    show(0);
  });
}
