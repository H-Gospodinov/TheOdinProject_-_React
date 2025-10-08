import { useContext, useState } from 'react'
import { ContentContext as data } from '../context/Catalog.jsx'
import Product from '../partials/Product.jsx'

function HomePage() {

    const { products } = useContext(data);
    const [loaded, setLoaded] = useState(0);

    const handleLoad = () => {
        setLoaded((count) => count + 1);
    };
    const loading = loaded < products.length;

    return (
        <section className="section home">
            <h1 className="section-title title">
                <span>Organic store Demo</span>
            </h1>
            <div className="section-body content">
                <div className="products featured">
                    {loading && <span className="loader" />}
                    {products.map(product => (
                        <Product loaded={handleLoad}
                          product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default HomePage