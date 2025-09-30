import { Link } from 'react-router-dom'
import Purchase from './Purchase.jsx'

import '../assets/styles/product.css'

function Product({ product, loaded }) {

    return (
        <div className="product">
            <div className="upper">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name}
                        width="300" height="300"
                        onLoad={loaded} onError={loaded} />
                </Link>
                <Purchase product={product} />
            </div>
            <div className="lower">
                <h2 className="name">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h2>
                <div className="prices">
                    {product.newPrice && <> {/*discounted*/}
                        <span className="price new">€{product.newPrice}</span>
                        <span className="discount">{product.discount} off</span>
                    </>}
                    <span className={`price ${product.newPrice && 'old'}`}>€{product.price}</span>
                </div>
            </div>
        </div>
    );
} export default Product