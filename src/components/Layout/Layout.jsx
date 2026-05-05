// Layout.jsx — Page wrapper
// Wraps every page with Navbar on top and Footer at bottom
// 'children' is whatever page content gets passed inside

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">

      {/* Always at the top */}
      <Navbar />

      {/* Page-specific content renders here */}
      {/* 'children' = whatever is between <Layout> ... </Layout> tags */}
      <main className="layout__main">
        {children}
      </main>

      {/* Always at the bottom */}
      <Footer />

      {/* Floating back-to-top button */}
      <BackToTop />

    </div>
  );
}

export default Layout;