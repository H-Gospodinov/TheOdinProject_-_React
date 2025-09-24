import { useContext } from 'react'
import { BasketContext as data } from '../context/Basket.jsx'
import { useNavigate, Link } from 'react-router-dom'

import '../assets/styles/basket.css'

function CartPage() {

    const currentBasket = useContext(data).basket;
    const { remove } = useContext(data);
    const navigate = useNavigate();

    return (
        currentBasket.length > 0 ?
        <section className="section cart">
            <h1 className="section-title title">
                <span>Shopping cart</span>
            </h1>
            <div className="section-body content">
                <table className="table">
                    <thead><tr>
                        <th>product</th>
                        <th className="align">details</th>
                        <th>price</th>
                        <th>qnty</th>
                        <th>total</th>
                        <th>remove</th>
                    </tr></thead>
                    <tbody>
                        {currentBasket.map(product =>
                        <tr key={product.id}>
                            <td className="image">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt={product.name} width="100" height="100" />
                                </Link>
                            </td>
                            <td className="details align">
                                <div className="wrap">
                                    <Link className="name" to={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                    {(product.amount || product.weight) &&
                                    <span className="amount">
                                        {product.amount && `${product.amount} pieces`}
                                        {product.weight && `appx. ${product.weight}`}
                                    </span>}
                                </div>
                            </td>
                            <td className="price">
                                € {product.newPrice ? product.newPrice : product.price}
                            </td>
                            <td className="quantity">
                                {product.quantity}
                            </td>
                            <td className="total">
                                € {((product.newPrice ? product.newPrice : product.price)
                                    * product.quantity).toFixed(2)}
                            </td>
                            <td className="delete">
                                <button className="remove" title="Remove" aria-label="remove"
                                    onClick={() => remove(product.id)}>
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <div className="actions">
                    <button className="button discard"
                        onClick={() => remove()}>Remove products
                    </button>
                    <button className="button checkout"
                        onClick={() => navigate("/demo")}>Proceed to checkout
                    </button>
                </div>
            </div>
        </section> : <p className="title not-found">Cart is empty</p>
    )
}
export default CartPage