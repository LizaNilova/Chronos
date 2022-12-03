import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, setCreating } from '../reducers/calendarSlice';

export default function ModalAddEvent() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        type: 'event',
        name: null,
        description: null,
        // datetime_start: null,
        // datetime_end: null,

        date: null,
        time_start: null,
        time_end: null,

        repeat: 'none',
        calendar: null,
        remind: '',

        // setTime: false,
        errMessage: null
    })

    const calendars = useSelector(state => state.calendars.calendars);

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            calendar: calendars[0]._id
        }));
    }, [calendars]);

    const changeType = (e) => {
        console.log(e.target.name);
        setState(prevState => ({
            ...prevState,
            type: String(e.target.name)
        }));
    }

    // const changeTime = (e) => {
    //     if (state.setTime) {
    //         setState(prevState => ({
    //             ...prevState,
    //             setTime: false
    //         }));
    //     } else {
    //         setState(prevState => ({
    //             ...prevState,
    //             setTime: true
    //         }));
    //     }

    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setState(prevState => ({
            ...prevState,
            [name]: value,
            errMessage: ''
        }));
    }

    const cancelClick = () => {
        dispatch(setCreating({ type: 'event', state: false }));
    }

    const createClick = () => {
        console.log(state);
        switch (state.type) {
            case 'event':
                if (state.name && state.description && state.date && state.calendar && state.time_start && state.time_end && state.time_end > state.time_start) {
                    dispatch(createEvent({
                        remind: state.remind,
                        name: state.name, description: state.description,
                        date_start: state.date + ' ' + state.time_start.toString(), date_end: state.date + ' ' + state.time_end.toString(),
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat
                    }));
                    dispatch(setCreating({ type: 'event', state: false }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            case 'task':
                if (state.name && state.description && state.date && state.calendar) {
                    dispatch(createEvent({
                        remind: '',
                        name: state.name, description: state.description,
                        date_start: state.date, date_end: '',
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat
                    }));
                    dispatch(setCreating({ type: 'event', state: false }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            case 'reminder':
                if (state.name && state.description && state.date && state.time_start && state.calendar) {
                    dispatch(createEvent({
                        remind: state.remind,
                        name: state.name, description: state.description,
                        date_start: state.date + ' ' + state.time_start.toString(), date_end: '',
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat
                    }));
                    dispatch(setCreating({ type: 'event', state: false }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            default:
                break;
        }

    }

    if (calendars.length > 0)
        return (
            <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
                <div className="relative my-3 mx-auto w-1/4">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl pl-4 font-semibold text-gray-300">
                                Adding {state.type}
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
                            <div className='flex m-1 p-1 text-lg '>
                                <button name='event' onClick={changeType} className={state.type === 'event' ? 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md bg-slate-500' : 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md'}>Event</button>
                                <button name='task' onClick={changeType} className={state.type === 'task' ? 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md bg-slate-500' : 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md'}>Task</button>
                                <button name='reminder' onClick={changeType} className={state.type === 'reminder' ? 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md bg-slate-500' : 'mx-1 px-3 py-1 hover:cursor-pointer hover:text-slate-300 rounded-md'}>Reminder</button>
                            </div>
                            <div className='text-black flex flex-col'>
                                <label className='text-slate-200'>Enter the {state.type} name:</label>
                                <input className='bg-slate-100 m-2 p-2 rounded-lg outline-none border-2 focus:border-indigo-500' type="text" name="name" placeholder='Name ...' onChange={handleChange} />
                                <label className='text-slate-200'>Enter the {state.type} description (optional):</label>
                                <textarea name="description" rows="5" className="outline-none resize-none block p-2 m-2 
                            text-sm text-gray-900 bg-slate-100 rounded-lg border-2 focus:border-indigo-500"
                                    placeholder="Description of event ..." onChange={handleChange}></textarea>

                                <label className='text-slate-200'>Choose the {state.type} date {state.type !== 'task' && 'and time'}:</label>
                                {
                                    state.type === 'task' ?
                                        <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date" min="2022-01-01T00:00" onChange={handleChange} />
                                        :
                                        <>
                                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date" min="2022-01-01T00:00" onChange={handleChange} />
                                            {
                                                <div className='flex flew-row items-center w-full'>
                                                    <label className='font-semibold text-white'>{state.type !== 'reminder' && 'Start time:'}</label>
                                                    <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' step="3600" name='time_start' onChange={handleChange} />
                                                    {
                                                        state.type !== 'reminder' &&
                                                        <>
                                                            <label className='font-semibold text-white'>End time:</label>
                                                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' step="3600" name='time_end' onChange={handleChange} />
                                                        </>
                                                    }
                                                </div>
                                            }
                                        </>
                                }
                                {state.type !== 'task' &&
                                    <>
                                        <label className='text-slate-200'>Choose the {state.type} repeat ratio (optional):</label>
                                        <select defaultValue={"none"} name="repeat"
                                            className="outline-none m-2 text-gray-900 text-sm rounded-lg block p-2.5 border-2 focus:border-indigo-500" onChange={handleChange}>
                                            <option value="none">None</option>
                                            <option value="day">Every day</option>
                                            <option value="week">Every week</option>
                                            <option value="month">Every month</option>
                                            <option value="year">Every year</option>
                                        </select>
                                    </>
                                }
                                <label className='text-slate-200'>Choose a calendar to store it in:</label>
                                <select defaultValue={calendars[0]._id} name="calendar" onChange={handleChange}
                                    className="outline-none m-2 bg-gray-50 text-gray-900 text-sm rounded-lg block p-2.5 border-2 focus:border-indigo-500">
                                    {
                                        calendars.map(calendar => {
                                            return (
                                                <option value={calendar._id} key={calendar._id}>{calendar.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {state.type !== 'task' &&
                                    <>
                                        <label className='text-slate-200'>Choose a remind (optional):</label>
                                        <select defaultValue={""} name="remind"
                                            className="outline-none m-2 text-gray-900 text-sm rounded-lg block p-2.5 border-2 focus:border-indigo-500" onChange={handleChange}>
                                            <option value="">None</option>
                                            <option value="day_before">Day before</option>
                                            <option value="hour_before">Hour before</option>
                                            <option value="at_start_time">At the time</option>
                                        </select>
                                    </>
                                }
                                <div className='font-semibold text-xl text-rose-500 text-center p-1'>{state.errMessage}</div>
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
