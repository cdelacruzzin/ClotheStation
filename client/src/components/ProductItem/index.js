import React , { useEffect }from "react";
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
        quantity,
        description
    } = item;



    // declare a cart for the start
    const { cart } = state
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