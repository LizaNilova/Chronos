import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { passwordForgot } from "../redux/features/auth/authSlice"

import './styles/registerPage.css'
import { toast } from "react-toastify"


export const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('')

    const { status } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        try {
            dispatch(passwordForgot({ email }))
            // console.log(status)
            if(status === "Re-send the password, please check your email"){
                console.log(status)
                navigate('/')
            } else {
                toast(status)
                // setEmail('')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (<form
        onSubmit={e => e.preventDefault()}
        className="box-border flex justify-center items-center min-h-[100vh] bg-gray-500">
        <div className="registerCard">
            <h3 className="uppercase tracking-[2px] text-gray-300 mt-4 text-xl">Recover password</h3>
            <div className="relative w-[250px]">
                <input
                    type="text"
                    required="required"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <span className="loginSpan">Email</span>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
                
                <button type='submit' onClick={handleSubmit} >Send email</button>
                <Link
                    to='/'
                    className="flex justify-center items-center text-xs m-5 text-black hover:text-gray-200 hover:transition-[1s]"
                >I remember my password</Link>
            </div>

        </div>
    </form>)
}