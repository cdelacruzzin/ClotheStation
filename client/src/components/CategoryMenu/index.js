import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';


import { useStoreContext } from "../../utils/globalState";

import { QUERY_CATEGORIES } from '../../utils/queries';
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';



import CategoryImgTee from "../../assets/home/category_image_tee.png";
import CategoryImgShoe from "../../assets/home/category_image_shoe.png";
import CategoryImgHoodie from "../../assets/home/category_image_hoodie.png";

import CategoryImgTeeMobile from "../../assets/home/category_image_tee_mobile.svg";
import CategoryImgShoeMobile from "../../assets/home/category_image_shoe_mobile.svg";
import CategoryImgHoodieMobile from "../../assets/home/category_image_hoodie_mobile.svg";




function CategoryMenu() {

    const categoryImages = {
        Tees: {
            web: CategoryImgTee,
            mobile: CategoryImgTeeMobile
        },
        Shoes: {
            web: CategoryImgShoe,
            mobile: CategoryImgShoeMobile
        },
        Hoodies: {
            web: CategoryImgHoodie,
            mobile: CategoryImgHoodieMobile
        }
    }

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const [state, dispatch] = useStoreContext();
    const { categories, currentCategory } = state;
    
    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.allCategories
            })
        }
    }, [categoryData, dispatch])

    const selectCategory = (item) => {
        const { _id, name } = item;
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: { id: _id, name: name }
        });
    };
    return (
        <>
            {/* === PRODUCT CATEGORIES === */}
            <div id="home-categories">
                <h1>Shop Collections</h1>
                <div id="categories--images">
                    {categories.map(category => {
                        const categoryName = category.name;
                        const images = categoryImages[categoryName];

                        if (!images) return null; // Skip categories that don't have images in categoryImages object.

                        return (
                            <div key={category._id}>
                                <Link to="/categories">
                                    <div className="category-image">
                                        <img src={images.web} alt={`Category hero for ${categoryName.toLowerCase()}`} />
                                        <button className="btn outlined" onClick={() => {
                                            selectCategory(category);
                                        }}>Shop Collection</button>
                                    </div>
                                </Link>
                                <Link to="/categories">
                                    <div className="category-image--mobile">
                                        <img src={images.mobile} alt={`Category hero for ${categoryName.toLowerCase()}`} />
                                        <button className="btn" onClick={() => {
                                            selectCategory(category);
                                        }}>Shop Collection</button>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}

                </div >
            </div >



        </>
    )
}
export default CategoryMenu;