import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../redux/features/auth/authSlice";
import axios from 'axios'
import { useParams } from "react-router-dom";

export const VerifyEmailPage = () => {
    // const dispatch = useDispatch()
    const params = useParams()

    const onClickConfirm = async() => {
        await axios.post(`http://localhost:5000/api/auth/verify/${params.token}`)
    }

    return <div>Click button for vereification your account<br/>
        <button onClick={onClickConfirm}>Verify email</button>
    </div>
}