/**
 * modal.js - Order Tracking Modal Logic
 * Fantasy Book E-Commerce
 * Handles: Modal open/close, order search, tabs
 */

/* ============================================
   MODAL STATE
   ============================================ */

let currentSearchType = 'phone';
let currentTab = 'current';
let foundOrders = [];

/* ============================================
   MODAL FUNCTIONS
   ============================================ */

/**
 * Open tracking modal
 */
function openTrackingModal() {
  const modal = $('#trackingModal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus search input
  const input = $('#trackingInput');
  if (input) {
    setTimeout(() => input.focus(), 100);
  }

  // Reset state
  resetModalState();
}

/**
 * Close tracking modal
 */
function closeTrackingModal() {
  const modal = $('#trackingModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Reset modal state
 */
function resetModalState() {
  currentSearchType = 'phone';
  currentTab = 'current';
  foundOrders = [];

  // Reset input
  const input = $('#trackingInput');
  if (input) {
    input.value = '';
    input.placeholder = 'Enter your phone number...';
  }

  // Reset toggle buttons
  $$('.search-type-toggle .toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === 'phone');
  });

  // Reset tabs
  $$('.modal-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === 'current');
  });

  // Reset tab content
  $$('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === 'currentOrdersTab');
  });

  // Clear orders lists
  const currentList = $('#currentOrdersList');
  const pastList = $('#pastOrdersList');
  if (currentList) currentList.innerHTML = '';
  if (pastList) pastList.innerHTML = '';

  // Show empty states
  const noCurrentOrders = $('#noCurrentOrders');
  const noPastOrders = $('#noPastOrders');
  if (noCurrentOrders) noCurrentOrders.classList.add('hidden');
  if (noPastOrders) noPastOrders.classList.add('hidden');
}

/* ============================================
   SEARCH FUNCTIONS
   ============================================ */

/**
 * Search for orders
 */
function searchOrders() {
  const input = $('#trackingInput');
  if (!input) return;

  const query = input.value.trim();

  if (!query) {
    showToast('Please enter a search value', 'warning');
    return;
  }

  // Search based on type
  if (currentSearchType === 'phone') {
    foundOrders = getOrdersByPhone(query);
  } else {
    const order = getOrderById(query);
    foundOrders = order ? [order] : [];
  }

  // Render results
  renderOrderResults();

  if (foundOrders.length === 0) {
    showToast('No orders found', 'info');
  } else {
    showToast(`Found ${foundOrders.length} order(s)`, 'success');
  }
}

/**
 * Render order search results
 */
function renderOrderResults() {
  const currentList = $('#currentOrdersList');
  const pastList = $('#pastOrdersList');
  const noCurrentOrders = $('#noCurrentOrders');
  const noPastOrders = $('#noPastOrders');

  // Separate current and past orders
  const currentOrders = foundOrders.filter(order =>
    ['pending', 'processing', 'shipped'].includes(order.status)
  );

  const pastOrders = foundOrders.filter(order =>
    ['delivered', 'cancelled'].includes(order.status)
  );

  // Render current orders
  if (currentList) {
    if (currentOrders.length > 0) {
      currentList.innerHTML = currentOrders.map(order => createOrderCardHTML(order)).join('');
      if (noCurrentOrders) noCurrentOrders.classList.add('hidden');
    } else {
      currentList.innerHTML = '';
      if (noCurrentOrders) noCurrentOrders.classList.remove('hidden');
    }
  }

  // Render past orders
  if (pastList) {
    if (pastOrders.length > 0) {
      pastList.innerHTML = pastOrders.map(order => createOrderCardHTML(order)).join('');
      if (noPastOrders) noPastOrders.classList.add('hidden');
    } else {
      pastList.innerHTML = '';
      if (noPastOrders) noPastOrders.classList.remove('hidden');
    }
  }
}

/**
 * Create order card HTML
 * @param {Object} order - Order object
 * @returns {string} HTML string
 */
function createOrderCardHTML(order) {
  const statusInfo = getStatusInfo(order.status);

  const itemsHTML = order.items.map(item => `
    <div class="order-item">
      <span class="order-item-name">${item.title}</span>
      <span class="order-item-qty">x${item.quantity}</span>
      <span class="order-item-price">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  let trackingHTML = '';
  if (order.trackingNumber) {
    trackingHTML = `
      <div class="tracking-info">
        <div class="tracking-label">Tracking Number</div>
        <div class="tracking-number">${order.trackingNumber}</div>
      </div>
    `;
  }

  return `
    <div class="order-card">
      <div class="order-header">
        <span class="order-id">${order.id}</span>
        <span class="order-date">${formatDate(order.createdAt)}</span>
      </div>
      <div class="order-items">
        ${itemsHTML}
      </div>
      <div class="order-footer">
        <span class="order-total">${formatPrice(order.total)}</span>
        <div class="order-status">
          <span class="status-dot ${order.status}"></span>
          <span class="status-text ${order.status}">${statusInfo.label}</span>
        </div>
      </div>
      ${trackingHTML}
    </div>
  `;
}

/* ============================================
   EVENT HANDLERS
   ============================================ */

/**
 * Initialize modal event listeners
 */
function initModalEventListeners() {
  // Close button
  const closeBtn = $('#closeModalBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTrackingModal);
  }

  // Click outside to close
  const modal = $('#trackingModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTrackingModal();
      }
    });
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTrackingModal();
    }
  });

  // Search type toggle
  $$('.search-type-toggle .toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.type;
      currentSearchType = type;

      // Update active state
      $$('.search-type-toggle .toggle-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.type === type);
      });

      // Update placeholder
      const input = $('#trackingInput');
      if (input) {
        input.placeholder = type === 'phone'
          ? 'Enter your phone number...'
          : 'Enter your order ID (e.g., ORD-2025-00001)...';
        input.value = '';
        input.focus();
      }
    });
  });

  // Search button
  const searchBtn = $('#searchOrderBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', searchOrders);
  }

  // Enter key to search
  const trackingInput = $('#trackingInput');
  if (trackingInput) {
    trackingInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchOrders();
      }
    });
  }

  // Tab switching
  $$('.modal-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.target.dataset.tab;
      currentTab = tab;

      // Update active tab
      $$('.modal-tabs .tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
      });

      // Show/hide content
      $$('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tab}OrdersTab`);
      });
    });
  });
}

/* ============================================
   INITIALIZE
   ============================================ */

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initModalEventListeners);
}
