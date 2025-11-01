// PlantUML Diagram Renderer
(function() {
  'use strict';

  // PlantUML encoder - converts text to encoded format for URL
  function encode64(data) {
    let r = '';
    for (let i = 0; i < data.length; i += 3) {
      if (i + 2 === data.length) {
        r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
      } else if (i + 1 === data.length) {
        r += append3bytes(data.charCodeAt(i), 0, 0);
      } else {
        r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2));
      }
    }
    return r;
  }

  function append3bytes(b1, b2, b3) {
    const c1 = b1 >> 2;
    const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    const c4 = b3 & 0x3F;
    let r = '';
    r += encode6bit(c1 & 0x3F);
    r += encode6bit(c2 & 0x3F);
    r += encode6bit(c3 & 0x3F);
    r += encode6bit(c4 & 0x3F);
    return r;
  }

  function encode6bit(b) {
    if (b < 10) return String.fromCharCode(48 + b);
    b -= 10;
    if (b < 26) return String.fromCharCode(65 + b);
    b -= 26;
    if (b < 26) return String.fromCharCode(97 + b);
    b -= 26;
    if (b === 0) return '-';
    if (b === 1) return '_';
    return '?';
  }

  function compress(s) {
    // Convert to UTF-8 byte array
    const utf8 = unescape(encodeURIComponent(s));

    // Use deflate compression if pako is available
    if (typeof pako !== 'undefined') {
      const compressed = pako.deflateRaw(utf8, { level: 9 });
      return encode64(String.fromCharCode.apply(null, compressed));
    }

    // Fallback: use simple text encoding without compression
    return encode64(utf8);
  }

  // Initialize PlantUML rendering
  function initPlantUML() {
    // Find all code blocks with plantuml language
    const plantUMLBlocks = document.querySelectorAll('pre code.language-plantuml, pre code.plantuml');

    if (plantUMLBlocks.length === 0) {
      return;
    }

    plantUMLBlocks.forEach(function(codeBlock) {
      const plantUMLCode = codeBlock.textContent || codeBlock.innerText;
      const preElement = codeBlock.parentElement;

      // Create container for diagram
      const container = document.createElement('div');
      container.className = 'plantuml-diagram';

      // Create loading state
      container.innerHTML = `
        <div class="plantuml-loading">
          <div class="plantuml-spinner"></div>
          <p>Loading diagram...</p>
        </div>
      `;

      // Replace the code block with the container
      preElement.parentNode.replaceChild(container, preElement);

      // Encode PlantUML code
      const encoded = compress(plantUMLCode);

      // Create image URL (using PlantUML server)
      const serverUrl = 'https://www.plantuml.com/plantuml/svg/';
      const imageUrl = serverUrl + encoded;

      // Create image element
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'PlantUML Diagram';
      img.className = 'plantuml-image';

      // Handle image load
      img.onload = function() {
        container.innerHTML = '';
        container.appendChild(img);

        // Add view fullscreen button
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'plantuml-fullscreen-btn';
        fullscreenBtn.setAttribute('aria-label', 'View fullscreen');
        fullscreenBtn.innerHTML = `
          
        `;
      };

      // Handle image error
      img.onerror = function() {
        container.innerHTML = `
          <div class="plantuml-error">
            <p>⚠️ Failed to load diagram</p>
            <details>
              <summary>View PlantUML code</summary>
              <pre><code>${escapeHtml(plantUMLCode)}</code></pre>
            </details>
          </div>
        `;
      };
    });
  }

  // Fullscreen modal
  function openFullscreen(imageUrl, code) {
    const modal = document.createElement('div');
    modal.className = 'plantuml-modal';
    modal.innerHTML = `
      <div class="plantuml-modal-overlay"></div>
      <div class="plantuml-modal-content">
        <div class="plantuml-modal-header">
          <h3>PlantUML Diagram</h3>
          <button class="plantuml-modal-close" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="plantuml-modal-body">
          <img src="${imageUrl}" alt="PlantUML Diagram">
        </div>
        <div class="plantuml-modal-footer">
          <button class="plantuml-download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download SVG
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal handlers
    const closeBtn = modal.querySelector('.plantuml-modal-close');
    const overlay = modal.querySelector('.plantuml-modal-overlay');

    function closeModal() {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Download button
    const downloadBtn = modal.querySelector('.plantuml-download-btn');
    downloadBtn.addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'plantuml-diagram.svg';
      link.click();
    });

    // ESC key to close
    function handleEscape(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    }
    document.addEventListener('keydown', handleEscape);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlantUML);
  } else {
    initPlantUML();
  }
})();
