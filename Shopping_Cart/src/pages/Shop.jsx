import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ContentContext as data } from '../Context.jsx'
import Sidebar from '../partials/Sidebar.jsx'
import Product from '../partials/Product.jsx'

function ShopPage() {

    const { category } = useParams();
    const { products } = useContext(data);

    const prices = products.map(prod => {
        return Number(prod.price.replace(/[^\d.]/g, ""))
    });
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const attributes = [...new Set(products.map(
        prod => {return prod.origin}
    ))];
    const [range, setRange] = useState([minPrice, maxPrice]);
    const [attrs, setAttrs] = useState([]); // filters

    const displayProducts = products // filter chaining

        .filter(prod => !category || prod.category === category)
        .filter(prod => attrs.length < 1 || attrs.includes(prod.origin))
        .filter(prod => {
            const priceValue = Number(prod.price.replace(/[^\d.]/g, ""));
            return priceValue >= range[0] && priceValue <= range[1];
    });
    /* useEffect(() => { // reset filters when switch categories
        setAttrs([]); setRange([minPrice, maxPrice]);
    }, [category, minPrice, maxPrice]); */

    return (
        <section className="section shop">
            <h1 className="section-title">
                <span>{category ? `Shop ${category}` : 'Shop all'}</span>
            </h1>
            <div className="section-body">
                <Sidebar
                    attributes={attributes}
                    range={range} setRange={setRange}
                    minPrice={minPrice} maxPrice={maxPrice}
                    attrs={attrs} setAttrs={setAttrs}
                />
                <div className="products regular">{
                    // filtered by category, price, attributes
                    displayProducts.length > 0 ? displayProducts.map(product => (
                        <Product product={product} key={product.id} />
                    )) : <p className="no-result">Nothing found in <b>{category}</b>.</p>
                }</div>
            </div>
        </section>
    );
}
export default ShopPage