import React from "react";
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



const Navbar = () => {


    return (
        <header>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs centered>
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Box>


        </header >
    )
}
export default Navbar;