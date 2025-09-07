
function Product({ product }) {

    return (
        <div className="product">
            <div className="picture">
                <img src={product.image} alt={product.name} width="304" height="304" />
            </div>
            <div className="data">
                <h3>{product.name}</h3>
                <span>{product.price}</span>
                {product.discount && <span>{product.discount} off</span>}
            </div>
        </div>
    );
}
export default Product