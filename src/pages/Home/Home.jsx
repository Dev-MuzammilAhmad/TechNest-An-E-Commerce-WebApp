// Home.jsx

import { Link } from 'react-router-dom';
import { MdSupportAgent } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { BsPhone, BsLaptop, BsHeadphones, BsShieldCheck } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiRefundLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const categories = [
  {
    id: 'smart-home',
    icon: <IoHome />,
    title: 'Smart Home Devices',
    desc: 'Automate your home with smart speakers, lights & security.',
    color: '#FFF3E8',
  },
  {
    id: 'mobiles',
    icon: <BsPhone />,
    title: 'Mobiles & Tablets',
    desc: 'Latest smartphones and tablets from top brands.',
    color: '#E8F4FF',
  },
  {
    id: 'laptops',
    icon: <BsLaptop />,
    title: 'Laptops & Computers',
    desc: 'Powerful laptops and desktops for work and gaming.',
    color: '#E8FFE8',
  },
  {
    id: 'accessories',
    icon: <BsHeadphones />,
    title: 'Accessories',
    desc: 'Headphones, chargers, cables and smart wearables.',
    color: '#F3E8FF',
  },
];

function Home() {
  const { currentUser } = useAuth(); // ← get login status

  return (
    <div className="home">

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero__content">
          <p className="hero__tag">Welcome to TechNest</p>
          <h1 className="hero__heading">
            Your Smart Home <br />
            <span className="hero__heading--accent">Starts Here</span>
          </h1>
          <p className="hero__subtext">
            Discover the latest in smart home technology, mobiles,
            laptops and accessories — all in one place.
          </p>
          <div className="hero__btns">
            <Link to="/products" className="hero__btn hero__btn--primary">
              Shop Now
            </Link>
            <Link to="/products?category=smart-home" className="hero__btn hero__btn--outline">
              Explore Smart Home
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero__visual">
          <div className="hero__visual-box">
            <IoHome className="hero__visual-icon" />
            <p>Smart Living</p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats">
        <div className="stats__container">
          <div className="stats__item">
            <span className="stats__number">500+</span>
            <span className="stats__label">Products</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">10k+</span>
            <span className="stats__label">Happy Customers</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">4</span>
            <span className="stats__label">Categories</span>
          </div>
          <div className="stats__item">
            <span className="stats__number">24/7</span>
            <span className="stats__label">Support</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="categories">
        <div className="section__header">
          <h2 className="section__title">Shop by Category</h2>
          <p className="section__subtitle">
            Find exactly what you need across our curated collections
          </p>
        </div>

        <div className="categories__grid">
          {categories.map(cat => (
            <Link
              to={`/products?category=${cat.id}`}
              key={cat.id}
              className="category-card"
              style={{ backgroundColor: cat.color }}
            >
              <span className="category-card__icon">{cat.icon}</span>
              <h3 className="category-card__title">{cat.title}</h3>
              <p className="category-card__desc">{cat.desc}</p>
              <span className="category-card__link">Browse →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="featured">
        <div className="section__header">
          <h2 className="section__title">Featured Products</h2>
          <p className="section__subtitle">Hand-picked top sellers just for you</p>
        </div>

        <div className="featured__grid">
          {/* Show only Best Seller products, max 4 */}
          {products
            .filter(p => p.badge === 'Best Seller')
            .slice(0, 4)
            .map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => alert(`"${p.name}" will be added to cart in Phase 5!`)}
                isLoggedIn={!!currentUser} // ← pass login status
              />
            ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-us">
        <div className="section__header">
          <h2 className="section__title">Why Choose TechNest?</h2>
        </div>
        <div className="why-us__grid">

          <div className="why-us__card">
            <TbTruckDelivery className="why-us__icon" />
            <h4>Fast Delivery</h4>
            <p>Get your order delivered within 2–3 business days.</p>
          </div>

          <div className="why-us__card">
            <BsShieldCheck className="why-us__icon" />
            <h4>Genuine Products</h4>
            <p>100% authentic products with official warranty.</p>
          </div>

          <div className="why-us__card">
            <MdSupportAgent className="why-us__icon" />
            <h4>24/7 Support</h4>
            <p>Our support team is always here to help you.</p>
          </div>

          <div className="why-us__card">
            <RiRefundLine className="why-us__icon" />
            <h4>Easy Returns</h4>
            <p>7-day hassle-free return policy on all products.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;