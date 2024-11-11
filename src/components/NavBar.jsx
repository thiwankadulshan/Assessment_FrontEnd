import React from "react";
import Button from "./Button";
import "../styles/NavBar.css"

const Navbar = () => {
    const dashBord = ["DashBord", "primary", "/dashbord"];
    const addItem = ["Add Item", "primary", "/addItem"];
    const logOut = ["Log Out", "danger", "/"]
    return(
        <>
            <div className="navbar-main-container">
                <div className="navbar-leftside">
                    <Button message={dashBord}/>
                    <Button message={addItem}/>
                </div>
                <div className="navbar-rightside">
                    <Button message={logOut}/>
                </div>
            </div>
        </>
    );
};
export default Navbar;