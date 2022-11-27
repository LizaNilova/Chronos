import React from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export const VerifyEmailPage = () => {
    const params = useParams()
    const navigate = useNavigate()

    // const [text, setText] = useState('This page is the verification page for your account on Chronos. \nClick the button for activating account and verifying email, where this link was sent')

    const onClickConfirm = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/auth/verify/${params.token}`)
        console.log(data)
        toast(data.message)
        if(data.success){
            navigate('/')
        }
    }

    return <div className="box-border flex justify-center items-center min-h-[100vh] bg-gray-500">
        <div className="registerCard">
            <h3 className="uppercase tracking-[2px] text-gray-300 mt-4 text-xl">Email verification</h3>
            <p className="text-center ">This page is the verification page for your account on Chronos. <br/>
            Click the button for activating account and verifying email, where this link was sent</p>

            <div className="flex flex-col gap-2 items-center justify-center">
                <button onClick={onClickConfirm}>Verify email</button>
            </div>

        </div>

    </div>
}