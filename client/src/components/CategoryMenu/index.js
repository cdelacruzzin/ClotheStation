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
    }, [categoryData])


     const selectCategory = (item)=>{

        const {id, name} = item;
        console.log(name)
        console.log(id)
        // console.log(categoryData)
        // console.log({currentCategory})
        // console.log(state)
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: {id: id, name: name}
        });
     };

    console.log({currentCategory})
    return (
        <>
                {!currentCategory? (
                    <p>home</p>
                ): (
                    <p>{currentCategory.name}</p>
                )}
                {categories.map((item) => (

                    <button
                        key={item.id}
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