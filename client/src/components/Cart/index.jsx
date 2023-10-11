import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/globalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';


import { Box, Container, height } from '@mui/system';
import Button from '@mui/material/Button';



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


    const total = () => {
        let total = 0;
        filterProductsForCheckout().forEach(element => {
            total += (element.purchaseQuantity * element.price)
            console.log(`Quantity of ${element.name}: ${element.purchaseQuantity}`)
        });
        return Math.round(total);
    }



    // 3. Effects
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [dispatch, state.cart.length]);


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
    // if (!state.cartOpen) {
    //     return (
    //         <div className="cart-closed" onClick={toggleCart}>
    //             <span role="img" aria-label="trash">
    //                 🛒
    //             </span>
    //         </div>
    //     );
    // }
    if (state.cart.length) {
        console.log('state.cart is truthy');
    } else {
        console.log('state.cart is falsy');
    }


    return (
        <Container maxWidth="sm">
            <div className='cart'>
                {Auth.loggedIn()
                    ? (state.cart.length
                        ?
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                                p: 1,
                                m: 1,
                                borderRadius: 5,
                                border:1
                            }}
                        >
                            <Box sx={{ mt: 2 }}>
                                <span className='cart-title-container'>
                                    <span className='cart-title'><strong>Cart</strong></span>
                                    <span className='cart-item-count'> (1 item)</span>
                                </span>
                            </Box>

                            {state.cart.map((item) => (
                                <>
                                    <hr />
                                    <CartItem key={item._id} item={item} />
                                    <hr />
                                </>
                            ))}

                            <Box
                                sx={
                                    {
                                        m: 1,
                                        gap: 1
                                    }
                                }>
                                <strong>{`Total: $${total()} `}</strong>
                                <Button variant="outlined" onClick={submitCheckout}>checkout</Button>


                            </Box>
                        </Box>
                        : <Box sx={{
                            p: 1,
                            my: 10,
                            borderRadius: 1,
                            border: 1
                        }}>Your cart is empty. Add items to your cart!!</Box>)
                    : <Box sx={{
                        p: 1,
                        my: 10,
                        borderRadius: 1,
                        border: 1
                    }}>
                        Log in to check out</Box>
                }
            </div>
        </Container>

    );
};

export default Cart;