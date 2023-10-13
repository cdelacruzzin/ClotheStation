import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/globalState";
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import ProductItem from '../ProductItem';
import { CarouselItem } from "../CarouselItem";

function ProductList() {

    const [state, dispatch] = useStoreContext();
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);
    const { products, currentCategory } = state;

    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.allProducts
            });
        };
        console.log(products)
    }, [dispatch, productData])
    
    return (
        <>
            {products.map((item) => (

                <ProductItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.imageSource}

                />
            ))}
        </>
    )
}
export default ProductList;