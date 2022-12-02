import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setViewType } from '../reducers/calendarSlice';
import { logout } from '../redux/features/auth/authSlice';

export default function Header(props) {
    const dispatch = useDispatch();

    const changeType = (event) => {
        // console.log(event.target.value);
        dispatch(setViewType(event.target.value))
    }

    const navigate = useNavigate()

    const logoutClick = () => {
        dispatch(logout())
        navigate('/')
    }


    return (
        <div className='px-3 py-2 border-b-2 border-slate-700 flex w-full bg-neutral-400 justify-between'>
            <div className='w-2/6 flex flex-row justify-between'>
                <div className='w-1/6 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:cursor-pointer" onClick={props.hideClick}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className='w-1/2 flex items-center justify-center'>
                    <div className='mx-1 hover:cursor-pointer' onClick={props.decrementMonth}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div className='text-xl w-2/3 text-center'>{props.months[props.month]} {props.year}</div>
                    <div className='mx-1 hover:cursor-pointer' onClick={props.incrementMonth}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='w-1/4 flex flex-row'>
                <div className='w-1/2 flex items-center justify-center'>
                    <select defaultValue={'month'} name="viewType"
                            className=" w-2/3 outline-none m-2 
                            bg-gray-100 border 
                            border-gray-300 text-gray-900 text-base font-semibold rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block p-2.5 hover:cursor-pointer" onChange={changeType}>
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="day">Day</option>
                        </select>
                </div>
                {/* <div className='w-1/6 flex items-center justify-end'>
                    <img src={props.avatar ? 'http://localhost:5000/images/' + props.avatar : "logo.png"} alt="logo" className="h-14 w-14 object-cover rounded-full" />
                    <img src="logo.png" alt="logo" className="h-14 w-14 object-cover rounded-full" />
                </div> */}
                <div className='w-1/2 flex flex-col items-center justify-center'>
                    {/* <div className='w-full text-center p-1'>Login to be nice</div> */}
                    <button className="border-none rounded-full w-1/2 p-1 bg-violet-600 hover:bg-violet-400 transition duration-500 hover:ease-in font-semibold text-lg" onClick={logoutClick}>Logout</button>
                </div>
            </div>
        </div>
    )
}
