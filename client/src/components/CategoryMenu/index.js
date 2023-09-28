import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';

import { Box } from "@mui/system";
import { Tabs, Tab, Link as MuiLink } from '@mui/material';


import { useStoreContext } from "../../utils/globalState";

import { QUERY_CATEGORIES } from '../../utils/queries';
import {
    UPDATE_CATEGORIES
} from '../../utils/actions';


function CategoryMenu() {
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const [state, dispatch] = useStoreContext();
    // console.log(state)
    const { categories } = state;
    // console.log({ categories });
    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.allCategories
            })
        }
    }, [categoryData])

    //TODO: create an on click event to update current category
    // when a category is clicked, the onClick event will take the category id as parameter.
    //the onclick function will change the state to display only the category of which was clicked


     const selectCategory = (id)=>{
        console.log(id);
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
     };

    console.log(categories)
    
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