import React from "react";
import * as navbarStyle from './navbar.tailwind';
import { Link } from "react-router-dom";



const NavBar=()=>{
   

    return (
        <div className={navbarStyle.navbarContainer}>
            <Link to="/" className={navbarStyle.logo}><h2>Game Flow</h2></Link>
            <Link to="/login" className={navbarStyle.signIn}>Sign In</Link>
        </div>
    )
}

export default NavBar;