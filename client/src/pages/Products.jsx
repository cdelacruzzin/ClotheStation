import React, { useEffect } from "react";
import { useStoreContext } from "../utils/globalState";
import ProductItem from '../components/ProductItem';
import { ProductCarousel } from "../components/ProductCarousel";
import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS } from '../utils/actions';

function Products() {
    const [state, dispatch] = useStoreContext();
    const { products, currentCategory } = state;
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.allProducts
            });
        };
    }, [dispatch, productData])

    return (
        <>
        <ProductCarousel>
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
            </ProductCarousel>
        </>
    )
}
export default Products;