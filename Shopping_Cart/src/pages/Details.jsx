import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { ContentContext as data } from '../Context.jsx'
import Purchase from '../partials/Purchase.jsx';

import '../assets/styles/details.css'

import stock from '../assets/icons/check.svg'
import delivery from '../assets/icons/location.png'
import pickup from '../assets/icons/pickup.png'

function DetailsPage() {

    const { details } = useParams();
    const { products } = useContext(data);

    const product = products.find(prod => {
        return prod.id === details;
    });

    return (product ?
        <section className="section details">
            <h1 className="section-title title">
                <span>{product.name}</span>
            </h1>
            <div className="section-body content">
                <div className="wrapper">
                    <div className="picture">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="overview">
                        <ul className="breadcrumb">
                            <li className="crumb"><Link to="/">Home</Link></li>
                            <li className="crumb"><Link to="/shop">Shop</Link></li>
                            <li className="crumb">
                                <Link to={`/shop/${product.category}`}>{product.category}</Link>
                            </li>
                        </ul>
                        <div className="prices">
                            {product.newPrice && <> {/*discounted*/}
                                <span className="price new">€{product.newPrice}</span>
                                <span className="discount">{product.discount} off</span>
                            </>}
                            <span className={`price ${product.newPrice && 'old'}`}>€{product.price}</span>
                            {(product.amount || product.weight) &&
                                <span className="amount">
                                    {product.amount && `${product.amount} pieces`}
                                    {product.weight && `appx. ${product.weight}`}
                                </span>}
                        </div>
                        <p className="description">{product.description}</p>
                        <p className="inform-1">Usually ready in 24 hours. View store<Link to="/demo">info</Link>.</p>
                        <div className="stock">
                            {!product.stock ?
                                <span className="no-stock">Out of stock - sold out</span> : 
                                product.stock <= 10 ?
                                <span className="low-stock">Low stock - <b>{product.stock}</b> items left</span> :
                                <><img src={stock} alt="" width="26" height="26" />
                                <span className="in-stock">In stock - more than 10 available</span></>}
                        </div>
                        <Purchase />
                        <p className="inform-2">Tax included. Shipping calculated at checkout.</p>
                        <ul className="shipping">
                            <li className="delivery">
                                <img src={delivery} alt="" width="26" height="25" />
                                <span>Location based Delivery within 1 - 2 Days</span>
                            </li>
                            <li className="pickup">
                                <img src={pickup} alt="" width="24" height="24" />
                                <span>Pickup available at OrganicFood</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section> :
        <h1 className="title not-found">
            Product not found
        </h1>
    );
}
export default DetailsPage