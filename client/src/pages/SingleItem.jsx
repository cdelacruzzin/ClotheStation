import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { SET_CURRENT_PRODUCT, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from '../utils/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { idbPromise } from "../utils/helpers";
import "../components/css/SingleItem.scss"

function SingleProduct() {
    const { loading, data: queryProduct } = useQuery(QUERY_PRODUCT, {
        variables: useParams()
    });
    const { id } = useParams();
    const [state, dispatch] = useStoreContext();
    const { products, cart, selectedProduct } = state;
    const [currentProduct, setCurrentProduct] = useState({});
    // success message state
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (queryProduct) {
            dispatch({
                type: SET_CURRENT_PRODUCT,
                selectedProduct: queryProduct.product,
            })
        }
    }, [dispatch, products, queryProduct, selectedProduct]);


    useEffect(() => {
        // already in global store
        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        }         // // retrieved from server
        else if (queryProduct) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: queryProduct.products,
            });

              queryProduct.products.forEach((product) => {
                idbPromise('products', 'put', product);
              });
        }
        // get cache from idb
        else if (!loading) {
              idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: indexedProducts,
                });
              });
        }
        // console.log(currentProduct)

        // console.log(queryProduct)

    }, [products, queryProduct, loading, dispatch, id]);

    function addToCart() {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        console.log(currentProduct)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
              idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
              });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...currentProduct, purchaseQuantity: 1 },
            });
              idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }

        // success message once item added to the cart
        setSuccessMessage(`${currentProduct.name} has been added to the cart successfully!`);

        // display success message for 3 seconds
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    }

    console.log(state)
    return (
        <>
            {selectedProduct ? (
                <div className="single--product-page">
                    <Link to='/products' className="product--page-link">← Back to Products</Link>
                    <div className="single-product">
                        <div>
                        <img
                            src={selectedProduct.imageSource}
                            alt={selectedProduct.imageSource}
                        ></img>
                        </div>
        
                    <h2>
                        {selectedProduct.name}
                    </h2>
                    <p>
                        {selectedProduct.description}
                    </p>
                    <p className="product-price">
                        {' '}
                        <span>${selectedProduct.price}</span>
                        CAD
                    </p>
                    <div>
                        <Button
                            onClick={addToCart}
                            variant="contained"
                        ><FontAwesomeIcon icon={faCartPlus} className="cart-icon" /></Button>
                        {/* display successmessage here once add to cart clicked */}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                    </div>
                </div>
            ) : null}


        </>
    )
}
export default SingleProduct;