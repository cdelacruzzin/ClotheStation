import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/globalState";
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';

function ProductList() {

    const [state, dispatch] = useStoreContext();
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

    const { products } = state;
    // console.log(productData);
    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.allProducts
            });
        };

    }, [productData])



    const { currentCategory } = state;

    
    function selectCategory() {
        if (!currentCategory) {
            return state.products;
        } else {
            //TODO: for this to work, we need to have a category reference id in the product model
            return state.products.filter((item) => item.category === currentCategory);
        }
    }

    console.log(selectCategory())
    return (
        <>
            {selectCategory().map((item) => (
                <div style={{ background: 'red' }} key={item._id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <small>ID: {item._id}</small>
                </div>
            ))}


        </>
    )
}
export default ProductList;