import { useContext } from 'react'
import { BasketContext as data } from '../context/Basket.jsx'
import { Link } from 'react-router-dom'

import '../assets/styles/badge.css'

import icon from '../assets/icons/basket.svg'

function CartBadge() {

    const { basket } = useContext(data);

    const totalInCart = basket.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    return (
        <div className="basket">
            <Link to="/cart">
                <img src={icon} alt="" width="42" height="42" />
            </Link>
            {(totalInCart > 0) &&
                <span className="badge">{totalInCart}
            </span>}
        </div>
    );
}
export default CartBadge