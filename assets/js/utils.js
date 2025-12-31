/**
 * utils.js - Utility Functions
 * Fantasy Book E-Commerce
 */

/* ============================================
   PRICE FORMATTING
   ============================================ */

/**
 * Format price to Malaysian Ringgit currency
 * @param {number} price - The price value
 * @returns {string} Formatted price string (e.g., "RM 45.90")
 */
function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'RM 0.00';
  }
  return 'RM ' + price.toFixed(2);
}

/**
 * Format price without currency symbol
 * @param {number} price - The price value
 * @returns {string} Formatted price string (e.g., "45.90")
 */
function formatPriceNumber(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00';
  }
  return price.toFixed(2);
}

/* ============================================
   DATE FORMATTING
   ============================================ */

/**
 * Format date to readable string
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Formatted date string (e.g., "Dec 31, 2025")
 */
function formatDate(dateStr) {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-MY', options);
}

/**
 * Format date with time
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Formatted datetime string (e.g., "Dec 31, 2025, 5:30 PM")
 */
function formatDateTime(dateStr) {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleDateString('en-MY', options);
}

/**
 * Get relative time string
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Relative time (e.g., "2 hours ago", "Yesterday")
 */
function getRelativeTime(dateStr) {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return formatDate(dateStr);
}

/* ============================================
   ORDER ID GENERATION
   ============================================ */

/**
 * Generate unique order ID
 * Format: ORD-YYYY-XXXXX (e.g., ORD-2025-00001)
 * @returns {string} Generated order ID
 */
function generateOrderId() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `ORD-${year}-${random}`;
}

/**
 * Generate unique ID (generic)
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Generated ID
 */
function generateId(prefix = 'ID') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

/* ============================================
   LOCAL STORAGE HELPERS
   ============================================ */

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Loaded data or default value
 */
function loadFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return defaultValue;
  }
}

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing from localStorage:', e);
  }
}

/* ============================================
   VALIDATION HELPERS
   ============================================ */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Malaysian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function isValidPhone(phone) {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // Malaysian phone: starts with 01 and 9-11 digits total, or +60 format
  const phoneRegex = /^(\+?60|0)1[0-9]{8,9}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} True if not empty
 */
function isRequired(value) {
  return value !== null && value !== undefined && value.toString().trim() !== '';
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if meets minimum length
 */
function hasMinLength(value, minLength) {
  return value && value.length >= minLength;
}

/* ============================================
   STRING HELPERS
   ============================================ */

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
function truncateString(str, maxLength) {
  if (!str || str.length <= maxLength) return str || '';
  return str.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/* ============================================
   ARRAY HELPERS
   ============================================ */

/**
 * Search array by multiple fields
 * @param {Array} array - Array to search
 * @param {string} query - Search query
 * @param {Array} fields - Fields to search in
 * @returns {Array} Filtered array
 */
function searchArray(array, query, fields) {
  if (!query || !array || !fields) return array;

  const searchTerm = query.toLowerCase().trim();

  return array.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (value) {
        return value.toString().toLowerCase().includes(searchTerm);
      }
      return false;
    });
  });
}

/**
 * Sort array by field
 * @param {Array} array - Array to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
function sortArray(array, field, direction = 'asc') {
  if (!array || !field) return array;

  return [...array].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];

    // Handle strings
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

/* ============================================
   DOM HELPERS
   ============================================ */

/**
 * Shorthand for querySelector
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null} Found element
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Shorthand for querySelectorAll
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList} Found elements
 */
function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag
 * @param {object} attrs - Attributes object
 * @param {string|Element|Array} children - Child content
 * @returns {Element} Created element
 */
function createElement(tag, attrs = {}, children = null) {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
          element.appendChild(child);
        }
      });
    } else if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof Element) {
      element.appendChild(children);
    }
  }

  return element;
}

/* ============================================
   NUMBER HELPERS
   ============================================ */

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculate total from array of items with price and quantity
 * @param {Array} items - Array of items with price and quantity
 * @returns {number} Total amount
 */
function calculateTotal(items) {
  if (!items || !Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);
}

/* ============================================
   STATUS HELPERS
   ============================================ */

/**
 * Get status display info
 * @param {string} status - Order status
 * @returns {object} Status display info (label, color, badge class)
 */
function getStatusInfo(status) {
  const statusMap = {
    pending: {
      label: 'Pending',
      color: 'var(--color-pending)',
      badgeClass: 'badge-pending',
      icon: '⏳'
    },
    processing: {
      label: 'Processing',
      color: 'var(--color-processing)',
      badgeClass: 'badge-processing',
      icon: '🔄'
    },
    shipped: {
      label: 'Shipped',
      color: 'var(--color-shipped)',
      badgeClass: 'badge-shipped',
      icon: '📦'
    },
    delivered: {
      label: 'Delivered',
      color: 'var(--color-delivered)',
      badgeClass: 'badge-delivered',
      icon: '✅'
    },
    cancelled: {
      label: 'Cancelled',
      color: 'var(--color-cancelled)',
      badgeClass: 'badge-cancelled',
      icon: '❌'
    }
  };

  return statusMap[status] || statusMap.pending;
}

/**
 * Check if order is in current (active) state
 * @param {string} status - Order status
 * @returns {boolean} True if order is current/active
 */
function isCurrentOrder(status) {
  const currentStatuses = ['pending', 'processing', 'shipped'];
  return currentStatuses.includes(status);
}

/**
 * Check if order is in past (completed) state
 * @param {string} status - Order status
 * @returns {boolean} True if order is past/completed
 */
function isPastOrder(status) {
  const pastStatuses = ['delivered', 'cancelled'];
  return pastStatuses.includes(status);
}

/* ============================================
   DEBOUNCE & THROTTLE
   ============================================ */

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* ============================================
   EXPORT (if using modules)
   ============================================ */

// For use with script tags (global scope)
// All functions are already in global scope

// For potential future module use:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPrice,
    formatPriceNumber,
    formatDate,
    formatDateTime,
    getRelativeTime,
    generateOrderId,
    generateId,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    isValidEmail,
    isValidPhone,
    isRequired,
    hasMinLength,
    truncateString,
    capitalize,
    toTitleCase,
    searchArray,
    sortArray,
    $,
    $$,
    createElement,
    clamp,
    calculateTotal,
    getStatusInfo,
    isCurrentOrder,
    isPastOrder,
    debounce,
    throttle
  };
}
