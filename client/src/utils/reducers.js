import { useReducer } from "react";
//TODO: import actions.
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_PRODUCTS,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  SET_CURRENT_PRODUCT
} from "./actions";

/**this reducer function is the main function to manage the global state based on dispatch actions.
 * it takes two Parameters:
 * 1) state:
 * - contains the current state(or the state before any dispatch changes), which is the accumulation of all dispatch actions.
 * - It is the most updated state of the app.
 * 2) action:
 *  - an object representing the instructions you want to apply to the (global)state.
 *  - it may contain 2 parameters:
 *      *type: this property is the modification type you want to apply.
 *      * an additional property: additional data to determine how the state should change*/
export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

      case SET_CURRENT_PRODUCT:
        return {
          ...state,
          selectedProduct: action.selectedProduct,
        };

    // lets user add multiple products to the cart array
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // toggle cart open
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    // remove item from cart based on product id
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      // return new state and display new cart as open if more than 0 items
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    // update quantity of items in the cart to resemble purchasequantity
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    // add single product to cart
    case ADD_TO_CART: 
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      }
    
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  // The `useReducer` function accepts a reducer function and an initial state as its arguments.
  /** 1) Reducer function:
   * a function that takes the current state and an action object, and returns the new state
   *  2) initialState:
   * the starting state for the app component. it's the state before any actions have been dispatched
   *
   * the useReducer hook returns an array of two elements:
   *    -the current state(based on all the actions that have been dispatched)
   *    - the dispatch function, which is used to dispatch actions to modify the state*/
  return useReducer(reducer, initialState);
}
