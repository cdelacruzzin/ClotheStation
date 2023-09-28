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
    const { categories } = state;
    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.allCategories
            })
        }
    }, [categoryData])


     const selectCategory = (id)=>{
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
     };

    
    return (
        <>
                {categories.map((item) => (

                    <button
                        key={item.id}
                        onClick={()=>{
                            selectCategory(item.id);
                        }}
                    >
                        {item.name}
                    </button>


                ))}

        </>
    )
}
export default CategoryMenu;