import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ContentContext as data } from '../Context';

import '../assets/styles/sidebar.css'

function Sidebar({ filter, setFilter }) {

    const applyFilter = (attr) => {
        setFilter(prev => !prev.includes(attr) ?
            [...prev, attr] : prev.filter(f => f !== attr)
        ); // enabled : disabled
    };
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
                    <span className="wrap">Origin</span>
                    {filter.length > 0 && (
                    <button className="clear" type="button" aria-label="clear"
                        onClick={() => setFilter([])}>
                    </button>)}
                </h3>
                <ul className="list">
                    {useContext(data).attributes.map(attr => (
                    <li className="item" key={attr}>
                        <span className="filter">
                            <input className="checkbox" id={attr} type="checkbox"
                                checked={filter.includes(attr)}
                                onChange={() => applyFilter(attr)}
                            />
                            <label className="label" htmlFor={attr}>{attr}</label>
                        </span>
                    </li>))}
                </ul>
            </div>
        </div>
    );
} export default Sidebar