import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { SET_CURRENT_PRODUCT, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from '../utils/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

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

    }, [products, queryProduct, loading, dispatch, id]);

    function addToCart() {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
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

    function saveProduct() {

    }
    return (
        <>
            {selectedProduct ? (
                <div className="single--product-page">
                    <Link to='/products' className="product--page-link"><strong>← Back to Products</strong></Link>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="single-product" style={{ padding: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', borderRadius: '2em', border: '1px solid #000' }} // #000 is just an example for black
                        >
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



                            <div style={{ height: 'auto', display: 'flex', justifyContent: "space-evenly" }}>
                                <Button
                                    onClick={addToCart}
                                    variant="contained"
                                ><FontAwesomeIcon icon={faCartPlus} className="cart-icon" /></Button>
                                {/* display successmessage here once add to cart clicked */}

                                <Button
                                    onClick={saveProduct}
                                    variant="contained"
                                ><FontAwesomeIcon icon={faHeart} className="cart-icon" /></Button>
                            </div>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                        </div>

                    </div>

                </div>
            ) : null}


        </>
    )
}
export default SingleProduct;