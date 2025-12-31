/**
 * landing.js - Landing Page Logic
 * Fantasy Book E-Commerce
 * Handles: Book rendering, search, filtering, sorting
 */

/* ============================================
   STATE
   ============================================ */

let currentBooks = [];
let currentGenreFilter = '';
let currentSortOption = 'title-asc';
let currentSearchQuery = '';

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize landing page
 */
function initLandingPage() {
  // Load all books
  currentBooks = getAllBooks();

  // Populate genre filter
  populateGenreFilter();

  // Render books
  renderBooks();

  // Setup event listeners
  setupLandingEventListeners();

  // Update cart badge
  updateCartBadge();
}

/* ============================================
   RENDER FUNCTIONS
   ============================================ */

/**
 * Render books to the grid
 */
function renderBooks() {
  const booksGrid = $('#booksGrid');
  const emptyState = $('#emptyState');
  const bookCount = $('#bookCount');

  if (!booksGrid) return;

  // Apply filters and sorting
  let filteredBooks = filterBooks(currentBooks);
  filteredBooks = sortBooks(filteredBooks);

  // Update book count
  if (bookCount) {
    bookCount.textContent = `${filteredBooks.length} Book${filteredBooks.length !== 1 ? 's' : ''}`;
  }

  // Check if empty
  if (filteredBooks.length === 0) {
    booksGrid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  // Render book cards
  booksGrid.innerHTML = filteredBooks.map(book => createBookCardHTML(book)).join('');

  // Add event listeners to add-to-cart buttons
  $$('.add-to-cart-btn', booksGrid).forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
  });
}

/**
 * Create HTML for a book card
 * @param {Object} book - Book object
 * @returns {string} HTML string
 */
function createBookCardHTML(book) {
  const stockStatus = getStockStatus(book.stock);

  return `
    <article class="book-card" data-book-id="${book.id}">
      <div class="book-card-image" style="background-image: url('${book.image}');">
      </div>
      <div class="book-card-body">
        <span class="book-card-genre">${book.genre}</span>
        <h3 class="book-card-title">${book.title}</h3>
        <p class="book-card-author">by ${book.author}</p>
        <p class="book-card-description">${book.description}</p>
        <div class="book-card-footer">
          <span class="book-card-price">${formatPrice(book.price)}</span>
          <span class="book-card-rating">
            <span class="star">&#9733;</span>
            ${book.rating} (${book.reviews})
          </span>
        </div>
      </div>
      <div class="book-card-actions">
        <button
          class="btn btn-primary add-to-cart-btn"
          data-book-id="${book.id}"
          ${book.stock === 0 ? 'disabled' : ''}
        >
          ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <span class="stock-badge ${stockStatus.class}">${stockStatus.text}</span>
      </div>
    </article>
  `;
}

/**
 * Get stock status display
 * @param {number} stock - Stock quantity
 * @returns {Object} Status object with text and class
 */
function getStockStatus(stock) {
  if (stock === 0) {
    return { text: 'Out of Stock', class: 'out-of-stock' };
  } else if (stock <= 10) {
    return { text: `Only ${stock} left`, class: 'low-stock' };
  } else {
    return { text: `${stock} in stock`, class: '' };
  }
}

/**
 * Populate genre filter dropdown
 */
function populateGenreFilter() {
  const genreFilter = $('#genreFilter');
  if (!genreFilter) return;

  const genres = getAllGenres();

  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

/* ============================================
   FILTER & SORT FUNCTIONS
   ============================================ */

/**
 * Filter books based on current filters
 * @param {Array} books - Books array
 * @returns {Array} Filtered books
 */
function filterBooks(books) {
  let filtered = [...books];

  // Apply search filter
  if (currentSearchQuery) {
    const query = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  }

  // Apply genre filter
  if (currentGenreFilter) {
    filtered = filtered.filter(book => book.genre === currentGenreFilter);
  }

  return filtered;
}

/**
 * Sort books based on current sort option
 * @param {Array} books - Books array
 * @returns {Array} Sorted books
 */
function sortBooks(books) {
  const sorted = [...books];

  switch (currentSortOption) {
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return sorted;
}

/**
 * Clear all filters
 */
function clearFilters() {
  currentSearchQuery = '';
  currentGenreFilter = '';
  currentSortOption = 'title-asc';

  const searchInput = $('#searchInput');
  const genreFilter = $('#genreFilter');
  const sortFilter = $('#sortFilter');

  if (searchInput) searchInput.value = '';
  if (genreFilter) genreFilter.value = '';
  if (sortFilter) sortFilter.value = 'title-asc';

  currentBooks = getAllBooks();
  renderBooks();
}

/* ============================================
   EVENT HANDLERS
   ============================================ */

/**
 * Setup event listeners for landing page
 */
function setupLandingEventListeners() {
  // Search input
  const searchInput = $('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }

  // Genre filter
  const genreFilter = $('#genreFilter');
  if (genreFilter) {
    genreFilter.addEventListener('change', handleGenreFilter);
  }

  // Sort filter
  const sortFilter = $('#sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', handleSortFilter);
  }

  // Clear filters button
  const clearFiltersBtn = $('#clearFiltersBtn');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }

  // Track order button (header)
  const trackOrderBtn = $('#trackOrderBtn');
  if (trackOrderBtn) {
    trackOrderBtn.addEventListener('click', openTrackingModal);
  }

  // Track order link (footer)
  const footerTrackOrder = $('#footerTrackOrder');
  if (footerTrackOrder) {
    footerTrackOrder.addEventListener('click', (e) => {
      e.preventDefault();
      openTrackingModal();
    });
  }
}

/**
 * Handle search input
 * @param {Event} event - Input event
 */
function handleSearch(event) {
  currentSearchQuery = event.target.value.trim();
  renderBooks();
}

/**
 * Handle genre filter change
 * @param {Event} event - Change event
 */
function handleGenreFilter(event) {
  currentGenreFilter = event.target.value;
  renderBooks();
}

/**
 * Handle sort filter change
 * @param {Event} event - Change event
 */
function handleSortFilter(event) {
  currentSortOption = event.target.value;
  renderBooks();
}

/**
 * Handle add to cart button click
 * @param {Event} event - Click event
 */
function handleAddToCart(event) {
  const btn = event.currentTarget;
  const bookId = parseInt(btn.dataset.bookId);

  if (btn.disabled) return;

  // Add to cart
  addToCart(bookId);

  // Show feedback
  showToast('Book added to cart!', 'success');

  // Update cart badge
  updateCartBadge();

  // Visual feedback on button
  const originalText = btn.textContent;
  btn.textContent = 'Added!';
  btn.classList.add('btn-success');

  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove('btn-success');
  }, 1500);
}

/* ============================================
   CART FUNCTIONS
   ============================================ */

/**
 * Add book to cart
 * @param {number} bookId - Book ID
 */
function addToCart(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const cart = getCart();

  // Check if book already in cart
  const existingItem = cart.find(item => item.bookId === bookId);

  if (existingItem) {
    // Increase quantity
    existingItem.quantity += 1;
  } else {
    // Add new item
    cart.push({
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
  }

  saveCart(cart);
}

/**
 * Update cart badge count
 */
function updateCartBadge() {
  const cartBadge = $('#cartBadge');
  if (!cartBadge) return;

  const count = getCartItemCount();
  cartBadge.textContent = count;
  cartBadge.dataset.count = count;

  // Show/hide badge
  if (count > 0) {
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {number} duration - Duration in ms
 */
function showToast(message, type = 'info', duration = 3000) {
  const container = $('#toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '&#10004;',
    error: '&#10006;',
    warning: '&#9888;',
    info: '&#8505;'
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);

  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));

  // Auto remove
  setTimeout(() => removeToast(toast), duration);
}

/**
 * Remove toast notification
 * @param {Element} toast - Toast element
 */
function removeToast(toast) {
  if (!toast || !toast.parentNode) return;

  toast.classList.add('hiding');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

/* ============================================
   INITIALIZE ON LOAD
   ============================================ */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLandingPage);
} else {
  initLandingPage();
}
