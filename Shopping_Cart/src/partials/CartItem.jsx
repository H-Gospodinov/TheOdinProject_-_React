import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function CartItem({ product, update, remove }) {

    const [isEmpty, setIsEmpty] = useState(false);
    const [notAvailable, setNotAvailable] = useState(null);

    const wasEmpty = useRef(false);

    const handleQuantity = (x) => {
        const newQuantity = product.quantity + x;

        if (newQuantity < 1) return;

        if (newQuantity > product.stock) {
            setNotAvailable(product.id);
        } else {
            update(product.id, newQuantity);
            setNotAvailable(null);
        } // buttons only
    };
    return (
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
            <td className="price hide">
                € {product.newPrice ? product.newPrice : product.price}
            </td>
            <td className="qnty action">
                <div className="quantity">
                    <input
                        className="qty-input" name="qty"
                        type="text" aria-label="qty"
                        inputMode="numeric" pattern="\d*"

                        value={isEmpty ? "": String(product.quantity)}

                        onChange={(e) => {
                            const value = e.target.value;
                            if (!value.match(/^\d*$/)) return;
                            if (value === "") {
                                setIsEmpty(true); return;
                            }
                            if (+value > product.stock) {
                                setNotAvailable(product.id);
                            } else {
                                update(product.id, value > 0 ? +value : 1);
                                setNotAvailable(null);
                            }
                            setIsEmpty(false);
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                update(product.id, 1);
                                setIsEmpty(false);
                                wasEmpty.current = true;
                            } // reset quantity
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur();
                            }
                            if (e.key === 'Escape') {
                                e.currentTarget.blur();
                                wasEmpty.current = false;
                            } // allow increment
                        }}/>
                    <button
                        className="qty-button increase"
                        type="button" aria-label="increase"
                        onClick={(e) => {
                            if (!wasEmpty.current) {
                                handleQuantity(1);
                            }
                            wasEmpty.current = false;
                            e.currentTarget.blur();
                        }}>
                    </button>
                    <button
                        className="qty-button decrease"
                        type="button" aria-label="decrease"
                        onClick={(e) => {
                            handleQuantity(-1);
                            wasEmpty.current = false;
                            e.currentTarget.blur();
                        }}>
                    </button>
                </div>
                {notAvailable === product.id &&
                <span className="error">
                    only <b>{product.stock}</b> available
                </span>}
            </td>
            <td className="sum">
                € {((product.newPrice ? product.newPrice : product.price)
                    * product.quantity).toFixed(2)}
            </td>
            <td className="delete">
                <button className="remove" title="Remove" aria-label="remove"
                    onClick={() => remove(product.id)}>
                </button>
            </td>
        </tr>
    );
}
export default CartItem