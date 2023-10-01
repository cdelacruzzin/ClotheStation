import React , { useEffect }from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/globalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();
console.log(item)
    // destructure product into item
    const {
        image,
        name,
        _id,
        price,
        quantity,
        description
    } = item;



    // declare a cart for the start
    const { cart } = state

    // add to cart function 
    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                // update cart quantity if item is in cart
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            // add item also in the index db
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            // execute add to cart action and add it to index db
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    // console.log(state)
    return (
        <>
            <Link to={`/products/${_id}`}>
                <div className="carousel-item">
                    <div className="item--image">
                    <img alt={name} src={image} />
                    </div>
                    <div className="item--info">
                        <h1 className="item--name">{name}</h1>
                        <p className="itme--info-price">$ {price} CAD</p>
                    </div>
                </div>
            </Link>
        </>

    );
}

export default ProductItem;