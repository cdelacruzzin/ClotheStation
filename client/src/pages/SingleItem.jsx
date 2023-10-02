import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { SET_CURRENT_PRODUCT } from '../utils/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

// import "./css/SingleItem.scss";

function SingleProduct() {
    const { loading, data: queryProduct } = useQuery(QUERY_PRODUCT, {
        variables: useParams()
    });
    const [state, dispatch] = useStoreContext();

    const { products, cart, selectedProduct } = state;

    useEffect(() => {
        if (queryProduct) {
            dispatch({
                type: SET_CURRENT_PRODUCT,
                selectedProduct: queryProduct.product,
            })
        }
    }, [dispatch, products, queryProduct, selectedProduct])


    function addToCart(){

    }
    return (
        <>
            {selectedProduct ? (
                <div>
                    <Link to='/'>← Back to Products</Link>
                    <p>
                        <img
                            src={selectedProduct.imageSource}
                            alt={selectedProduct.imageSource}
                        ></img>
                    </p>
                    <h2>
                        {selectedProduct.name}
                    </h2>
                    <p>
                        {selectedProduct.description}
                    </p>
                    <p>
                        <strong>Price:</strong>{' '}
                        ${selectedProduct.price}
                    </p>
                    <div>
                        <button
                        onClick={addToCart}
                        ><FontAwesomeIcon icon={faCartPlus} className="cart-icon"/></button>
                    </div>
                </div>
            ) : null}


        </>
    )
}
export default SingleProduct;