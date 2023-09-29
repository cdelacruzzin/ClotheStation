import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/globalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();

    // destructure product into item
    const {
        image,
        name,
        _id,
        price,
        quantity
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

    return (
        <div><div className="card">
            <Link to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`} />
                <p>{name}</p>
            </Link>
        </div><div>
                <div>{quantity} {pluralize("item", quantity)} in stock</div>
                <span>${price}</span>
                <button onClick={addToCart}>Add to cart</button>
            </div></div>  
    );
}

export default ProductItem;