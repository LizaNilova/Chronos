import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditing } from '../reducers/calendarSlice';

const Event = (props) => {

    const dispatch = useDispatch();

    const viewType = useSelector(state => state.calendars.viewType);

    const [color, setColor] = useState('bg-white');

    const editEvent = (event) => {
        // console.log(event.target.id);
        dispatch(setEditing({ editingIdx: true, type: 'event', id: event.target.id }));
    }

    useEffect(() => {
        switch (props?.color) {
            case "#b80000":
                setColor('bg-red_picker')
                break;
            case "#db3e00":
                setColor('bg-orange_picker')
                break;
            case "#fccb00":
                setColor('bg-yellow_picker')
                break;
            case "#008b02":
                setColor('bg-green_picker')
                break;
            case "#006b76":
                setColor('bg-cyan_picker')
                break;
            case "#1273de":
                setColor('bg-sky_picker')
                break;
            case "#004dcf":
                setColor('bg-blue_picker')
                break;
            case "#5300eb":
                setColor('bg-violet_picker')
                break;
            case "#eb9694":
                setColor('bg-pink_picker')
                break;
            case "#fad0c3":
                setColor('bg-rose_picker')
                break;
            case "#fef3bd":
                setColor('bg-fuchsia_picker')
                break;
            case "#c1e1c5":
                setColor('bg-light_sky_picker')
                break;
            case "#bedadc":
                setColor('bg-light_blue_picker')
                break;
            case "#c4def6":
                setColor('bg-cyan_blue_picker')
                break;
            case "#bed3f3":
                setColor('bg-blue_sky_picker')
                break;
            case "#d4c4fb":
                setColor('bg-light_violet_picker')
                break;
            default:
                setColor('bg-white')
                break;
        }
    }, [props?.color]);

    // console.log(props);
    return (
        <div className={`relative border border-slate-900 inline-block ${props.width} ${props.height} text-center tooltip p-1 mb-1 ${color} rounded-md`}>
            {/* <div className='w-full flex flex-row items-center justify-between'>
                <div className='font-semibold text-base hover:cursor-pointer' id={props.id} onClick={editEvent}>{props.name} {props.type ? (props.type) : ''}</div>
                <button id={props.id} name={props.name} onClick={deleteEvent} className='hover:cursor-pointer'>
                    <svg pointerEvents='none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="red" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div> */}
            <div className={viewType === 'week' || viewType === 'day' ? 'text-xs font-semibold hover:cursor-pointer' : 'text-sm font-semibold hover:cursor-pointer'} id={props.id} onClick={props.type !== 'holiday' ? editEvent : null}>{props.name} {props.type ? '(' + props.type + ')' : ''}</div>
            <div className="text-sm tooltiptext bg-gradient-to-b from-dark-purple via-lighter-purple to-black-purple border-2 border-purple-900 text-emerald-50">
                <div className='text-center text-base text-emerald-100'>Description:</div>
                <div>{props.description}</div>
                <div className='text-center text-base text-emerald-100'>Date start:</div>
                <div>{new Date(props.date_start).toLocaleDateString()} {props.type !== 'task' && props.type !== 'holiday' && new Date(props.date_start).toLocaleTimeString()}</div>
                {
                    props.date_end &&
                    <>
                        <div className='text-center text-base text-emerald-100'>Date end:</div>
                        <div>{new Date(props.date_end).toLocaleDateString()} {props.type !== 'task' && new Date(props.date_end).toLocaleTimeString()}</div>
                    </>
                }
                {
                    props.repeat !== 'none' &&
                    <>
                        <div className='text-center text-base text-emerald-100'>Repeat:</div>
                        <div className='text-center text-base'>{props.repeat}</div>
                    </>
                }
            </div>
        </div>
    );
}

export default Event;
