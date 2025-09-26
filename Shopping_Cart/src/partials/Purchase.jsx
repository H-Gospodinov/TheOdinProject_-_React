import { Link } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { BasketContext as data } from '../context/Basket.jsx';

import '../assets/styles/purchase.css'

function Purchase({ product }) {

    const { basket, insert } = useContext(data);

    const [quantity, setQuantity] = useState(1);
    const [validation, setValidation] = useState(null);

    const modalRef = useRef(null);
    const modalReset = () => setTimeout(() => {
        setValidation(null);
    }, 400); // match css

    useEffect(() => {
        if (validation && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [validation]);

    const handleAddToCart = () => {
        const inBasket = basket.find(added => {
            return added.id === product.id
        });
        const basketQty = inBasket?.quantity || 0;
        const totalQty = quantity + basketQty;

        if (totalQty > product.stock) {
            setValidation({status: 'error',
            message: `Only ${product.stock} available` + (
            basketQty ? ` (${basketQty} already added)` :'')});
        }
        else {
            insert(product, quantity);
            setValidation({status: "success",
            message: `${quantity} added to cart`});
        }
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
        {validation && // feedback message
        <dialog className="modal-box" ref={modalRef}>
            <div className="status">
                <h4 className="name">{product.name}</h4>
                <span className={validation.status}>{validation.message}</span>
            </div>
            {validation.status == "success" &&
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