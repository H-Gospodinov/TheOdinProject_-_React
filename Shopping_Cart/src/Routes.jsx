import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home.jsx'
import ShopPage from './pages/Shop.jsx'
import DetailsPage from './pages/Details.jsx'
import AboutPage from './pages/About.jsx'
import DemoPage from './pages/Demo.jsx'
import CartPage from './pages/Cart.jsx'

function NavRoutes() {

    const NotFound = () => (
        <h1 className="title not-found">
            Page not found
        </h1> // no route match
    );
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/product/:details" element={<DetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default NavRoutes