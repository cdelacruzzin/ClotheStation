import React, { useEffect } from "react";
import { useStoreContext } from "../utils/globalState";
import ProductItem from '../components/ProductItem';
import { ProductCarousel } from "../components/ProductCarousel";
import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS } from '../utils/actions';


function CategoryPage() {

    const [state, dispatch] = useStoreContext();
    const { products, currentCategory } = state;
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);
  




    // useEffect(() => {
    //     if (productData) {
    //         dispatch({
    //             type: UPDATE_PRODUCTS,
    //             products: productData.allProducts
    //         });
    //     };
    // }, [dispatch, productData])



    
    function selectCategory() {
        if (!currentCategory.id) {
            return products;
        } else {
            console.log('returning og')
            return products.filter((item) => item.category.some(category => category._id === currentCategory.id));
        }
    }
    console.log('Products:', products);
    console.log('Current Category:', currentCategory);
    console.log('Filtered Products:', selectCategory());

    return (
        <>
            <h2>{currentCategory.name}</h2>
            {selectCategory().map((item) => (
                <ProductCarousel>
                    <ProductItem
                        key={item._id}
                        _id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.imageSource}
                    />
                </ProductCarousel>

            ))}
        </>
    )
}
export default CategoryPage;