import { Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './components/Home.jsx'
import ShopPage from './components/Shop.jsx'
import AboutPage from './components/About.jsx'
import BlogPage from './components/Blog.jsx'
import CartPage from './components/Cart.jsx'

import home from './assets/icons/home.svg'
import shop from './assets/icons/food.svg'
import about from './assets/icons/flag.svg'
import blog from './assets/icons/blog.svg'

function NavBar() {

    return (
        <nav className="nav-bar">
            <NavLink to="/" className="nav-link home">
                <img src={home} alt="" width="23" height="23" />
                <span>Home</span>
            </NavLink>
            <NavLink to="/shop" className="nav-link shop">
                <img src={shop} alt="" width="23" height="23" />
                <span>Shop</span>
            </NavLink>
            <NavLink to="/about" className="nav-link about">
                <img src={about} alt="" width="23" height="23" />
                <span>About</span>
            </NavLink>
            <NavLink to="/blog" className="nav-link blog">
                <img src={blog} alt="" width="23" height="23" />
                <span>Blog</span>
            </NavLink>
        </nav>
    );
}
function NavRoutes() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<p>Page not found</p>} />
        </Routes>
    );
}

export { NavBar, NavRoutes}