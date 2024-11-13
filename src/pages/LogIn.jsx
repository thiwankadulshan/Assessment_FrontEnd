import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../api/axiosCalls";
import { apiEndPoint } from "../api/ApiEndPoints";
import "../styles/LogIn.css"

const LogIn = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const submitLogIn = (e) => {
        e.preventDefault();
        postRequest(apiEndPoint.logIn,{userId : userId, userPassword : userPassword})
        .then((response) => {
            response.data.status === "Success" ? navigate("/dashboard") : navigate("/");
            sessionStorage.setItem("userId",userId);
        })
        .catch((error) => console.error(error))
    }
    return (
        <>
            <div className="main-container">
                <form onSubmit={submitLogIn}>
                    <h1>LogIn</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => setUserId(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required onChange={(e) => setUserPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};

export default LogIn;