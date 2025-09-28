import { Link } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { BasketContext as data } from '../context/Basket.jsx';

import '../assets/styles/purchase.css'

function Purchase({ product }) {

    const { basket, insert } = useContext(data);

    const [quantity, setQuantity] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);

    const [feedback, setFeedback] = useState(null);

    const buttonRef = useRef(null);
    const modalRef = useRef(null);
    const wasEmpty = useRef(false);
    const cartLocked = useRef(false);

    const inputReset = () => {
        wasEmpty.current = false;
        cartLocked.current = false;
    }
    const modalReset = () => setTimeout(() => {
        setFeedback(null);
    }, 400); // match css

    useEffect(() => {
        if (feedback && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [feedback]);

    const handleAddToCart = () => {
        if (cartLocked.current) {
            // action disabled
            setFeedback({
                status: 'error',
                message: 'At least 1 is required.'
            });
            cartLocked.current = false;
            wasEmpty.current = false;
            return;
        }
        const inBasket = basket.find(added => {
            return added.id === product.id
        });
        const basketQty = inBasket?.quantity || 0;
        const totalQty = quantity + basketQty;

        if (totalQty > product.stock) {
            setFeedback({
                status: 'error',
                message: `Only ${product.stock} available` +
                (basketQty ? ` (${basketQty} already added)` :''),
            });
        } else {
            insert(product, quantity);
            setFeedback({
                status: 'success',
                message: `${quantity} added to cart`,
        });}
    };
    return (<>
        <div className={`action ${product.stock ?'':'off'}`}>
            <div className="quantity">
                <input
                    className="qty-input" name="qty"
                    type="text" aria-label="qty"
                    inputMode="numeric" pattern="\d*"

                    value={isEmpty ? "": String(quantity)}

                    onChange={(e) => {
                        const value = e.target.value;
                        if (!value.match(/^\d*$/)) {
                            return; // non-numeric
                        }
                        if (value === "") {
                            setIsEmpty(true); // empty
                        } else {
                            setQuantity(+value);
                            setIsEmpty(false);
                        }
                        // disable if zero or empty
                        cartLocked.current =
                            +value < 1 ? true : false;
                    }}
                    onBlur={(e) => {
                        if (+e.target.value < 1) {
                            setQuantity(1);
                            setIsEmpty(false);
                            wasEmpty.current = true;
                        } // 0 or empty
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            buttonRef.current.focus();
                            e.currentTarget.blur();
                        }
                        if (e.key === 'Escape') {
                            cartLocked.current = false;
                            e.currentTarget.blur();
                            wasEmpty.current = false;
                    }}} />
                <button
                    className="qty-button increase"
                    type="button" aria-label="increase"
                    onClick={(e) => {
                        if (!wasEmpty.current) {
                            setQuantity(quantity + 1);
                        } inputReset();
                        e.currentTarget.blur();
                    }}>
                </button>
                <button
                    className="qty-button decrease"
                    type="button" aria-label="decrease"
                    onClick={(e) => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1);
                        } inputReset();
                        e.currentTarget.blur();
                    }}>
                </button>
            </div>
            <button className="purchase" type="button"
                ref={buttonRef} onClick={(e) => {
                    handleAddToCart();
                    e.currentTarget.blur();
                }}>
                <span>Add to cart</span>
            </button>
        </div>
        {feedback && // feedback message
        <dialog className="modal-box" ref={modalRef}>
            <div className="status">
                <h4 className="name">{product.name}</h4>
                <span className={feedback.status}>
                    {feedback.message}</span>
            </div>
            {feedback.status == "success" &&
            <div className="actions">
                <Link className="link" to="/cart">Go to cart</Link>
                <Link className="link" to="/shop"
                    onClick={() => {
                    modalRef.current.close(); modalReset();
                    window.scrollTo({top: 0, behavior:'smooth'});
                }}>Browse more</Link>
            </div>}
            <button className="close" aria-label="close"
                onClick={() => {
                    modalRef.current.close(); modalReset();
            }}></button>
        </dialog>}
    </>);
}
export default Purchase