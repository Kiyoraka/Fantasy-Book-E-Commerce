/**
 * data.js - Hardcoded Data Store
 * Fantasy Book E-Commerce
 * Contains: Books catalog, Sample orders
 */

/* ============================================
   BOOKS CATALOG (10 Fantasy Books)
   ============================================ */

const books = [
  {
    id: 1,
    title: "The Dragon's Heir",
    author: "Elena Blackwood",
    price: 45.90,
    genre: "Epic Fantasy",
    description: "A young blacksmith discovers she's the last descendant of dragon riders. When ancient dragons awaken from their thousand-year slumber, she must choose between her simple life and her destiny to unite the fractured kingdoms.",
    image: "assets/images/books/dragon-heir.jpg",
    stock: 50,
    pages: 432,
    isbn: "978-1-234567-01-2",
    published: "2024-03-15",
    rating: 4.7,
    reviews: 234
  },
  {
    id: 2,
    title: "Shadow of the Throne",
    author: "Marcus Chen",
    price: 52.00,
    genre: "Dark Fantasy",
    description: "In a kingdom where shadows hold ancient power, a disgraced noble must navigate deadly political intrigue. As darkness spreads from the throne, he discovers that the true enemy has been hiding in plain sight for generations.",
    image: "assets/images/books/shadow-throne.jpg",
    stock: 35,
    pages: 528,
    isbn: "978-1-234567-02-9",
    published: "2024-01-22",
    rating: 4.5,
    reviews: 189
  },
  {
    id: 3,
    title: "The Crystal Mage",
    author: "Sarah Winters",
    price: 38.50,
    genre: "High Fantasy",
    description: "An apprentice mage accidentally shatters a forbidden crystal, releasing magic that was locked away for centuries. Now she must master powers no one has wielded in a thousand years before they consume her realm entirely.",
    image: "assets/images/books/crystal-mage.jpg",
    stock: 42,
    pages: 368,
    isbn: "978-1-234567-03-6",
    published: "2024-05-08",
    rating: 4.8,
    reviews: 312
  },
  {
    id: 4,
    title: "Realm of the Forgotten",
    author: "James Darkhollow",
    price: 49.90,
    genre: "Adventure Fantasy",
    description: "A band of explorers stumbles upon a realm that has been erased from all history books. Within its borders, they find civilizations thought to be myth and secrets that powerful forces will kill to keep hidden.",
    image: "assets/images/books/realm-forgotten.jpg",
    stock: 28,
    pages: 456,
    isbn: "978-1-234567-04-3",
    published: "2023-11-30",
    rating: 4.4,
    reviews: 156
  },
  {
    id: 5,
    title: "The Last Enchanter",
    author: "Lily Thornwood",
    price: 41.00,
    genre: "Romantic Fantasy",
    description: "The final enchanter alive carries the burden of all magic's secrets. When she falls for a warrior sworn to destroy magic, she must choose between a love that could doom her people and a duty that will leave her alone forever.",
    image: "assets/images/books/last-enchanter.jpg",
    stock: 55,
    pages: 392,
    isbn: "978-1-234567-05-0",
    published: "2024-02-14",
    rating: 4.6,
    reviews: 278
  },
  {
    id: 6,
    title: "Blood of the Phoenix",
    author: "Victor Ashborne",
    price: 55.90,
    genre: "Mythic Fantasy",
    description: "A warrior cursed with phoenix blood cannot die, no matter how desperately he wishes for rest. Across centuries of warfare and loss, he searches for the one being who can finally end his immortal suffering.",
    image: "assets/images/books/blood-phoenix.jpg",
    stock: 31,
    pages: 512,
    isbn: "978-1-234567-06-7",
    published: "2023-09-20",
    rating: 4.9,
    reviews: 445
  },
  {
    id: 7,
    title: "Whispers of the Void",
    author: "Diana Nightshade",
    price: 47.50,
    genre: "Cosmic Fantasy",
    description: "Ancient entities from the void between stars begin whispering to a deaf princess. As she learns to interpret their alien language, she realizes they're warning her of a doom that approaches from beyond the sky.",
    image: "assets/images/books/whispers-void.jpg",
    stock: 23,
    pages: 488,
    isbn: "978-1-234567-07-4",
    published: "2024-04-01",
    rating: 4.3,
    reviews: 167
  },
  {
    id: 8,
    title: "The Iron Kingdom",
    author: "Robert Steele",
    price: 43.00,
    genre: "Steampunk Fantasy",
    description: "In a realm where magic and machines wage endless war, a young inventor discovers a way to merge both. But his creation attracts the attention of forces who would use it to tip the balance of power forever.",
    image: "assets/images/books/iron-kingdom.jpg",
    stock: 38,
    pages: 416,
    isbn: "978-1-234567-08-1",
    published: "2023-12-15",
    rating: 4.5,
    reviews: 203
  },
  {
    id: 9,
    title: "Song of the Siren",
    author: "Marina Pearl",
    price: 39.90,
    genre: "Oceanic Fantasy",
    description: "A sailor falls in love with a siren who holds the sea's darkest secret. Together they must dive into the depths where ancient leviathans slumber, seeking the truth about a curse that binds both their peoples.",
    image: "assets/images/books/song-siren.jpg",
    stock: 47,
    pages: 344,
    isbn: "978-1-234567-09-8",
    published: "2024-06-21",
    rating: 4.7,
    reviews: 198
  },
  {
    id: 10,
    title: "The Wanderer's Path",
    author: "Thomas Journeyman",
    price: 36.50,
    genre: "Quest Fantasy",
    description: "A humble mapmaker discovers his maps predict the future. As kingdoms vie to control his gift, he must walk a path between prophecy and free will, learning that some destinations are worth more than any treasure.",
    image: "assets/images/books/wanderer-path.jpg",
    stock: 60,
    pages: 380,
    isbn: "978-1-234567-10-4",
    published: "2024-07-10",
    rating: 4.6,
    reviews: 145
  }
];

/* ============================================
   SAMPLE ORDERS (For Testing)
   ============================================ */

const sampleOrders = [
  {
    id: "ORD-2025-00001",
    customerName: "Ahmad bin Hassan",
    phone: "0123456789",
    email: "ahmad@email.com",
    address: "123 Jalan Bunga Raya, Taman Indah, 50000 Kuala Lumpur",
    items: [
      { bookId: 1, title: "The Dragon's Heir", quantity: 1, price: 45.90 },
      { bookId: 2, title: "Shadow of the Throne", quantity: 2, price: 52.00 }
    ],
    subtotal: 149.90,
    shipping: 0,
    total: 149.90,
    status: "processing",
    paymentMethod: "Online Banking",
    notes: "Please deliver after 6pm",
    createdAt: "2025-12-30T10:30:00",
    updatedAt: "2025-12-30T14:45:00"
  },
  {
    id: "ORD-2025-00002",
    customerName: "Sarah Lim",
    phone: "0187654321",
    email: "sarah.lim@email.com",
    address: "45 Lorong Mawar 3, Taman Bahagia, 47400 Petaling Jaya, Selangor",
    items: [
      { bookId: 3, title: "The Crystal Mage", quantity: 1, price: 38.50 },
      { bookId: 5, title: "The Last Enchanter", quantity: 1, price: 41.00 },
      { bookId: 9, title: "Song of the Siren", quantity: 1, price: 39.90 }
    ],
    subtotal: 119.40,
    shipping: 0,
    total: 119.40,
    status: "pending",
    paymentMethod: "Credit Card",
    notes: "",
    createdAt: "2025-12-31T09:15:00",
    updatedAt: "2025-12-31T09:15:00"
  },
  {
    id: "ORD-2025-00003",
    customerName: "Kumar a/l Rajan",
    phone: "0162345678",
    email: "kumar.rajan@email.com",
    address: "78 Jalan Melati, Taman Sri Sentosa, 81300 Johor Bahru, Johor",
    items: [
      { bookId: 6, title: "Blood of the Phoenix", quantity: 2, price: 55.90 },
      { bookId: 8, title: "The Iron Kingdom", quantity: 1, price: 43.00 }
    ],
    subtotal: 154.80,
    shipping: 0,
    total: 154.80,
    status: "shipped",
    paymentMethod: "E-Wallet",
    notes: "Gift wrap please",
    createdAt: "2025-12-28T16:20:00",
    updatedAt: "2025-12-30T11:30:00",
    trackingNumber: "EMS123456789MY"
  },
  {
    id: "ORD-2025-00004",
    customerName: "Nurul Aisyah",
    phone: "0191234567",
    email: "nurul.aisyah@email.com",
    address: "12 Persiaran Anggerik, Bandar Baru Ampang, 68000 Ampang, Selangor",
    items: [
      { bookId: 4, title: "Realm of the Forgotten", quantity: 1, price: 49.90 }
    ],
    subtotal: 49.90,
    shipping: 5.00,
    total: 54.90,
    status: "delivered",
    paymentMethod: "Cash on Delivery",
    notes: "",
    createdAt: "2025-12-25T14:00:00",
    updatedAt: "2025-12-27T10:15:00",
    deliveredAt: "2025-12-27T10:15:00"
  },
  {
    id: "ORD-2025-00005",
    customerName: "David Tan",
    phone: "0178765432",
    email: "david.tan@email.com",
    address: "56 Jalan Cempaka, Taman Harmoni, 10450 Georgetown, Penang",
    items: [
      { bookId: 7, title: "Whispers of the Void", quantity: 1, price: 47.50 },
      { bookId: 10, title: "The Wanderer's Path", quantity: 2, price: 36.50 }
    ],
    subtotal: 120.50,
    shipping: 0,
    total: 120.50,
    status: "cancelled",
    paymentMethod: "Credit Card",
    notes: "Changed my mind",
    createdAt: "2025-12-29T11:45:00",
    updatedAt: "2025-12-29T15:30:00",
    cancelledAt: "2025-12-29T15:30:00",
    cancelReason: "Customer requested cancellation"
  }
];

/* ============================================
   STORAGE KEYS
   ============================================ */

const STORAGE_KEYS = {
  CART: 'fantasy_books_cart',
  ORDERS: 'fantasy_books_orders',
  CUSTOMER: 'fantasy_books_customer'
};

/* ============================================
   DATA ACCESS FUNCTIONS
   ============================================ */

/**
 * Get all books
 * @returns {Array} All books
 */
function getAllBooks() {
  return [...books];
}

/**
 * Get book by ID
 * @param {number} id - Book ID
 * @returns {Object|null} Book object or null
 */
function getBookById(id) {
  return books.find(book => book.id === parseInt(id)) || null;
}

/**
 * Get books by genre
 * @param {string} genre - Genre to filter by
 * @returns {Array} Filtered books
 */
function getBooksByGenre(genre) {
  if (!genre) return getAllBooks();
  return books.filter(book =>
    book.genre.toLowerCase().includes(genre.toLowerCase())
  );
}

/**
 * Search books by title or author
 * @param {string} query - Search query
 * @returns {Array} Matching books
 */
function searchBooks(query) {
  if (!query) return getAllBooks();

  const searchTerm = query.toLowerCase().trim();
  return books.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm) ||
    book.genre.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get all unique genres
 * @returns {Array} List of genres
 */
function getAllGenres() {
  const genres = books.map(book => book.genre);
  return [...new Set(genres)].sort();
}

/**
 * Get books sorted by field
 * @param {string} field - Field to sort by (price, title, rating)
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted books
 */
function getBooksSorted(field, direction = 'asc') {
  const sorted = [...books].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

/* ============================================
   ORDER DATA FUNCTIONS
   ============================================ */

/**
 * Get all orders (from localStorage or sample data)
 * @returns {Array} All orders
 */
function getAllOrders() {
  const storedOrders = loadFromStorage(STORAGE_KEYS.ORDERS, null);
  return storedOrders || [...sampleOrders];
}

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Object|null} Order object or null
 */
function getOrderById(orderId) {
  const orders = getAllOrders();
  return orders.find(order => order.id === orderId) || null;
}

/**
 * Get orders by phone number
 * @param {string} phone - Phone number
 * @returns {Array} Matching orders
 */
function getOrdersByPhone(phone) {
  const orders = getAllOrders();
  const cleanedPhone = phone.replace(/[\s-]/g, '');
  return orders.filter(order =>
    order.phone.replace(/[\s-]/g, '').includes(cleanedPhone)
  );
}

/**
 * Get orders by status
 * @param {string} status - Order status
 * @returns {Array} Filtered orders
 */
function getOrdersByStatus(status) {
  const orders = getAllOrders();
  if (!status) return orders;
  return orders.filter(order => order.status === status);
}

/**
 * Get current (active) orders
 * @returns {Array} Current orders
 */
function getCurrentOrders() {
  const orders = getAllOrders();
  return orders.filter(order =>
    ['pending', 'processing', 'shipped'].includes(order.status)
  );
}

/**
 * Get past (completed) orders
 * @returns {Array} Past orders
 */
function getPastOrders() {
  const orders = getAllOrders();
  return orders.filter(order =>
    ['delivered', 'cancelled'].includes(order.status)
  );
}

/**
 * Save new order
 * @param {Object} order - Order object
 * @returns {Object} Saved order
 */
function saveOrder(order) {
  const orders = getAllOrders();
  orders.unshift(order); // Add to beginning
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
  return order;
}

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} newStatus - New status
 * @returns {Object|null} Updated order or null
 */
function updateOrderStatus(orderId, newStatus) {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) return null;

  orders[orderIndex].status = newStatus;
  orders[orderIndex].updatedAt = new Date().toISOString();

  // Add specific timestamps based on status
  if (newStatus === 'delivered') {
    orders[orderIndex].deliveredAt = new Date().toISOString();
  } else if (newStatus === 'cancelled') {
    orders[orderIndex].cancelledAt = new Date().toISOString();
  }

  saveToStorage(STORAGE_KEYS.ORDERS, orders);
  return orders[orderIndex];
}

/* ============================================
   CART DATA FUNCTIONS
   ============================================ */

/**
 * Get cart items
 * @returns {Array} Cart items
 */
function getCart() {
  return loadFromStorage(STORAGE_KEYS.CART, []);
}

/**
 * Save cart
 * @param {Array} cart - Cart items
 */
function saveCart(cart) {
  saveToStorage(STORAGE_KEYS.CART, cart);
}

/**
 * Clear cart
 */
function clearCart() {
  removeFromStorage(STORAGE_KEYS.CART);
}

/**
 * Get cart item count
 * @returns {number} Total items in cart
 */
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart total
 * @returns {number} Cart total amount
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/* ============================================
   STATISTICS FUNCTIONS (For Admin)
   ============================================ */

/**
 * Get order statistics
 * @returns {Object} Order stats
 */
function getOrderStats() {
  const orders = getAllOrders();

  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0)
  };
}

/**
 * Get books statistics
 * @returns {Object} Book stats
 */
function getBookStats() {
  return {
    totalBooks: books.length,
    totalStock: books.reduce((sum, book) => sum + book.stock, 0),
    averagePrice: books.reduce((sum, book) => sum + book.price, 0) / books.length,
    genres: getAllGenres().length
  };
}

/* ============================================
   INITIALIZE DATA
   ============================================ */

/**
 * Initialize orders with sample data if empty
 */
function initializeData() {
  const storedOrders = loadFromStorage(STORAGE_KEYS.ORDERS, null);
  if (!storedOrders) {
    saveToStorage(STORAGE_KEYS.ORDERS, sampleOrders);
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  initializeData();
}

/* ============================================
   EXPORT (if using modules)
   ============================================ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    books,
    sampleOrders,
    STORAGE_KEYS,
    getAllBooks,
    getBookById,
    getBooksByGenre,
    searchBooks,
    getAllGenres,
    getBooksSorted,
    getAllOrders,
    getOrderById,
    getOrdersByPhone,
    getOrdersByStatus,
    getCurrentOrders,
    getPastOrders,
    saveOrder,
    updateOrderStatus,
    getCart,
    saveCart,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getOrderStats,
    getBookStats,
    initializeData
  };
}
