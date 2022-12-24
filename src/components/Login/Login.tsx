import React from "react";
import {MouseEventHandler} from "react";

const Login = () => {

    const login = (evt: any) => {
        evt.preventDefault();
    }

    return (
        <button className="btn" onClick={login}></button>
    )
}
export default Login;