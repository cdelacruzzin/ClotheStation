import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/globalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { useMemo } from 'react';

// use stripePromise for testing and insert api key in loadStripe
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    const filterProductsForCheckout = () => {
        return state.cart.map(product => ({
            _id: product._id,
            purchaseQuantity: product.purchaseQuantity,
            name: product.name,
            image: product.imageSource, // note the change from imageSource to image
            price: product.price,
            // If ProductInput requires a quantity field, add it here. Otherwise, omit.
        }));
    };


    // execute query when user wants to execute query
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    useEffect(() => {
        if (data) {
            // once data received load stripe and then redirect to checkout
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {

            console.log(state)
            // get cart items from index db
            // const cart = await idbPromise('cart', 'get');
            // dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch, state]);

    // execute toggle cart action
    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    // calculate total price of products inside cart
    console.log(...state.cart)
    // function calculateTotal() {
    //     getCheckout({
    //         variables: {
    //             products: [...state.cart],
    //         },
    //     });
    // }


    useEffect(() => {
        getCheckout({
            variables: {
                products: filterProductsForCheckout(),
            },
        });
    }, [state.cart, getCheckout]);




    const total = useMemo(() => {
        return state.cart.reduce((acc, item) => acc + item.price, 0);
    }, [state.cart]);




    const submitCheckout = () => {
        getCheckout({
            variables: {
                products: filterProductsForCheckout(),
            },
        });
    };


    if (!state.cartOpen) {
        return (
            // toggle Cart to open once it's closed
            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="trash">
                    🛒
                </span>
            </div>
        );
    }

    console.log(Auth.loggedIn())
    return (
        <div className="cart">
            <div className='close' onClick={toggleCart}>
                [close]
            </div>
            <h2>Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}


                    <div>
                        {/* <strong>Total: ${calculateTotal()}</strong> */}
                        <strong>Total: ${total}</strong>


                        {Auth.loggedIn() ? (
                            <button onClick={submitCheckout}>checkout</button>
                        ) : (
                            <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
            ) : (
                <h3>
                    <span role='img' aria-label="prohibited">
                        🚫
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;