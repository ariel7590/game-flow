import React from "react";
import Button from '@mui/material/Button';


type kaki={
    shalom: string;
}

const NavBar:React.FC<kaki>=(props)=>{
    const ho=props.shalom;
    return (
        <div className="font-bold text-3xl">
            {ho}
            <Button variant="contained" className="bg-green-500">Hello world</Button>
            <button className="bg-green-500">suka</button>
        </div>
    )
}

export default NavBar;