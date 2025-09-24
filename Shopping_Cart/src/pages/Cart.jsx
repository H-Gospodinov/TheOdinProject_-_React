import { useContext, useState } from 'react'
import { BasketContext as data } from '../context/Basket.jsx'
import { useNavigate, Link } from 'react-router-dom'

import '../assets/styles/basket.css'

function CartPage() {

    const currentBasket = useContext(data).basket;
    const { update, remove } = useContext(data);

    const [notAvailable, setNotAvailable] = useState(null);

    const navigate = useNavigate();

    function handleQuantity() {
        const change = (product, num) => {
            const newQuantity = product.quantity + num;

            if (newQuantity < 1) return;

            if (newQuantity > product.stock) {
                setNotAvailable(product.id);
            } else {
                update(product.id, newQuantity);
                setNotAvailable(null);
        }}; return {
            increase: (product) => change(product, +1),
            decrease: (product) => change(product, -1),
        };
    }
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
                        <th>sum</th>
                        <th>remove</th>
                    </tr></thead>
                    <tbody>
                        {currentBasket.map(product =>
                        <tr key={product.id}>
                            <td className="image">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt="" width="100" height="100" />
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
                            <td className="qnty action">
                                <div className="quantity">
                                    <input
                                        className="qty-input" name="qty"
                                        type="text" aria-label="qty"

                                        inputMode="numeric" pattern="\d*"
                                        value={String(product.quantity)}

                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (!value.match(/^\d*$/)) return;
                                            // block non-numbers, empty string, and zero
                                            if (+value > product.stock) {
                                                setNotAvailable(product.id);
                                            } else {
                                                update(product.id, value > 0 ? +value : 1);
                                                setNotAvailable(null);
                                            }
                                        }} onKeyDown={(e) => (e.key == 'Enter' || e.key == 'Escape')
                                            && e.currentTarget.blur()}
                                    />
                                    <button
                                        className="qty-button increase"
                                        type="button" aria-label="increase"
                                        onClick={() => handleQuantity().increase(product)}>
                                    </button>
                                    <button
                                        className="qty-button decrease"
                                        type="button" aria-label="decrease"
                                        onClick={() => handleQuantity().decrease(product)}>
                                    </button>
                                </div>
                                {notAvailable === product.id &&
                                    <span className="error">
                                        only <b>{product.stock}</b> available
                                    </span>}
                            </td>
                            <td className="sums">
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
    );
}
export default CartPage