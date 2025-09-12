import { useContext } from 'react'
import { ContentContext as data } from '../Context.jsx'
import Product from '../partials/Product.jsx'

function HomePage() {

    return (
        <section className="section home">
            <h1 className="section-title title">
                <span>Organic store Demo</span>
            </h1>
            <div className="section-body content">
                <div className="products featured">{
                    useContext(data).products.map(product => (
                        <Product product={product} key={product.id} />
                    ))
                }</div>
            </div>
        </section>
    );
}
export default HomePage