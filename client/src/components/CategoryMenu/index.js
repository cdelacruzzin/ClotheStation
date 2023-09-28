import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';

import { Box } from "@mui/system";
import { Tabs, Tab, Link as MuiLink } from '@mui/material';


import { useStoreContext } from "../../utils/globalState";

import { QUERY_CATEGORIES } from '../../utils/queries';


function CategoryMenu() {
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const [state, dispatch] = useStoreContext();
    // console.log(state)
    const { categories } = state;



    // console.log({ categories });

    useEffect(() => {
        console.log(categoryData);
        if(categoryData){
            dispatch({
                
            })
        }
    }, [categoryData])



    return (
        <>


            <Tabs centered>
                {categories.map((item)=>(
                    <button
                    key={item.name}>

                    </button>
                ) ) }

            </Tabs>

        </>
    )
}
export default CategoryMenu;