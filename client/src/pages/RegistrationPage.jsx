import React from "react";
import { useState } from "react";
import { registerUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './styles/registerPage.css'
import { toast } from "react-toastify";
import { useEffect } from "react";

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const { status } = useSelector((state) => state.auth)

    useEffect(() => {
        toast(status)
        if (status === 'An Email sent to your account please verify') {
            navigate('/')
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({
                username: login,
                full_name: fullName,
                password,
                email,
                repeatPassword
            }))

        } catch (error) {
            console.log(error)
        }
    }

    return <form
        onSubmit={e => e.preventDefault()}
        className="box-border flex justify-center items-center min-h-[100vh] bg-gray-500">
        <div className="registerCard">
            <h3 className="uppercase tracking-[2px] text-gray-300 mt-4 text-xl">Sign up</h3>
            <div className="relative w-[250px]">
                <input
                    type="text"
                    required="required"
                    value={login}
                    onChange={e => setLogin(e.target.value)} />
                <span className="loginSpan">Login</span>
            </div>
            <div className="relative w-[250px]">
                <input
                    type="text"
                    required="required"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)} />
                <span>Full name</span>
            </div>

            <div className="relative w-[250px]">
                <input
                    type="text"
                    required="required"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <span className="loginSpan">Email</span>
            </div>

            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <span>Password</span>
            </div>
            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)} />
                <span>Password</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <button type='submit' onClick={handleSubmit} >Create account</button>
                <Link
                    to='/'
                    className="flex justify-center items-center text-xs m-5 text-black hover:text-gray-200 hover:transition-[1s]"
                >Already have an account?</Link>
            </div>

        </div>
    </form>
}