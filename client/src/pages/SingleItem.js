import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { SET_CURRENT_PRODUCT } from '../utils/actions';

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

    console.log({ state })
    console.log({ selectedProduct })
    return (
        <>
            {selectedProduct ? (
                <div style={{ background: 'red' }}>
                    <Link to='/'>← Back to Products</Link>
                    <p>
                        <img
                            src={`/images/${selectedProduct.imageSource}`}
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
                        >Add To Cart</button>
                    </div>
                </div>
            ) : null}


        </>
    )
}
export default SingleProduct;