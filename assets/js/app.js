/**
 * app.js - Main Application Entry Point
 * Fantasy Book E-Commerce
 * Handles: Global initialization, page detection
 */

/* ============================================
   APPLICATION INITIALIZATION
   ============================================ */

/**
 * Initialize application
 */
function initApp() {
  // Detect current page and initialize accordingly
  const currentPage = detectCurrentPage();

  console.log(`Fantasy Books E-Commerce initialized on: ${currentPage}`);

  // Global initialization
  initializeData(); // Ensure sample data is loaded
  updateCartBadge(); // Update cart badge on all pages

  // Page-specific initialization is handled by individual JS files
}

/**
 * Detect current page based on URL or DOM elements
 * @returns {string} Page name
 */
function detectCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes('cart')) return 'cart';
  if (path.includes('checkout')) return 'checkout';
  if (path.includes('dashboard')) return 'dashboard';

  // Default to landing page
  return 'landing';
}

/* ============================================
   GLOBAL EVENT HANDLERS
   ============================================ */

/**
 * Handle storage changes (for multi-tab sync)
 */
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEYS.CART) {
    updateCartBadge();
  }
});

/* ============================================
   INITIALIZE ON LOAD
   ============================================ */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
