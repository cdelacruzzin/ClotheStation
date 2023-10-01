import React, { useEffect } from "react";
import { useStoreContext } from "../utils/globalState";
import ProductItem from '../components/ProductItem';
import { ProductCarousel } from "../components/ProductCarousel";
import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS } from '../utils/actions';


function CategoryPage() {

    const [state, dispatch] = useStoreContext();
    const { products, currentCategory, categories } = state;
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

    function selectCategory() {
        if (!currentCategory.id) {
            return categories;
        } else {
            console.log('returning og')
            return products.filter((item) => item.category.some(category => category._id === currentCategory.id));
        }
    }
    console.log(state)
    return (
        <>
            <h2>{currentCategory.name}</h2>
            {
                currentCategory.id ?
                    selectCategory().map((item) => (
                        <ProductCarousel key={item._id}>
                            <ProductItem
                                _id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.imageSource}
                            />
                        </ProductCarousel>
                    ))
                    : null
            }




        </>
    )
}
export default CategoryPage;