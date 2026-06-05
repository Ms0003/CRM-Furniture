import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Info, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const MOCK_PRODUCTS = [
  {
    _id: 'mock1',
    title: 'Nordic Oak Lounge Chair',
    category: 'Chairs',
    price: 349,
    description: 'Crafted from premium sustainable solid European Oak and upholstered in heavy-weight natural linen fabric. The Nordic Oak Lounge Chair brings organic warmth, high-resilience support, and a timeless Danish modern aesthetic to any living space.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    _id: 'mock2',
    title: 'Velvet Emerald Chesterfield Sofa',
    category: 'Sofas',
    price: 1299,
    description: 'A luxurious interpretation of a classic silhouette. Features button-tufted high-density foam seating wrapped in rich emerald green velvet. Hand-turned dark eucalyptus legs with brass accents provide structural stability and elegant styling.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    _id: 'mock3',
    title: 'Minimalist Walnut Dining Table',
    category: 'Tables',
    price: 899,
    description: 'Clean profiles and organic walnut wood grain patterns make this mid-century dining table the perfect centerpoint of your dining space. Comfortably seats six to eight. Highly durable matte clear protective topcoat.',
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    _id: 'mock4',
    title: 'Bouclé Floating Bed Frame',
    category: 'Beds',
    price: 950,
    description: 'Create a serene oasis with our floating platform bed. Enveloped in high-texture white bouclé fabric with a fully upholstered headboard. Features sturdy internal steel reinforcement framework and solid pine slats.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    _id: 'mock5',
    title: 'Brass Arching Floor Lamp',
    category: 'Lighting',
    price: 189,
    description: 'Illuminate your reading nook with this hand-finished solid brass arching floor lamp. Heavy circular black marble base ensures excellent stability. Includes a dimmable LED Edison bulb for warm vintage ambiance.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    _id: 'mock6',
    title: 'Modular Walnut Bookshelf',
    category: 'Storage',
    price: 649,
    description: 'An architectural modular shelving unit made of premium American walnut veneer. Features asymmetrical open-back cubbies and two slow-close utility drawers for modern versatile storage combinations.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop',
    isAvailable: false
  }
];

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('furniture_store_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Sync cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('furniture_store_cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        if (response.data && response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
        } else {
          // If response is empty, use mock products
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.warn('Backend API connection failed, falling back to local mocks.', err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product) => {
    if (!product.isAvailable) {
      addToast('This item is currently out of stock', 'error');
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product._id === product._id);
      if (existingItem) {
        addToast(`Increased quantity of ${product.title}`);
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      addToast(`Added ${product.title} to cart`);
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, title) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
    addToast(`Removed ${title} from cart`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    addToast('Thank you! Your simulated furniture order has been placed.', 'success');
    setCart([]);
    setIsCartOpen(false);
  };

  // Derive unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filter products by category and search term
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="site-header">
        <a href="#" className="brand">
          VANGUARD<span className="brand-accent">.</span>
        </a>

        <div className="header-actions">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X 
                size={16} 
                style={{ position: 'absolute', right: '0.8rem', cursor: 'pointer', color: 'var(--text-tertiary)' }}
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>

          <button 
            className="cart-toggle-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
          >
            <ShoppingBag size={24} />
            {cartTotalItems > 0 && <span className="cart-count">{cartTotalItems}</span>}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="main-content">
        {/* Hero Banner */}
        <section className="hero-section">
          <div className="hero-text-content">
            <span className="hero-subtitle">Exquisite Handcrafted Design</span>
            <h1 className="hero-title">Timeless Furniture for Modern Spaces</h1>
            <p className="hero-description">
              Explore our curation of sustainably-crafted tables, bespoke chairs, and plush seating designed to elevate your living environment.
            </p>
            <button className="hero-cta" onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Discover Collection
            </button>
          </div>
          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&auto=format&fit=crop" 
              alt="Premium Interior Design Showcase"
            />
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="products-section">
          <div className="section-header">
            <h2 className="section-title">Our Collection</h2>
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="results-count">
            Showing {filteredProducts.length} of {products.length} products
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading catalog collections...</div>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <Search size={48} className="no-products-icon" />
                  <div className="no-products-text">No furniture matched your search</div>
                  <div className="no-products-subtext">Try refining your keyword query or switching category filters.</div>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-card-image-wrapper">
                      <img src={product.imageUrl} alt={product.title} />
                      <span className={`product-badge ${product.isAvailable ? 'available' : 'out-of-stock'}`}>
                        {product.isAvailable ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="product-card-info">
                      <span className="product-card-category">{product.category}</span>
                      <h3 className="product-card-title">{product.title}</h3>
                      <span className="product-card-price">${product.price.toLocaleString()}</span>
                      <div className="product-card-actions">
                        <button 
                          className="btn-details" 
                          onClick={() => setSelectedProduct(product)}
                        >
                          View Details
                        </button>
                        <button 
                          className="btn-add-cart-icon"
                          disabled={!product.isAvailable}
                          onClick={() => addToCart(product)}
                          title="Add to Cart"
                          aria-label="Add to Cart"
                        >
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* Cart Drawer */}
      <div 
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Shopping Cart</h2>
          <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <div className="cart-empty-text">Your cart is empty</div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Start browsing and add items to your cart.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product.imageUrl} alt={item.product.title} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.product.title}</div>
                  <div className="cart-item-price">${item.product.price.toLocaleString()}</div>
                  <div className="cart-item-qty-control">
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.product._id, -1)}>
                      <Minus size={12} />
                    </button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.product._id, 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.product._id, item.product.title)}
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Items ({cartTotalItems})</span>
              <span>Subtotal</span>
            </div>
            <div className="cart-summary-row total">
              <span>Estimated Total</span>
              <span>${cartSubtotal.toLocaleString()}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              Checkout <ArrowRight size={18} style={{ marginLeft: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <div 
        className={`modal-overlay ${selectedProduct ? 'open' : ''}`}
        onClick={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
              <X size={18} />
            </button>
            <div className="modal-image-panel">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} />
            </div>
            <div className="modal-details-panel">
              <span className="modal-category">{selectedProduct.category}</span>
              <h2 className="modal-title">{selectedProduct.title}</h2>
              <div className="modal-price">${selectedProduct.price.toLocaleString()}</div>
              
              <div className="modal-description">
                {selectedProduct.description}
              </div>

              <div className="modal-meta">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Status:</span>
                  <span style={{ fontWeight: 700, color: selectedProduct.isAvailable ? '#10b981' : '#ef4444' }}>
                    {selectedProduct.isAvailable ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
                  </span>
                </div>
                <button
                  className="btn-add-cart-large"
                  disabled={!selectedProduct.isAvailable}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  {selectedProduct.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-brand">VANGUARD.</div>
        <p>&copy; {new Date().getFullYear()} Vanguard Furniture. Premium Handcrafted Designs.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-tertiary)' }}>
          All mock designs and images are under Unsplash editorial licenses.
        </p>
      </footer>
    </div>
  );
}

export default App;
