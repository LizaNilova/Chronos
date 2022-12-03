import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, setEditing, updateEvent } from '../reducers/calendarSlice';

export default function ModalEventEdit(props) {
    const dispatch = useDispatch();

    const choosedEvents = useSelector(state => state.calendars.choosedEvents);
    const events = useSelector(state => state.calendars.events);

    const calendars = useSelector(state => state.calendars.calendars);

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
    });

    useEffect(() => {
        let index = choosedEvents.findIndex(event => event._id === props.id);
        // console.log(choosedEvents);
        let dateObj = (new Date(choosedEvents[index]?.date_start));
        let date = dateObj.toISOString().slice(0,10);
        // console.log(date);
        let time_start = dateObj.toLocaleTimeString();
        // console.log(time_start)
        dateObj = (new Date(choosedEvents[index]?.date_end));
        let time_end = dateObj.toLocaleTimeString();
        setState(prevState => ({
            ...prevState,
            type: choosedEvents[index]?.type,
            name: choosedEvents[index]?.name,
            description: choosedEvents[index]?.description,
            date:date,
            time_start:time_start,
            time_end:time_end,
            // datetime_start: (new Date(choosedEvents[index]?.date_start)).toISOString().slice(0, 10).replace(/-/g, "-").replace("T", " "),
            // datetime_end: (new Date(choosedEvents[index]?.date_end)).toISOString().slice(0, 10).replace(/-/g, "-").replace("T", " "),
            repeat: choosedEvents[index]?.repeat,
            calendar: choosedEvents[index]?.calendars[0],
            remind: choosedEvents[index]?.remind
        }));
    }, [choosedEvents, props.id]);

    // const changeType = (e) => {
    //     // console.log(e.target.name);
    //     setState(prevState => ({
    //         ...prevState,
    //         type: String(e.target.name)
    //     }));
    // }

    // const changeTime = (e) => {
    //     let index = choosedEvents.findIndex(event => event._id === props.id);
    //     if (state.setTime) {
    //         setState(prevState => ({
    //             ...prevState,
    //             setTime: false,
    //             datetime_start: (new Date(choosedEvents[index]?.date_start)).toISOString().slice(0, 10).replace(/-/g, "-").replace("T", " "),
    //             datetime_end: (new Date(choosedEvents[index]?.date_end)).toISOString().slice(0, 10).replace(/-/g, "-").replace("T", " "),
    //         }));
    //     } else {
    //         setState(prevState => ({
    //             ...prevState,
    //             setTime: true,
    //             datetime_start: (new Date(choosedEvents[index]?.date_start)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " "),
    //             datetime_end: (new Date(choosedEvents[index]?.date_end)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
    //         }));
    //     }

    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const cancelClick = () => {
        dispatch(setEditing({ editingIdx: false, type: '', id: null }));
    }

    const deleteEventClick = () => {
        // console.log(props.id);
        dispatch(deleteEvent({events: events, choosed: choosedEvents, id: props.id}));
        dispatch(setEditing({ editingIdx: false, type: '', id: null }));
    }

    const confirmClick = () => {
        console.log(state);
        switch (state.type) {
            case 'event':
                if (state.name && state.description && state.date && state.calendar && state.time_start && state.time_end && state.time_end > state.time_start) {
                    dispatch(updateEvent({
                        remind: state.remind, name: state.name,
                        description: state.description, date_start: state.date + ' ' + state.time_start.toString(), date_end: state.date + ' ' + state.time_end.toString(),
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat, id: props.id, events: events
                    }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            case 'task':
                if (state.name && state.description && state.date && state.calendar) {
                    dispatch(updateEvent({
                        remind: state.remind, name: state.name,
                        description: state.description, date_start: state.date, date_end: '',
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat, id: props.id, events: events
                    }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            case 'reminder':
                if (state.name && state.description && state.date && state.time_start && state.calendar) {
                    dispatch(updateEvent({
                        remind: state.remind, name: state.name,
                        description: state.description, date_start: state.date + ' ' + state.time_start.toString(), date_end: '',
                        calendars: [state.calendar], type: state.type, completed: false, repeat: state.repeat, id: props.id, events: events
                    }));
                } else setState(prevState => ({
                    ...prevState,
                    errMessage: 'Fill all fields!'
                }));
                break;
            default:
                break;
        }
        dispatch(setEditing({ editingIdx: false, type: '', id: null }));
    }

    console.log(state);

    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-3 mx-auto w-1/4">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl pl-4 font-semibold text-gray-300">
                            Editing {state.type}
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
                                <label className='text-slate-200'>Enter the {state.type} name:</label>
                                <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type="text" name="name" placeholder='Name ...' onChange={handleChange} defaultValue={state.name}/>
                                <label className='text-slate-200'>Enter the {state.type} description (optional):</label>
                                <textarea name="description" rows="5" className="outline-none resize-none block p-2 m-2 
                            text-sm text-gray-900 bg-slate-100 rounded-lg border-2 focus:border-indigo-500 "
                                    placeholder="Description of event ..." onChange={handleChange} defaultValue={state.description}></textarea>

                                <label className='text-slate-200'>Choose the {state.type} date {state.type !== 'task' && 'and time'}:</label>
                                {
                                    state.type === 'task' ?
                                        <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date" min="2022-01-01T00:00" onChange={handleChange} defaultValue={state.date}/>
                                        :
                                        <>
                                            <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date" min="2022-01-01T00:00" onChange={handleChange} defaultValue={state.date}/>
                                            {
                                                <div className='flex flew-row items-center w-full'>
                                                    <label className='font-semibold text-white'>{state.type !== 'reminder' && 'Start time:'}</label>
                                                    <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' step="3600" name='time_start' onChange={handleChange} defaultValue={state.time_start}/>
                                                    {
                                                        state.type !== 'reminder' &&
                                                        <>
                                                            <label className='font-semibold text-white'>End time:</label>
                                                            <input className='m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' step="3600" name='time_end' onChange={handleChange} defaultValue={state.time_end}/>
                                                        </>
                                                    }
                                                </div>
                                            }
                                        </>
                                }
                                {state.type !== 'task' &&
                                    <>
                                        <label className='text-slate-200'>Choose the {state.type} repeat ratio (optional):</label>
                                        <select value={state?.repeat} name="repeat"
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
                                <select value={state?.calendar} name="calendar" onChange={handleChange}
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
                                        <select value={state?.remind} name="remind"
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
                    <div className="flex items-center p-4 border-t border-solid border-slate-200 rounded-b">
                        <div className='flex w-1/2 items-center p-1'>
                            <button id={props.id} name={props.name} className='hover:cursor-pointer p-2 rounded-full hover:bg-rose-900' onClick={deleteEventClick}>
                                <svg pointerEvents='none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        <div className='flex w-1/2 items-center justify-end'>
                            <button
                                className="text-pink-700 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={cancelClick}
                            >Cancel
                            </button>
                            <button
                                className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                                type="button"
                                onClick={confirmClick}
                            >Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
