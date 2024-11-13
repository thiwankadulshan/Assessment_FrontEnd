import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({message}) => {
    const navigate = useNavigate();
    const [name, type, path] = message|| [];

    const handleOnClick = () => {
        path === "/" ? (sessionStorage.clear(), localStorage.clear(), navigate(path)) : navigate(path)
    }
    return(
        <>
            <button className={`btn btn-${type}`} onClick={handleOnClick}>{name}</button>
        </>
    );
};
export default Button;