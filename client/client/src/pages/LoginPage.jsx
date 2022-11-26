import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../redux/features/auth/authSlice"
import { toast } from 'react-toastify'
import './styles/loginPage.css'

export const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)
    const { me } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (me || status=== 'You are signed in') {
            navigate('/home-page')
        }
        console.log(status)
        toast(status)
    }, [status, navigate, me])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({
                username_or_email: login,
                password,
            }))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="box-border flex justify-center items-center min-h-[100vh] bg-gray-500">
            <div className="loginCard">
                <h3 className="uppercase tracking-[2px] text-gray-300 mt-4 text-xl">Sign In</h3>
                <div className="relative w-[250px]">
                    <input
                        type="text"
                        required="required"
                        value={login}
                        onChange={e => setLogin(e.target.value)} />
                    <span className="">Login/email</span>
                </div>

                <div className="relative w-[250px]">
                    <input
                        type="password"
                        required="required"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <span className="password-span">Password</span>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <Link
                        to='/auth/resetPassword'
                        className="flex justify-center items-center text-xs text-black hover:text-gray-200 hover:transition-[1s]"
                    >Forgot password?</Link>
                    <button type='submit' onClick={handleSubmit} >Log in</button>
                    <Link
                        to='/registration'
                        className="flex justify-center items-center text-xs m-5 text-black hover:text-gray-200 hover:transition-[1s]"
                    >Create an account</Link>
                </div>

            </div>
        </form>
    )
}