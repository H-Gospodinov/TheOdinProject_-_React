import { useContext } from 'react'
import { ProductsContext } from '../Context.jsx'
import Product from './Product.jsx'

function HomePage() {

    return (
        <section className="section">
            <h2 className="section-title">
                <span>Organic store Demo</span>
            </h2>
            <div className="grid featured">
                {
                    useContext(ProductsContext).map(product => {
                        return <Product product={product} key={product.id} />
                    })
                }
            </div>
        </section>
    );
}
export default HomePage