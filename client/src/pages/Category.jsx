import React, { useEffect } from "react";
import { useStoreContext } from "../utils/globalState";
import ProductItem from "../components/ProductItem";
import { ProductCarousel } from "../components/ProductCarousel";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { UPDATE_PRODUCTS } from "../utils/actions";
import CategoryMenu from "../components/CategoryMenu";

function CategoryPage() {
  const [state, dispatch] = useStoreContext();
  const { products, currentCategory, categories } = state;
  const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);

  function selectCategory() {
    if (!currentCategory.id) {
      return <CategoryMenu />;
    } else {
      console.log("returning og");
      return products.filter((item) =>
        item.category.some((category) => category._id === currentCategory.id)
      );
    }
  }
  console.log(state);
  return (
    <>
      <h2>{currentCategory.name}</h2>
      <ProductCarousel>
        {currentCategory.id
          ? selectCategory().map((item) => (
              <ProductItem
                key={item._id}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageSource}
              />
            ))
          : selectCategory()}
            </ProductCarousel>
    
    </>
  );
}
export default CategoryPage;
