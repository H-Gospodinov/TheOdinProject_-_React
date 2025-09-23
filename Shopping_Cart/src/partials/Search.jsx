import { useNavigate, Link } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { ContentContext as data } from '../context/Catalog.jsx';

import '../assets/styles/search.css'

import search from '../assets/icons/search.svg?raw'
import close from '../assets/icons/clear.svg'

const SearchIcon = () => (
    <span dangerouslySetInnerHTML={{ __html: search }} />
);
function SearchBox() {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(-1);
    const [results, setResults] = useState([]);

    const { products } = useContext(data);

    const formRef = useRef();
    const itemRefs = useRef([]);
    const redirect = useNavigate();

    const resetSearch = () => {
        setOpen(false); setQuery('');
        setResults([]); setFocus(-1);
    };
    useEffect(() => {
        if (results.length < 1 || !open) {
            setFocus(-1);
        }
    }, [results.length, open]);

    useEffect(() => {
        if (!open) return;
        const keyDown = (e) => {
            e.key === "Escape" && resetSearch();
        };
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    }, [open]); // close by esc

    function handleInput(e) {
        const value = e.target.value;
        setQuery(value); // display typing

        if (value.trim().length < 3) {
            setResults([]); setFocus(-1); return;
        }
        const filtered = products.filter(product =>
            product.name.toLowerCase()
            .includes(value.toLowerCase())
        );
        setResults(filtered);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim().length < 3) {

            formRef.current.style.opacity = '0.3';
            setTimeout(() => {
                formRef.current.style.opacity = '1';
            }, 50); return;

        } resetSearch(); // reset form before redirect
        redirect(`/shop?query=${encodeURIComponent(query.trim())}`);
    }

    function handleKeyDown(e) {
        if (query.trim().length < 3 || results.length < 1) {
            return;
        }
        switch (e.key) {

            case 'ArrowDown':
                e.preventDefault(); setFocus(prev => (
                    prev < results.length - 1 ? prev + 1 : 0));
                        break;
            case 'ArrowUp':
                e.preventDefault(); setFocus(prev => (
                    prev > 0 ? prev - 1 : results.length - 1));
                        break;
            case 'Enter':
                if(!itemRefs.current[focus] || focus < 0) return;
                e.preventDefault();
                itemRefs.current[focus].click();
        } // nav keys
    }
    return (
        <div className="search">

            <button type="button"
                aria-label="search"
                className={`toggle ${open ? 'on':''}`}
                onClick={(e) => {
                    const reset = () => {
                        setQuery(''); setFocus(-1); setResults([]);
                    };
                    open ? setTimeout(() => reset(), 400) : reset();
                    setOpen(!open); e.currentTarget.blur();
                }}
            > {open ?
                <img src={close} alt="" width="36" height="36" /> :
                <SearchIcon />}
            </button>

            <search className={`search-box ${open ? 'active':''}`}>

                <form
                    className="form" role="search"
                    onSubmit={handleSubmit} ref={formRef}>

                    <input
                        className="input"
                        type="text" name="search"
                        placeholder="Search products"
                        autoComplete="off"
                        value={query}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}/>

                    <button className="button" aria-label="search">
                        <SearchIcon />
                    </button>
                </form>

                <div className="results">
                    {query.trim().length < 3 ? null : results.length > 0 ?

                    <ul className="list">
                        {results.map((product, idx) => (

                            <li className={`item ${idx !== focus ? '': 'active'}`}
                                key={product.id}> {/*link wrapper*/}

                                <Link
                                    className="link"
                                    to={`/product/${product.id}`}
                                    onClick={() => {resetSearch()}}
                                    tabIndex={-1} ref={(link) => {
                                        return itemRefs.current[idx] = link;
                                }}>
                                    <img src={product.image} alt={product.name} width="64" height="64" />
                                    <span>{product.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul> : <div className="list">
                        <p className="no-result">No results for "<b>{query}</b>"</p>
                    </div>}
                </div>
            </search>
        </div>
    );
} export default SearchBox