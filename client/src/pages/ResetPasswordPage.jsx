import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyPassword } from "../redux/features/auth/authSlice";

export const ResetPasswordPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const { status } = useSelector((state) => state.auth)

    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleSubmit = () => {
        try {
            dispatch(verifyPassword({
                new_password: newPassword,
                confirm_password: repeatPassword,
                token: params.token
            }))
            if (status === 'Your password was changed') {
                // toast(status)
                navigate('/')
            } else {
                toast(status)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return <form
        onSubmit={e => e.preventDefault()}
        className="box-border flex justify-center items-center min-h-[100vh] bg-gray-500">
        <div className="registerCard">
            <h3 className="uppercase tracking-[2px] text-gray-300 mt-4 text-xl">Reset password</h3>

            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} />
                <span className="password-span">New password</span>
            </div>
            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)} />
                <span className="password-span">Repeat password</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <button onClick={handleSubmit} >Confirm</button>
            </div>

        </div>
    </form>
}