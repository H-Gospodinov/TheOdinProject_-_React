import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ContentContext as data } from '../Context.jsx'
import Product from '../partials/Product.jsx'

function ShopPage() {

    const { category } = useParams();
    const { products } = useContext(data);

    const displayProducts = category ? products.filter(
            product => product.category === category
    ) : products;

    return (
        <section className="section home">
            <h1 className="section-title">
                <span>{category ? `Shop ${category}` : 'Shop all'}</span>
            </h1>
            <div className="section-body">
                <div className="products featured">{
                    displayProducts.map(product => (
                        <Product product={product} key={product.id} />
                    ))
                }</div>
            </div>
        </section>
    );
}
export default ShopPage