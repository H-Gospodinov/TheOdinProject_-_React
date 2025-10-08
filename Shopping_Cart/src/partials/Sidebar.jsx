import { NavLink } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ContentContext as data } from '../context/Catalog.jsx'

import '../assets/styles/sidebar.css'

function Sidebar(
    { minPrice, maxPrice, range, setRange, attrs, setAttrs }
) {
    const { categories } = useContext(data);
    const { products } = useContext(data);

    const [toggle, setToggle] = useState(null);

    const handleClick = (index) => {
        if (window.matchMedia("(max-width: 750px)").matches)
        setToggle(toggle !== index ? index : null);
    };
    useEffect(() => {
        const screenSize = window
            .matchMedia('(min-width: 751px)');
        const handleResize = (e) => {
            e.matches && setToggle(false);
        }
        screenSize.addEventListener('change', handleResize);
        return () => {
            screenSize.removeEventListener('change', handleResize);
        };
    }, [setToggle]);

    return (
        <div className="sidebar">

            <div className="group">
                <h3 className="name" onClick={() => handleClick(0)}>
                    <span className="wrap">Categories</span>
                </h3>
                <ul className={`list ${toggle === 0 ? 'active' :''}`}>

                    <li className="item">
                        <NavLink className="link" to="/shop" end
                            onClick={() => setToggle(null)}>Show all
                        </NavLink>
                    </li>
                    {categories.map(category => (
                    // available categories

                    <li className="item" key={category.name}>
                        <NavLink className="link" to={`/shop/${category.name}`}
                            onClick={() => setToggle(null)}>
                              {category.name}
                        </NavLink>
                    </li>))}
                </ul>
            </div>

            <div className="group">
                <h3 className="name" onClick={() => handleClick(1)}>
                    <span className="wrap">Price range</span>
                    {(range[1] !== maxPrice) && // clear

                    <button className="clear" type="button" aria-label="clear"
                        onClick={(e) => {e.stopPropagation(); setToggle(null);
                            setRange([minPrice, maxPrice]);}}>
                    </button>}
                </h3>
                <div className={`list ${toggle === 1 ? 'active' :''}`}>
                    <div className="item min-max">
                        <span>min: €{Math.floor(minPrice)}</span>
                        <span>max: €{Math.ceil(maxPrice)}</span>
                    </div>
                    <input className="slider" type="range"
                        min={minPrice} max={maxPrice} value={range[1]} step="0.01"
                        onChange={(e) => setRange([range[0], Number(e.target.value)])}
                    />
                    <div className="item range">
                        <span>€{range[0].toFixed(2)} - €{range[1].toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="group">
                <h3 className="name" onClick={() => handleClick(2)}>
                    <span className="wrap">Origin</span>
                    {(attrs.length > 0) && // clear

                    <button className="clear" type="button" aria-label="clear"
                        onClick={(e) => {e.stopPropagation();
                            setAttrs([]); setToggle(null);}}>
                    </button>}
                </h3>
                <ul className={`list ${toggle === 2 ? 'active' :''}`}>
                    {[...new Set( // ignore existing
                        products.map(prod => prod.origin)
                    )].map(attr => ( // unique only

                    <li className="item" key={attr}>
                        <span className="filter">
                            <input className="checkbox" id={attr} type="checkbox"
                                checked={attrs.includes(attr)}
                                onChange={() => setAttrs(selected => (
                                    // select or deselect
                                    !selected.includes(attr) ? [...selected, attr]
                                    : selected.filter(every => every !== attr))
                                )} />
                            <label className="label" htmlFor={attr}>{attr}</label>
                        </span>
                    </li>))}
                </ul>
            </div>
        </div>
    );
}
export default Sidebar