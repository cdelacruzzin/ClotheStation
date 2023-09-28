import React, { useState } from "react";
import Auth from '../../utils/auth';
import { Link as RouterLink } from "react-router-dom";

import { Box } from "@mui/system";
import { Tabs, Tab, Link as MuiLink } from '@mui/material';
import { useStoreContext } from "../../utils/globalState";
import {UPDATE_CURRENT_CATEGORY} from '../../utils/actions';



const Navbar = () => {

    const [value, setValue] = useState(0);  // Start with first tab
    const [state, dispatch] = useStoreContext();


    function resetCategory() {
        console.log(state)
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: {id:'', name:''}
        })
    }
    return (
        <header>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}>


                <MuiLink
                    component={RouterLink}
                    to='/'
                    underline='none'
                    onClick={resetCategory}
                >
                    <span className="logo"></span>
                    URBAN SK8
                </MuiLink>


                <Tabs centered value={value} onChange={(e, newValue) => setValue(newValue)}>
                    <Tab label="page One" />
                    <Tab label="page Two" />
                    <Tab label="page Three" />
                </Tabs>
                <button onClick={Auth.logout}>logout</button>
                <button>
                    <a href='/login' className='button-style'>login</a>

                </button>


                <div>
                    profile
                </div>

            </Box>
        </header >
    )
}
export default Navbar;