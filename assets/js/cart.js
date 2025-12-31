/**
 * cart.js - Shopping Cart Logic
 * Fantasy Book E-Commerce
 * Handles: Cart management, quantity updates, totals
 */

/* ============================================
   CART PAGE INITIALIZATION
   ============================================ */

/**
 * Initialize cart page
 */
function initCartPage() {
  renderCart();
  setupCartEventListeners();
}

/* ============================================
   RENDER FUNCTIONS
   ============================================ */

/**
 * Render cart items
 */
function renderCart() {
  const cartContainer = $('#cartItems');
  const cartEmpty = $('#cartEmpty');
  const cartContent = $('#cartContent');
  const cartSummary = $('#cartSummary');

  if (!cartContainer) return;

  const cart = getCart();

  // Check if cart is empty
  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.classList.remove('hidden');
    if (cartContent) cartContent.classList.add('hidden');
    if (cartSummary) cartSummary.classList.add('hidden');
    return;
  }

  if (cartEmpty) cartEmpty.classList.add('hidden');
  if (cartContent) cartContent.classList.remove('hidden');
  if (cartSummary) cartSummary.classList.remove('hidden');

  // Render cart items
  cartContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');

  // Update summary
  updateCartSummary();

  // Setup quantity input listeners
  setupQuantityListeners();
}

/**
 * Create HTML for cart item
 * @param {Object} item - Cart item
 * @returns {string} HTML string
 */
function createCartItemHTML(item) {
  const subtotal = item.price * item.quantity;

  return `
    <div class="cart-item" data-book-id="${item.bookId}">
      <div class="cart-item-image" style="background-image: url('${item.image}');">
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-author">by ${item.author}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <div class="quantity-input">
          <button class="quantity-btn qty-decrease" data-book-id="${item.bookId}">-</button>
          <input
            type="number"
            class="quantity-value"
            value="${item.quantity}"
            min="1"
            max="99"
            data-book-id="${item.bookId}"
          >
          <button class="quantity-btn qty-increase" data-book-id="${item.bookId}">+</button>
        </div>
      </div>
      <div class="cart-item-subtotal">
        <span class="subtotal-label">Subtotal</span>
        <span class="subtotal-value">${formatPrice(subtotal)}</span>
      </div>
      <button class="cart-item-remove" data-book-id="${item.bookId}" title="Remove item">
        &times;
      </button>
    </div>
  `;
}

/**
 * Update cart summary
 */
function updateCartSummary() {
  const subtotalEl = $('#summarySubtotal');
  const shippingEl = $('#summaryShipping');
  const totalEl = $('#summaryTotal');
  const itemCountEl = $('#summaryItemCount');

  const cart = getCart();
  const subtotal = getCartTotal();
  const itemCount = getCartItemCount();

  // Free shipping over RM100
  const shipping = subtotal >= 100 ? 0 : 5.00;
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
  if (itemCountEl) itemCountEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  // Update cart badge
  updateCartBadge();
}

/* ============================================
   CART OPERATIONS
   ============================================ */

/**
 * Update item quantity
 * @param {number} bookId - Book ID
 * @param {number} newQuantity - New quantity
 */
function updateItemQuantity(bookId, newQuantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.bookId === bookId);

  if (itemIndex === -1) return;

  newQuantity = clamp(parseInt(newQuantity) || 1, 1, 99);

  cart[itemIndex].quantity = newQuantity;
  saveCart(cart);

  renderCart();
}

/**
 * Remove item from cart
 * @param {number} bookId - Book ID
 */
function removeFromCart(bookId) {
  const cart = getCart();
  const newCart = cart.filter(item => item.bookId !== bookId);

  saveCart(newCart);
  renderCart();

  showToast('Item removed from cart', 'info');
}

/**
 * Increase item quantity
 * @param {number} bookId - Book ID
 */
function increaseQuantity(bookId) {
  const cart = getCart();
  const item = cart.find(item => item.bookId === bookId);

  if (item && item.quantity < 99) {
    updateItemQuantity(bookId, item.quantity + 1);
  }
}

/**
 * Decrease item quantity
 * @param {number} bookId - Book ID
 */
function decreaseQuantity(bookId) {
  const cart = getCart();
  const item = cart.find(item => item.bookId === bookId);

  if (item) {
    if (item.quantity <= 1) {
      // Ask to remove
      if (confirm('Remove this item from cart?')) {
        removeFromCart(bookId);
      }
    } else {
      updateItemQuantity(bookId, item.quantity - 1);
    }
  }
}

/* ============================================
   EVENT HANDLERS
   ============================================ */

/**
 * Setup cart page event listeners
 */
function setupCartEventListeners() {
  // Continue shopping button
  const continueBtn = $('#continueShoppingBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Checkout button
  const checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }

  // Clear cart button
  const clearCartBtn = $('#clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        renderCart();
        showToast('Cart cleared', 'info');
      }
    });
  }
}

/**
 * Setup quantity input listeners
 */
function setupQuantityListeners() {
  // Decrease buttons
  $$('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = parseInt(e.target.dataset.bookId);
      decreaseQuantity(bookId);
    });
  });

  // Increase buttons
  $$('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = parseInt(e.target.dataset.bookId);
      increaseQuantity(bookId);
    });
  });

  // Quantity inputs
  $$('.quantity-value').forEach(input => {
    input.addEventListener('change', (e) => {
      const bookId = parseInt(e.target.dataset.bookId);
      const newQty = parseInt(e.target.value);
      updateItemQuantity(bookId, newQty);
    });
  });

  // Remove buttons
  $$('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = parseInt(e.target.dataset.bookId);
      removeFromCart(bookId);
    });
  });
}

/* ============================================
   CART BADGE UPDATE (Global)
   ============================================ */

/**
 * Update cart badge count (works on all pages)
 */
function updateCartBadge() {
  const cartBadge = $('#cartBadge');
  if (!cartBadge) return;

  const count = getCartItemCount();
  cartBadge.textContent = count;
  cartBadge.dataset.count = count;

  if (count > 0) {
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }
}

/* ============================================
   INITIALIZE
   ============================================ */

// Only initialize on cart page
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on cart page
    if ($('#cartItems')) {
      initCartPage();
    }
  });
}
