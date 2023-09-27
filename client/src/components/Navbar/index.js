import React from "react";
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";


const Navbar = ()=>{


    return (
        <header>
            <h1>
                <Link to="/" className="home-link">
                    <span></span>
                    URBAN SK8
                </Link>
            </h1>
        </header>
    )


}
export default Navbar;