import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/globalState";
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
function ProductList() {

    const [state, dispatch] = useStoreContext();
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

    useEffect(() => {
        if (productData) {
            dispatch({
                
            })
        }

    })

    return (
        <></>
    )
}
export default ProductList;