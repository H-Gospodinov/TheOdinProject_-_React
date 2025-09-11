import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ContentContext as data } from '../Context';

import '../assets/styles/sidebar.css'

function Sidebar(
    { minPrice, maxPrice, range, setRange, attributes, attrs, setAttrs }
) {
    return (
        <div className="sidebar">
            <div className="group">
                <h3 className="title">
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
                <h3 className="title">
                    <span className="wrap">Price range</span>
                    {(range[1] !== maxPrice) && ( // clear
                    <button className="clear" type="button" aria-label="clear"
                        onClick={() => setRange([minPrice, maxPrice])}>
                    </button>)}
                </h3>
                <div className="list">
                    <div className="item min-max">
                        <span>min: €{minPrice}</span>
                        <span>max: €{maxPrice}</span>
                    </div>
                    <input className="slider" type="range"
                        min={minPrice} max={maxPrice} value={range[1]}
                        onChange={(e) => setRange([range[0], Number(e.target.value)])}
                    />
                    <div className="item range">
                        <span>range: €{range[0]} - €{range[1]}</span>
                    </div>
                </div>
            </div>
            <div className="group">
                <h3 className="title">
                    <span className="wrap">Origin</span>
                    {attrs.length > 0 && ( // clear selected
                    <button className="clear" type="button" aria-label="clear"
                        onClick={() => setAttrs([])}>
                    </button>)}
                </h3>
                <ul className="list">
                    {attributes.map(attr => (
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