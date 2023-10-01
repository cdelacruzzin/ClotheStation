import React from "react";
import { useStoreContext } from "../utils/globalState";
import ProductItem from '../components/ProductItem';
import { ProductCarousel } from "../components/ProductCarousel";

function CategoryPage() {

    const [state, dispatch] = useStoreContext();
    const { products, currentCategory } = state;

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