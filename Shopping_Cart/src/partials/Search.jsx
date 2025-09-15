import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext as data } from '../Context';

import '../assets/styles/search.css'

import search from '../assets/icons/search.svg?raw'
import close from '../assets/icons/clear.svg'

const SearchIcon = () => (
    <span dangerouslySetInnerHTML={{ __html: search }} />
);
function SearchBox() {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const keyDown = (e) => {
            e.key === "Escape" && setOpen(false);
        };
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    }, [open]); // close by esc

    return (
        <div className="search">
            <button type="button" aria-label="search"
                className={`toggle ${open ? 'on':''}`}
                onClick={(e) => {
                    setOpen(!open); e.currentTarget.blur();
                }}> {open ?
                <img src={close} alt="" width="36" height="36" /> :
                <SearchIcon />}
            </button>
            <search className={`search-box ${open ? 'active':''}`}>
                <form className="form" role="search">
                    <input className="input" id="search" type="text" placeholder="Search" />
                    <button className="button" aria-label="search">
                        <SearchIcon />
                    </button>
                </form>
                <div className="results"></div>
            </search>
        </div>
    );
} export default SearchBox