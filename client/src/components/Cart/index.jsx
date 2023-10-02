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
    // 1. Hooks and State Management
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // 2. Helper Functions
    const filterProductsForCheckout = () => {
        return state.cart.map(product => ({
            _id: product._id,
            purchaseQuantity: product.purchaseQuantity,
            name: product.name,
            image: product.imageSource, // note the change from imageSource to image
            price: product.price,
        }));
    };

    const total = useMemo(() => {
        return state.cart.reduce((acc, item) => acc + item.price, 0);
    }, [state.cart]);

    // 3. Effects
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        console.log(state)
        async function getCart() {
            console.log(state);
            // const cart = await idbPromise('cart', 'get');
            // dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch, state]);

    useEffect(() => {
        getCheckout({
            variables: {
                products: filterProductsForCheckout(),
            },
        });
    }, [state.cart, getCheckout]);

    // 4. Event Handlers
    const toggleCart = () => {
        dispatch({ type: TOGGLE_CART });
    };

    const submitCheckout = () => {
        getCheckout({
            variables: {
                products: filterProductsForCheckout(),
            },
        });
    };

    // 5. Render Logic
    if (!state.cartOpen) {
        return (
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