import { useState } from 'react'

function Purchase() {

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="action">
            <div className="quantity">
                <input className="input" name="qty" type="text" aria-label="qty"
                    inputMode="numeric" pattern="\d*" value={quantity}
                    onChange={(e) => {
                        const value = e.target.value;
                        value.match(/^\d*$/) && setQuantity(value > 0 ? value : 1);
                    }} // block non-numbers, empty string, and zero
                    onKeyDown={(e) => e.key == "Enter" && e.currentTarget.blur()}
                />
                <button className="button increase" type="button" aria-label="+"
                    onClick={() => setQuantity(String((+quantity || 0) + 1))}
                ></button>
                <button className="button decrease" type="button" aria-label="-"
                    onClick={() => quantity > 1 && setQuantity(String(+quantity - 1))}
                ></button>
            </div>
            <button className="purchase" type="button">
                <span>Add to cart</span>
            </button>
        </div>
    );
}
export default Purchase