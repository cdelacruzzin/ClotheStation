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

