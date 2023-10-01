import React from "react";
import { useStoreContext } from "../utils/globalState";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_PRODUCT } from '../utils/queries';
import { useQuery } from "@apollo/client";
import ProductItem from '../components/ProductItem';

function CategoryPage(){

    const [state, dispatch] = useStoreContext();
    const {products, currentCategory} = state;

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
        </>
    )
}
export default CategoryPage;