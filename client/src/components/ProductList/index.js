import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/globalState";
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import {UPDATE_PRODUCTS} from '../../utils/actions';

function ProductList() {

    const [state, dispatch] = useStoreContext();
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

    console.log(productData);
    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.allProducts
            });
        };

    })

    return (
        <></>
    )
}
export default ProductList;