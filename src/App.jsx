// App.jsx — Complete final version

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import { CartProvider }  from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Layout      from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home        from './pages/Home/Home';
import Products    from './pages/Products/Products';
import Login       from './pages/Login/Login';
import Signup      from './pages/Signup/Signup';
import Cart        from './pages/Cart/Cart';
import NotFound    from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/*
            ToastProvider is outermost UI provider
            so toasts render on top of everything
          */}
          <ToastProvider>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart"     element={<Cart />} />
                <Route path="/login"    element={<Login />} />
                <Route path="/signup"   element={<Signup />} />
                {/* Catch all unknown routes */}
                <Route path="*"         element={<NotFound />} />
              </Routes>
            </Layout>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;