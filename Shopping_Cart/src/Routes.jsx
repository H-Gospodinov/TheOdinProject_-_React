import { Routes, Route } from 'react-router-dom'
import HomePage from './components/Home.jsx'
import ShopPage from './components/Shop.jsx'
import AboutPage from './components/About.jsx'
import BlogPage from './components/Blog.jsx'
import CartPage from './components/Cart.jsx'

function NavRoutes() {

    const NotFound = () => (
        <h1 className="section-title not-found">
            Page not found
        </h1> // no route match
    );
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default NavRoutes