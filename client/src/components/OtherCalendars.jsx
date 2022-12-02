import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCalendar, setChoosedCalendars, setCreating, setEditing } from '../reducers/calendarSlice';
import ModalDeleteConfirm from './ModalDeleteConfirm';
import ModalEditCalendar from './ModalEditCalendar';

export default function OtherCalendars() {

    const dispatch = useDispatch();

    const [isHidden, setDefaultHidden] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const [deletionData, setDelData] = useState(null)
    const [editingIdx, setEditingState] = useState(-1);

    const calendars = useSelector(state => state.calendars.calendars);
    const choosed = useSelector(state => state.calendars.choosedCalendars);
    const events = useSelector(state => state.calendars.events);

    const switchVisibility = () => {
        if (isHidden) setDefaultHidden(false)
        else setDefaultHidden(true);
    }

    const onChange = (event) => {
        // console.log(event.target.id);
        let idx = choosed.indexOf(event.target.id);
        // console.log(idx);

        if (idx >= 0) {
            let newArr = [...choosed];
            newArr.splice(idx, 1);
            dispatch(setChoosedCalendars({ calendars: newArr, events: events }));
        } else {
            let newArr = [...choosed];
            newArr.push(String(event.target.id));
            dispatch(setChoosedCalendars({ calendars: newArr, events: events }));
        }
    }

    const createCalendarClick = () => {
        dispatch(setCreating({ type: 'calendar', state: true }));
    }

    const deleteCalendarClick = (event) => {
        console.log(event.target.id, event.target.name);
        setDeleting(true);
        setDelData({ name: event.target.name, id: event.target.id });
    }

    const confirmDeletionClick = () => {
        dispatch(deleteCalendar({ calendars: calendars, choosed: choosed, id: deletionData.id }));
        setDeleting(false);
        setDelData(null);
    }


    const editCalendarClick = (event) => {
        // console.log(event.target.id);
        dispatch(setEditing({editingIdx: true, type: 'calendar', id: event.target.id}));

        let idx = calendars.findIndex(calendar => calendar._id === event.target.id);

        setEditingState(idx);
    }

    const cancelEditClick = () => {
        dispatch(setEditing({isEditing: false, type: '', id: null}));
        setEditingState(-1);
    }

    const editPeopleGroup = () =>{

    }

    return (
        <>
            {isDeleting && <ModalDeleteConfirm setOpen={setDeleting} confirm={confirmDeletionClick} />}
            {editingIdx >= 0 && <ModalEditCalendar calendars={calendars} calendar={calendars[editingIdx]} cancelClick={cancelEditClick}/>}
            <div className='m-2 p-2 flex flex-row w-full items-center justify-start'>
                <div>
                    Other calendars
                </div>
                <div className='pl-3' onClick={switchVisibility}>
                    {
                        isHidden ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                    }
                </div>
                <div className=''>
                    <svg onClick={createCalendarClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer rounded-full hover:border hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </div>

            </div>
            {
                !isHidden &&
                <>
                    {
                        calendars && calendars.map(calendar => {
                            if (calendar.type !== 'main') {
                                let color;
                                switch (calendar.color) {
                                    case "#b80000":
                                        color = 'bg-red_picker'
                                        break;
                                    case "#db3e00":
                                        color = 'bg-orange_picker'
                                        break;
                                    case "#fccb00":
                                        color = 'bg-yellow_picker'
                                        break;
                                    case "#008b02":
                                        color = 'bg-green_picker'
                                        break;
                                    case "#006b76":
                                        color = 'bg-cyan_picker'
                                        break;
                                    case "#1273de":
                                        color = 'bg-sky_picker'
                                        break;
                                    case "#004dcf":
                                        color = 'bg-blue_picker'
                                        break;
                                    case "#5300eb":
                                        color = 'bg-violet_picker'
                                        break;
                                    case "#eb9694":
                                        color = 'bg-pink_picker'
                                        break;
                                    case "#fad0c3":
                                        color = 'bg-rose_picker'
                                        break;
                                    case "#fef3bd":
                                        color = 'bg-fuchsia_picker'
                                        break;
                                    case "#c1e1c5":
                                        color = 'bg-light_sky_picker'
                                        break;
                                    case "#bedadc":
                                        color = 'bg-light_blue_picker'
                                        break;
                                    case "#c4def6":
                                        color = 'bg-cyan_blue_picker'
                                        break;
                                    case "#bed3f3":
                                        color = 'bg-blue_sky_picker'
                                        break;
                                    case "#d4c4fb":
                                        color = 'bg-light_violet_picker'
                                        break;
                                    default:
                                        color = 'bg-white'
                                        break;
                                }
                                return (
                                    <div className={`px-3 mx-3 mb-2 flex items-center rounded border border-gray-200 dark:border-gray-700 ${color}`} key={calendar._id}>
                                        <input onChange={onChange} id={calendar._id} defaultChecked type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <div className='flex flex-row w-full items-center'>
                                            <label htmlFor="bordered-checkbox-1" className="py-3 ml-2 w-full text-sm font-medium">{calendar.name}</label>
                                            <button id={calendar._id} name={calendar.name} onClick={editPeopleGroup} className="hover:cursor-pointer mr-1">
                                            <svg pointerEvents='none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                            </svg>
                                            </button>
                                            <button id={calendar._id} name={calendar.name} onClick={editCalendarClick} className="hover:cursor-pointer pr-1">
                                                <svg pointerEvents='none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                            <button id={calendar._id} name={calendar.name} onClick={deleteCalendarClick} className='hover:cursor-pointer'>
                                                <svg pointerEvents='none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="red" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            else return <div key={calendar._id}></div>
                        })
                    }
                </>
            }
        </>
    )
}
