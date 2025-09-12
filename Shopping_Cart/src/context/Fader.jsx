import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import HomePage from './pages/Home.jsx'
import ShopPage from './pages/Shop.jsx'
import AboutPage from './pages/About.jsx'
import BlogPage from './pages/Blog.jsx'
import CartPage from './pages/Cart.jsx'

function NavRoutes() {

    const location = useLocation();

    const NotFound = () => (
        <h1 className="title not-found">
            Page not found
        </h1> // no route match
    );
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                <Route path="/" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <HomePage />
                    </motion.div>
                } />
                <Route path="/shop" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <ShopPage />
                    </motion.div>
                } />
                <Route path="/shop/:category" element={
                    // no animation for sub-pages,
                    <ShopPage /> // but "all" is animated
                } />
                <Route path="/about" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <AboutPage />
                    </motion.div>
                } />
                <Route path="/blog" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <BlogPage />
                    </motion.div>
                } />
                <Route path="/cart" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <CartPage />
                    </motion.div>
                } />
                <Route path="*" element={
                    <motion.div className="fader"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    >
                        <NotFound />
                    </motion.div>
                } />

            </Routes>
        </AnimatePresence>
    );
}
export default NavRoutes