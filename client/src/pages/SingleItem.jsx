import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useMutation, useQuery } from "@apollo/client";
import { SET_CURRENT_PRODUCT, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from '../utils/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import { idbPromise } from "../utils/helpers";
import "../components/css/SingleItem.scss"


import { SAVEPRODUCT } from "../utils/mutations";

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
        /*
        checkIdb is an async function that returns a boolean.
        it makes a "get" fetch to get all the documents in the "products" store in the indexDB.
        iterates through the "products" store, and checks for a document with the same _id as the _queryProduct's _id.
        returns true if it exists, false if doesnt.
        */
        const checkIdb = async () => {
            if (queryProduct) {
                const indexedProducts = await idbPromise('products', 'get');
                return indexedProducts.some(document => document._id === queryProduct.product._id);
            }
            return false;
        }


        const handleIdb = async () => {
            const res = await checkIdb();   //stores the returned promise value of checkIdb (true/false).

            /*if there are items in the "products" globalstate field,
            it finds a product in the "products" globalstate field with an _id qual to the _id (destructured from useParams()), 
            and sets the "currentProduct" state as this returned document.

            this function runs when you are FIRST redirected to the SingleProduct page after clicking on a product.

            Then puts this product in the "products" store object in the indexDB.
            */
            if (products.length) {
                setCurrentProduct(products.find((product) => product._id === id));
                console.log(products.find((product) => product._id === id))
                idbPromise('products', 'put', products.find((product) => product._id === id));
            } 
            /* else if "res" and "queryProduct" are truthy values. This means that the queryProduct product is already saved in the indexDB.
            This happens AFTER the queryProduct has already been put in the indexDB. This function runs if the queryProduct you are currently querying
             is already saved in the indexDB. 

             it will get that indexed document, dispatch the SET_CURRENT_PRODUCT type and set the selectedProduct as the indexed document product.
             Then, sets the currentProduct state as this product, which was obtained from the indexdb.
            */ 
            else if (res && queryProduct) {
                idbPromise('products', 'get').then((indexedProducts) => {

                    console.log(indexedProducts[0])
                    dispatch({
                        type: SET_CURRENT_PRODUCT,
                        selectedProduct: indexedProducts[0]
                    });
                    setCurrentProduct(indexedProducts[0])
                })

                /*
                this is called when the _id from the params is different the _id from the saved "products" document from indexDB.
                it dispatches the SET_CURRENT_PRODUCT type and set the selectedProduct as the queryProduct.product from the useQuery.
                Essentially, it gets the product from server and sets it as the selectedProduct in the global state.       
                */
            } else if(!res && queryProduct) {
                dispatch({
                    type: SET_CURRENT_PRODUCT,
                    selectedProduct: queryProduct.product,
                });

                setCurrentProduct(queryProduct.product)
                idbPromise('products', 'put', queryProduct.product);


            }
        }
        handleIdb();
       
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


    const [product2save, { error }] = useMutation(SAVEPRODUCT);


    async function saveProduct() {
        // const {name, description, price, imageSource} = selectedProduct;

        const { __typename, _id, ...selectedProductNoTypeName } = selectedProduct;


        const productData = selectedProductNoTypeName;
        // try {
        //     console.log({selectedProductNoTypeName})
        //     const saveProduct = await product2save({
        //         variables: {productData: {selectedProductNoTypeName}}
        //     })
        //     console.log(saveProduct)
        // } catch (error) {
        //     console.error(error);
        // }

    }
    return (
        <>
            {currentProduct ? (
                <div className="single--product-page">
                    <Link to='/products' className="product--page-link"><strong>← Back to Products</strong></Link>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="single-product" style={{ padding: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', borderRadius: '2em', border: '1px solid #000' }} // #000 is just an example for black
                        >
                            <div>
                                <img
                                    src={currentProduct.imageSource}
                                    alt={currentProduct.imageSource}
                                ></img>
                            </div>

                            <h2>
                                {currentProduct.name}
                            </h2>
                            <p>
                                {currentProduct.description}
                            </p>
                            <p className="product-price">
                                {' '}
                                <span>${currentProduct.price}</span>
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