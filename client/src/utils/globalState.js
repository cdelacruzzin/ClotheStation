import React, { createContext, useContext } from "react";

//useProducer is the custom hook that uses "useReducer" to manage state logic
import { useProductReducer } from "./reducers";



const StoreContext = createContext();
/**createContext() is React's context API, which allows you to share VALUES down to child components without using props. 
 * It is like a global variable, but for all components, instead of just the single file.
 * it returns an object with two properties: Provider, and Consumer(or useContext).
 * 
 * the "Provider" is a component that makes a VALUE to be available to all child components(in the component tree).  
 * if a component is nested to a component with a "Provider", the nested component will have access to the value that the "Provider" component provides via useContext.
 * 
 * when a child component want to use/read the value that the provider provides, you use the "useContext" hook in the function components.
 */
const { Provider } = StoreContext;
/** extracts the "Provider" propertry from the StoreContext. This "Provider" will be used to WRAP the component tree where you want components to have access to the react context.*/

const StoreProvider = ({ value = [], ...props }) => {
    /**StoreProvider is a custom component that will be a component that provides the context to the app's global state.
     * The StoreProvider component uses the "useProductReducer" hook to manage the global state, and make both the current state and dispatch function available to the child components.
     * 
     * 1) "value" is a prop that provides initial values. it defaults to [] if the value is not provided.
     * 2) "...props":  collects any other props passed down to "StoreProvider" into an object. This allows the props passed to "StoreProvider" to also be available to child components. */
    const [state, dispatch] = useProductReducer({
        /** useProductReducer is a custom hook which internally uses the `useReducer` hook from React to manage the application state based on actions dispatched.
         * It takes an "InitialState" object as a parameter, which sets the default states for our global context.
         * It returns the return value of the useReducer hook, which is an array of "state" - the current global state of the app, and "dispatch" - a function to dispatch actions to modify the global state.*/
        products: [],
        cart: [],
        categories: [],
        currentCategory: {id: '', name: ''},
        selectedProduct:{},
    });

    return <Provider value={[state, dispatch]} {...props} />;
    //by wrapping components with this "StoreProvider", the nested components will have access to the global state("state"), and a function to modify it("dispatch"), using the "useContext" hook.
};


const useStoreContext = () => {
    //Without this custom hook, every component that wants to access the context would need to import both `useContext` 
    //from React and `StoreContext`. With this hook, they only need to import `useStoreContext`.
    return useContext(StoreContext);
    //returns whatever value is held in the "StoreContext". As set up in "StoreProvider", 
    //it is an array containing the global state ("state"), and the dispatch function ("dispatch")
}


export { StoreProvider, useStoreContext };
