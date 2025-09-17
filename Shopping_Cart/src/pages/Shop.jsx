import { useParams, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ContentContext as data } from '../Context.jsx'
import Sidebar from '../partials/Sidebar.jsx'
import Product from '../partials/Product.jsx'

function ShopPage() {

    const { category } = useParams();
    const { products } = useContext(data);

    const prices = products.map(prod =>
        prod.newPrice ? prod.newPrice : prod.price
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const [range, setRange] = useState([minPrice,maxPrice]);
    const [attrs, setAttrs] = useState([]);

    const location = useLocation().search;
    const parameters = new URLSearchParams(location);
    const searchQuery = parameters.get('query')?.trim() ||'';

    useEffect(() => {
        if (!searchQuery) return;
        setRange([minPrice, maxPrice]); setAttrs([]);
        // eslint-disable-next-line
    }, [searchQuery]);

    useEffect(() => {
        if (!searchQuery) return;
        const dropBtn = document.getElementById('shop');
        if (!dropBtn.matches(':hover')) return;

        dropBtn.classList.add('no-hover');
        const handleMouseLeave = () => {
            dropBtn.classList.remove('no-hover');
        };
        dropBtn.addEventListener(
            'mouseleave', handleMouseLeave
        );
        return () => {
            dropBtn.classList.remove('no-hover');
            dropBtn.removeEventListener(
            'mouseleave', handleMouseLeave
        )};
    }, [searchQuery]);

    const displayProducts = products
        // category, attribute, price, search
        .filter(prod => !category || prod.category === category)
        .filter(prod => attrs.length < 1 || attrs.includes(prod.origin))
        .filter(prod => {
            const priceValue = prod.newPrice ? prod.newPrice : prod.price;
            return priceValue >= range[0] && priceValue <= range[1];
        })
        .filter(prod => (!searchQuery || prod.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
    ));

    return (
        <section className="section shop">
            <h1 className="section-title title">
                <span>
                    Shop {category ? `${category}` :
                    searchQuery ? `"${searchQuery}"` : 'all'}
                </span> {/**/}
            </h1>
            <div className="section-body content">
                <Sidebar
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    range={range}
                    setRange={setRange}
                    attrs={attrs}
                    setAttrs={setAttrs}
                />
                <div className="products regular">
                    {(displayProducts.length > 0) ?
                        displayProducts.map(product => (
                        <Product product={product} key={product.id} />
                    )) :
                    <p className="no-result">{searchQuery ?
                        <>No results for <b>{searchQuery}</b>.</> :
                        <>Nothing found in <b>{category || 'All'}</b>.</>}
                    </p>}
                </div>
            </div>
        </section>
    );
}
export default ShopPage