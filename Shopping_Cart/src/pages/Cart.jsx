import { useContext, useRef } from 'react'
import { BasketContext as data } from '../context/Basket.jsx'
import { useNavigate, Link } from 'react-router-dom'
import CartItem from '../partials/CartItem.jsx'

import '../assets/styles/basket.css'

import visa from '../assets/icons/card1.png'
import master from '../assets/icons/card2.png'

function CartPage() {

    const currentBasket = useContext(data).basket;
    const { update, remove } = useContext(data);

    const termsRef = useRef(null);
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
                        <th>sum</th>
                        <th>remove</th>
                    </tr></thead>
                    <tbody>
                        {currentBasket.map(product => {
                            return <CartItem
                                key={product.id} product={product}
                                update={update} remove={remove}
                            /> // table row
                        })}
                    </tbody>
                </table>
                <div className="summary">
                    <div className="payment">
                        <div className="methods">
                            <img src={visa} alt="" width="56" height="39" />
                            <img src={master} alt="" width="40" height="28" />
                        </div>
                        <strong className="total">
                            €{currentBasket.reduce((total, product) => {
                            const price = product.newPrice ? product.newPrice : product.price;
                            return total + (price * product.quantity)}, 0).toFixed(2)}
                        </strong>
                    </div>
                    <div className="shipping">
                        <p>shipping calculated at checkout</p>
                    </div>
                    <div className="terms">
                        <input type="checkbox" id="terms" ref={termsRef}
                            onChange={() => termsRef.current.classList.remove('void')} />
                        <label htmlFor="terms">Accept terms of service</label>
                        <Link className="link" to="/demo">(read)</Link>
                    </div>
                </div>
                <div className="actions">
                    <button className="button discard"
                        onClick={() => remove()}>Remove products
                    </button>
                    <button className="button checkout"
                        onClick={() => {
                            termsRef.current.checked ? navigate("/demo")
                            : termsRef.current.classList.add('void');
                        }}>Proceed to checkout
                    </button>
                </div>
            </div>
        </section> : <p className="title not-found">Cart is empty</p>
    );
}
export default CartPage