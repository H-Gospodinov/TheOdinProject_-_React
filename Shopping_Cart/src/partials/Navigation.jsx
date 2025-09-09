import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ContentContext as data } from '../Context.jsx'

import '../assets/styles/navigation.css'

import home from '../assets/icons/home.svg'
import shop from '../assets/icons/food.svg'
import about from '../assets/icons/flag.svg'
import blog from '../assets/icons/blog.svg'

function NavBar() {

    const [open, setOpen] = useState(false);

    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <img src={home} alt="" width="23" height="23" />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="nav-item"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}>

                    <NavLink to="/shop" className="nav-link"
                        onClick={() => setOpen(false)}> {/*close dropdown*/}

                        <img src={shop} alt="" width="23" height="23" />
                        <span>Shop</span>
                    </NavLink>

                    <div className={`nav-box ${open ? 'active' : ''}`}>
                        {useContext(data).categories.map(cat => (

                            <NavLink className="sub-link" to={`/shop/${cat.name}`} key={cat.name}
                                onClick={() => setOpen(false)}> {/*close dropdown*/}

                                <img src={cat.image} alt={cat.name} width="200" height="200" />
                                <strong>{cat.name}</strong>
                            </NavLink>
                        ))}
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link about">
                        <img src={about} alt="" width="23" height="23" />
                        <span>About</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/blog" className="nav-link blog">
                        <img src={blog} alt="" width="23" height="23" />
                        <span>Blog</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar