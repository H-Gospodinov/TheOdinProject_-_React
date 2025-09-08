import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ContentContext as data } from '../Context.jsx'
import Sidebar from '../partials/Sidebar.jsx'
import Product from '../partials/Product.jsx'

function ShopPage() {

    const { category } = useParams();
    const { products } = useContext(data);

    const [filter, setFilter] = useState([]);

    let displayProducts = category ? products.filter(
        product => product.category === category
    ) : products;

    if (filter.length > 0) {
        displayProducts = displayProducts.filter(prod =>
            filter.includes(prod.origin)
        ); // reassign products
    }
    return (
        <section className="section shop">
            <h1 className="section-title">
                <span>{category ? `Shop ${category}` : 'Shop all'}</span>
            </h1>
            <div className="section-body">
                <Sidebar filter={filter} setFilter={setFilter} />
                <div className="products regular">{
                    displayProducts.length > 0 ?
                    displayProducts.map(product => (
                        <Product product={product} key={product.id} />
                    )) : <p className="no-result">Nothing found in <b>{category}</b>.</p>
                }</div>
            </div>
        </section>
    );
}
export default ShopPage