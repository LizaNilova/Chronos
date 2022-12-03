import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCalendar, setCreating } from '../reducers/calendarSlice';
import { ColorPicker } from "../components/ColorPicker";

export default function ModalCreateCalendar() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: null,
        description: null,
        members: [],

        search: ''
    })

    const [color, setColor] = useState('#c4def6');

    const cancelClick = () => {
        dispatch(setCreating({ type: 'calendar', state: false }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    const createClick = () =>{
        if(state.name && state.description && color)
        {
            // console.log(color);
            dispatch(createCalendar({name :state.name, description: state.description, color: color, members: state.members}));
            dispatch(setCreating({ type: 'calendar', state: false }));
        }
    }

    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-3 mx-auto w-1/4">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl pl-4 font-semibold text-gray-300">
                            Adding calendar
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={cancelClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative py-5 px-8 flex flex-col">
                        <div className='text-black flex flex-col'>
                            <label className='text-slate-200'>Enter calendar name:</label>
                            <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type="text" name="name" placeholder='Name ...' onChange={handleChange} />
                            <label className='text-slate-200'>Enter calendar description (optional):</label>
                            <textarea name="description" rows="5" className="outline-none resize-none block p-2 m-2 
                    text-sm text-gray-900 bg-slate-100 rounded-lg border-2 focus:border-indigo-500 "
                                placeholder="Description of event ..." onChange={handleChange}></textarea>
                            <label className='text-slate-200'>Pick calendar events color:</label>
                            <ColorPicker setColor={setColor} />
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-pink-700 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={cancelClick}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={createClick}
                        >Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
