import { useState } from 'react'

import '../assets/styles/product.css'

function Product({ product }) {

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product">
            <div className="upper">
                <img src={product.image} alt={product.name} width="300" height="300" />
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
                </div> {/*available on hover*/}
            </div>
            <div className="lower">
                <h2 className="name">{product.name}</h2>
                <div className="prices">
                    {product.newPrice && <> {/*discounted*/}
                        <span className="price new">€{product.newPrice}</span>
                        <span className="discount">{product.discount} off</span>
                    </>}
                    <span className={`price ${product.newPrice && 'old'}`}>€{product.price}</span>
                </div>
            </div>
        </div>
    );
} export default Product