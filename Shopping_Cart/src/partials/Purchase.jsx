import { Link } from 'react-router-dom'
import { useContext, useState, useRef } from 'react'
import { BasketContext as basket } from '../context/Basket.jsx';

import '../assets/styles/purchase.css'

function Purchase({ product }) {

    const { insert } = useContext(basket);

    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    const modalRef = useRef(null);

    const handleAddToCart = () => {
        if (quantity > product.stock) {
            setMessage(`Only ${product.stock} available`);
        }
        else {
            insert(product, quantity);
            setMessage(`${quantity} added to cart`);
        }
        modalRef.current.showModal();
    };

    return (<>
        <div className={`action ${product.stock ?'':'off'}`}>
            <div className="quantity">
                <input className="qty-input" name="qty" type="text" aria-label="qty"
                    inputMode="numeric" pattern="\d*" value={String(quantity)}
                    onChange={(e) => {
                        const value = e.target.value;
                        value.match(/^\d*$/) && setQuantity(value > 0 ? +value : 1);
                    }} // block non-numbers, empty string, and zero
                    onKeyDown={(e) => e.key == "Enter" && e.currentTarget.blur()}
                />
                <button className="qty-button increase" type="button" aria-label="+"
                    onClick={() => setQuantity((quantity || 0) + 1)}
                ></button>
                <button className="qty-button decrease" type="button" aria-label="-"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                ></button>
            </div>
            <button className="purchase" type="button"
                onClick={handleAddToCart}>
                <span>Add to cart</span>
            </button>
        </div>
        <dialog className="modal-box" ref={modalRef}>
            <div className="status">
                <h4 className="name">{product.name}</h4>
                <span className={quantity > product.stock ?
                    'error' : 'success'}>{message}</span>
            </div>
            {(quantity <= product.stock) &&
                <div className="actions">
                    <Link className="link" to="/cart">Go to cart</Link>
                    <Link className="link" to="/shop" onClick={() => {
                        modalRef.current.close();
                        window.scrollTo({top: 0, behavior:'smooth'});
                    }}>Browse more</Link>
                </div>
            } <button className="close" aria-label="close"
                onClick={() => modalRef.current.close()}>
            </button>
        </dialog>
    </>);
}
export default Purchase