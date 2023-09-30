import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';


import { useStoreContext } from "../../utils/globalState";

import { QUERY_CATEGORIES } from '../../utils/queries';
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';


function CategoryMenu() {
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


     const selectCategory = (item)=>{

        const {_id, name} = item;
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: {id: _id, name: name}
        });
     };
    return (
        <>
                {!currentCategory? (
                    <p>home</p>
                ): (
                    <p>{currentCategory.name}</p>
                )}
                {categories.map((item) => (

                    <button
                        key={item._id}
                        onClick={()=>{
                            selectCategory(item);
                        }}
                    >
                        {item.name}
                    </button>


                ))}

        </>
    )
}
export default CategoryMenu;