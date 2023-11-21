import React from "react";
import * as navbarStyle from './navbar.tailwind';



const NavBar=()=>{
    return (
        <div className={navbarStyle.navbarContainer}>
            <h2>Game Flow</h2>
            <div className={navbarStyle.signIn}>Sign In</div>
        </div>
    )
}

export default NavBar;