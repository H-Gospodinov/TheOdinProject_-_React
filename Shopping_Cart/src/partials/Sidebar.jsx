import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ContentContext as data } from '../Context';

import '../assets/styles/sidebar.css'

function Sidebar(
    { minPrice, maxPrice, range, setRange, attrs, setAttrs }
) {
    return (
        <div className="sidebar">
            <div className="group">
                <h3 className="name">
                    <span className="wrap">Categories</span>
                </h3>
                <ul className="list">
                    <li className="item">
                        <NavLink className="link" to="/shop" end>Show all</NavLink>
                    </li>
                    {useContext(data).categories.map(cat => (
                    <li className="item" key={cat.name}>
                        <NavLink className="link" to={`/shop/${cat.name}`}>{cat.name}</NavLink>
                    </li>))}
                </ul>
            </div>
            <div className="group">
                <h3 className="name">
                    <span className="wrap">Price range</span>
                    {(range[1] !== maxPrice) && // clear
                    <button className="clear" type="button" aria-label="clear"
                        onClick={() => setRange([minPrice, maxPrice])}>
                    </button>}
                </h3>
                <div className="list">
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
                <h3 className="name">
                    <span className="wrap">Origin</span>
                    {(attrs.length > 0) && // clear selected
                    <button className="clear" type="button" aria-label="clear"
                        onClick={() => setAttrs([])}>
                    </button>}
                </h3>
                <ul className="list">
                    {[...new Set(useContext(data).products.map(
                        prod => prod.origin))].map(attr => (
                    <li className="item" key={attr}>
                        <span className="filter">
                            <input className="checkbox" id={attr} type="checkbox"
                                checked={attrs.includes(attr)}
                                onChange={() => setAttrs(selected =>
                                    // select or deselect
                                    !selected.includes(attr) ? [...selected, attr]
                                    : selected.filter(every => every !== attr)
                                )}
                            /> <label className="label" htmlFor={attr}>{attr}</label>
                        </span>
                    </li>))}
                </ul>
            </div>
        </div>
    );
} export default Sidebar