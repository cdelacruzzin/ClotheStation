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


    const categoryElements = Object.keys(categoryImages).map(category => (
        <div key={category}>
            <div className="category-image">
                <img src={categoryImages[category].web} alt={`Category hero for ${category.toLowerCase()}`} />
                <Link to="/categories">
                    <button className="btn outlined">Shop Collection</button>
                </Link>
            </div>
            <div className="category-image--mobile">
                <img src={categoryImages[category].mobile} alt={`Category hero for ${category.toLowerCase()}`} />
                <Link to="/categories">
                    <button className="btn">Shop Collection</button>
                </Link>
            </div>
        </div>
    ));
    return (
        <>
            {/* {!currentCategory? (
                    <p>home</p>
                ): (
                    <p>{currentCategory.name}</p>
                )}
                {categories.map((item) => (

                    <button
                    style={{ background: 'blue', margin: '3px' }}
                        key={item._id}
                        onClick={()=>{
                            selectCategory(item);
                        }}
                    >
                        {item.name}
                    </button>


                ))} */}
            {/* === PRODUCT CATEGORIES === */}
            <div id="home-categories">
                <h1>Shop Collections</h1>
                <div id="categories--images">

                    {categoryElements}
                    {/* <div className="category-image">
                        <img src={CategoryImgTee} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn outlined">Shop Collection</button>
                        </Link>
                    </div>
                    <div className="category-image--mobile">
                        <img src={CategoryImgTeeMobile} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn">Shop Collection</button>
                        </Link>
                    </div>

                    <div className="category-image">
                        <img src={CategoryImgShoe} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn outlined">Shop Collection</button>
                        </Link>
                    </div>
                    <div className="category-image--mobile">
                        <img src={CategoryImgShoeMobile} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn">Shop Collection</button>
                        </Link>
                    </div>

                    <div className="category-image">
                        <img src={CategoryImgHoodie} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn outlined">Shop Collection</button>
                        </Link>
                    </div>
                    <div className="category-image--mobile">
                        <img src={CategoryImgHoodieMobile} alt="Category hero for shoes" />
                        <Link to="/categories">
                            <button className="btn">Shop Collection</button>
                        </Link>
                    </div>*/}
                </div> 
            </div>



        </>
    )
}
export default CategoryMenu;