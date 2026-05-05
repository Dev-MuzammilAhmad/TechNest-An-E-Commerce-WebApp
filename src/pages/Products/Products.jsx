// Products.jsx — Full products listing page with filtering

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useAuth } from '../../context/AuthContext';
import { IoHome } from 'react-icons/io5';
import { BsPhone, BsLaptop, BsHeadphones, BsSearch, BsGrid3X3Gap, BsList } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import './Products.css';

// Category labels with React Icons
const categoryLabels = {
  'all':         { label: 'All Products',      icon: <BiCategory /> },
  'smart-home':  { label: 'Smart Home',        icon: <IoHome /> },
  'mobiles':     { label: 'Mobiles & Tablets', icon: <BsPhone /> },
  'laptops':     { label: 'Laptops',           icon: <BsLaptop /> },
  'accessories': { label: 'Accessories',       icon: <BsHeadphones /> },
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth(); // ← get login status

  // ── State ──
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  // Sync category when URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cat) setActiveCategory(cat);
    else setActiveCategory('all');
  }, [searchParams]);

  // ── Filter + Sort Logic ──
  const filteredProducts = products
    .filter(p => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low')  return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  // ── Handlers ──
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleAddToCart = (product) => {
    // Will be wired to real cart in Phase 5
    alert(`"${product.name}" will be added to cart in Phase 5!`);
  };

  return (
    <div className="products-page">

      {/* ── PAGE HEADER ── */}
      <div className="products-page__header">
        <div className="products-page__header-content">
          <h1>Our Products</h1>
          <p>Explore our full range of smart home tech and accessories</p>
        </div>
      </div>

      <div className="products-page__body">

        {/* ── SIDEBAR: Category Filters ── */}
        <aside className="products-sidebar">
          <h3 className="products-sidebar__title">Categories</h3>
          <ul className="products-sidebar__list">
            {Object.entries(categoryLabels).map(([key, { label, icon }]) => (
              <li key={key}>
                <button
                  className={`products-sidebar__btn ${
                    activeCategory === key ? 'products-sidebar__btn--active' : ''
                  }`}
                  onClick={() => handleCategoryChange(key)}
                >
                  <span className="products-sidebar__btn-label">
                    {icon}
                    {label}
                  </span>
                  <span className="products-sidebar__count">
                    {key === 'all'
                      ? products.length
                      : products.filter(p => p.category === key).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="products-main">

          {/* ── Toolbar ── */}
          <div className="products-toolbar">

            {/* Search */}
            <div className="products-search">
              <BsSearch className="products-search__icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="products-search__input"
              />
            </div>

            {/* Sort */}
            <select
              className="products-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A–Z</option>
            </select>

            {/* View Toggle */}
            <div className="products-view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <BsGrid3X3Gap />
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <BsList />
              </button>
            </div>

          </div>

          {/* Result Count */}
          <p className="products-result-count">
            Showing <strong>{filteredProducts.length}</strong> products
            {activeCategory !== 'all' && ` in ${categoryLabels[activeCategory].label}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>

          {/* ── Product Grid / List ── */}
          {filteredProducts.length > 0 ? (
            <div className={`products-grid ${viewMode === 'list' ? 'products-grid--list' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isLoggedIn={!!currentUser} // ← pass login status
                />
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <BsSearch size={48} color="var(--text-muted)" />
              <h3>No products found</h3>
              <p>Try a different category or search term</p>
              <button
                className="products-empty__reset"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Products;