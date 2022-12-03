import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditing } from '../reducers/calendarSlice';

const Event = (props) => {

    const dispatch = useDispatch();

    const viewType = useSelector(state => state.calendars.viewType);

    const [color, setColor] = useState('bg-white');

    const editEvent = (event) => {
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

    return (
        <div className={`relative border border-slate-900 inline-block ${props.width} ${props.height} text-center tooltip p-1 mb-1 ${props.type !== 'holiday' ? color : 'bg-indigo-400'} rounded-md`}>
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
