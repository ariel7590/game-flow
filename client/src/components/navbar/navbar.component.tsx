import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as navbarStyle from './navbar.tailwind';
import { Link } from "react-router-dom";
import { ICurrentUser } from "../../redux/users/users.types";
import SignOut from "../sign-out/sign-out.component";


const NavBar=()=>{
   
    const user=useSelector((state: RootState)=>state.users.currentUser);

    return (
        <div className={navbarStyle.navbarContainer}>
            <Link to="/" className={navbarStyle.logo}><h2>Game Flow</h2></Link>
            {
                user.auth
                ?
                <div className={navbarStyle.welcomeUser}><div>Welcome</div> <SignOut username={(user as ICurrentUser).userName} /></div>    
                :
                <Link to="/login" className={navbarStyle.signIn}>Sign In</Link>
            }
            
        </div>
    )
}

export default NavBar;