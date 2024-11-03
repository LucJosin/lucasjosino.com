import { visit } from 'unist-util-visit';

// The remark plugin function
export default function remarkSlider() {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      if (node.children) {
        // Check for a paragraph containing the slider structure
        const children = node.children;
        const hasSliderStart = children[0]?.value?.includes('[remark_slider');
        const hasSliderEnd =
          children[children.length - 1]?.value?.includes('[/remark_slider]');

        if (hasSliderStart && hasSliderEnd) {
          // Extract options from the opening tag [remark_slider]
          const optionsText = children[0].value
            .match(/\[remark_slider(.*?)\]/)?.[1]
            ?.trim();
          const options = parseOptions(optionsText);

          // Extract images and their descriptions from the middle nodes
          const images = children
            .filter(
              (child, index) =>
                index > 0 &&
                index < children.length - 1 &&
                child.type === 'image'
            )
            .map((imgNode) => ({
              src: imgNode.url,
              alt: imgNode.alt,
              title: imgNode.title || imgNode.alt || '',
            }));

          // Replace the paragraph node content with a slider component
          node.type = 'html';
          node.value = generateSliderComponent(images, options);
        }
      }
    });
  };
}

// Helper to parse options from [remark_slider ...]
function parseOptions(optionsText) {
  const options = optionsText.split(' ');
  const parsedOptions = {};
  options.forEach((option) => {
    const [key, value] = option.split('=');
    parsedOptions[key] = value === 'true';
  });

  return parsedOptions;
}

// Generate HTML or JSX string for the slider component with arrows and index display
function generateSliderComponent(images, options) {
  // Convert options into data attributes or props as needed
  const optionAttributes = Object.entries(options)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const imageSlides = images
    .map(
      (
        image,
        index
      ) => `<figure class="remark-slider-caption remark-slider-caption-${index}" data-index="${index}">
                    <img src=${image.src} alt="${image.alt}" title="${image.title}" />
                    <figcaption>
                      ${image.alt} - 
                      <a 
                        href="${image.src}" 
                        title="Click to open image in a new tab" 
                        target="_blank">
                        View image in a new tab
                      </a>
                    </figcaption>
                  </figure>`
    )
    .join('');

  return `
    <div class="remark-slider" ${optionAttributes}>
      <!-- Slides container -->
      <div class="slides">
        ${imageSlides}
      </div>

      <!-- Navigation Arrows -->
      ${
        options.showArrows
          ? `
            <button class="prev" onclick="prevSlide()">⤶</button>
            <button class="next" onclick="nextSlide()">⤷</button>
          `
          : ''
      }

      <!-- Current index display -->
      ${
        options.showImageIndex
          ? `
            <div class="slide-index">
              <span class="current-slide">1</span> / ${images.length}
            </div>
          `
          : ''
      }
    </div>

    <!-- Inline JavaScript for navigation functionality -->
    <script>
      let currentSlide = 0;
      const slides = document.querySelectorAll('.remark-slider .remark-slider-caption');
      const totalSlides = slides.length;
      const currentIndexDisplay = document.querySelector('.current-slide');

      function updateSlides() {
        slides.forEach((slide, index) => {
          slide.style.display = index === currentSlide ? 'block' : 'none';
        });
        if (currentIndexDisplay) {
          currentIndexDisplay.textContent = currentSlide + 1;
        }
      }

      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
      }

      function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
      }

      // Initialize the first slide to be visible
      updateSlides();
    </script>
  `;
}
