import { NavLink, Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ContentContext as data } from '../context/Catalog.jsx'

import '../assets/styles/navigation.css'

import home from '../assets/icons/home.svg'
import shop from '../assets/icons/leaf.svg'
import about from '../assets/icons/flag.svg'
import blog from '../assets/icons/blog.svg'
import food from '../assets/images/organic.webp'

import close from '../assets/icons/clear.svg'

function NavBar({ toggle, setToggle }) {

    const [open, setOpen] = useState(false);
    const { categories } = useContext(data);

    useEffect(() => {
        const screenSize = window
            .matchMedia('(min-width: 1001px)');
        const handleResize = (e) => {
            e.matches && setToggle(false);
        }
        screenSize.addEventListener('change', handleResize);
        return () => {
            screenSize.removeEventListener('change', handleResize);
        };
    }, [setToggle]);

    return (
        <nav className={`nav-bar ${toggle ? 'active' : ''}`}>
            {toggle && // close mobile menu
            <button
                className="menu-close" type="button" aria-label="close"
                onClick={() => setToggle(false)}>
                <img src={close} alt="" width="36" height="36" />
            </button>}
            <ul className="nav-list"
                onClick={(e) => {
                    e.target.closest('.nav-link') && setToggle(false);
                }}>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <img src={home} alt="" width="23" height="23" />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="nav-item" id="shop"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}>

                    <NavLink to="/shop" className="nav-link"
                        onClick={() => setOpen(false)}> {/*close dropdown*/}

                        <img src={shop} alt="" width="23" height="23" />
                        <span>Shop</span>
                    </NavLink>

                    <div className={`nav-box ${open ? 'active' : ''}`}>
                        <Link className="sub-link" to="/shop" onClick={() => setOpen(false)}>
                            <img src={food} alt="All" width="284" height="426" />
                            <strong>All</strong>
                        </Link>
                        {categories.map(cat => (
                            <Link className="sub-link" to={`/shop/${cat.name}`} key={cat.name}
                                onClick={() => setOpen(false)}> {/*close dropdown*/}

                                <img src={cat.image} alt={cat.name} width="284" height="426" />
                                <strong>{cat.name}</strong>
                            </Link>
                        ))}
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link">
                        <img src={about} alt="" width="23" height="23" />
                        <span>About</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/demo" className="nav-link">
                        <img src={blog} alt="" width="23" height="23" />
                        <span>Blog</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
} export default NavBar