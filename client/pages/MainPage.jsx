import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

export const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {status} = useSelector((state) => state.auth)

    const handleClickLogOut = () => {
        dispatch(logout())
        console.log(status)
        navigate('/')
    }
    return <div>
        <button onClick={handleClickLogOut}>LOG OUT</button>
    </div>
}