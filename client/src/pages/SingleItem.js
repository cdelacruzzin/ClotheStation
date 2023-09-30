import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {QUERY_PRODUCT} from '../utils/queries';
import { useQuery } from "@apollo/client";
import SET_CURRENT_PRODUCT from '../utils/actions';

function SingleProduct(){
    const {loading, data: queryProduct} = useQuery(QUERY_PRODUCT, {
        variables: useParams()
    });

    const [state, dispatch] = useStoreContext();

    const {products, cart, selectedProduct} = state;

    console.log(queryProduct.product)
    // console.log({products})

    const [currentProduct, setCurrentProduct] = useState({});
    // console.log(currentProduct)

    useEffect(()=>{
        //if thjere is already a selected item in global state
        if(selectedProduct){
            setCurrentProduct(selectedProduct);
        } 
        //retrieve from server
        else if (queryProduct){
            dispatch({
                type: SET_CURRENT_PRODUCT,
                selectedProduct: queryProduct.product,
            })
        }
    })

    return (
        <></>
    )
}
export default SingleProduct;