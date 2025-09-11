import { useState } from 'react'

import '../assets/styles/product.css'

function Product({ product }) {

    const [quantity, setQuantity] = useState(1);

    const price = parseFloat(product.price.slice(1)).toFixed(2);
    const discount = product.discount ? parseFloat(product.discount.slice(0, -1)) : null;
    const newPrice = (price - (price * (discount / 100))).toFixed(2);

    return (
        <div className="product">
            <div className="upper">
                <img src={product.image} alt={product.name} width="300" height="300" />
                <div className="action">
                    <div className="quantity">
                        <input className="input" name="qty" type="text"
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
                    <button className="purchase" type="button">Add to cart</button>
                </div>
            </div>
            <div className="lower">
                <h2 className="name">{product.name}</h2>
                <div className="prices">
                    {discount && <span className="price new">€{newPrice}</span>}
                    <span className={`price ${discount && 'old'}`}>{product.price}</span>
                    {discount && <span className="discount">{product.discount} off</span>}
                </div>
            </div>
        </div>
    );
} export default Product