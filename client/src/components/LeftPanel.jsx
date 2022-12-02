import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { daysInMonth } from '../functions/daysInMonth';
import { setCreating } from '../reducers/calendarSlice';
import DefaultCalendars from './DefaultCalendars';
import ModalAddEvent from './ModalAddEvent';
import ModalCreateCalendar from './ModalCreateCalendar';
import OtherCalendars from './OtherCalendars';

export default function LeftPanel(props) {

    const dispatch = useDispatch();

    // console.log(props);

    const calendarsSlice = useSelector(state => state.calendars);

    const getDays = (daysCount, firstDay, isCurMonth, isCurYear, currentDay, month, year) => {
        let content = [];
        let offset = 42 - daysCount - firstDay;
        let key = 0;
        let prevDaysCount = daysInMonth(month-1, year);

        // console.log(prevDaysCount, firstDay);
        for (let i = prevDaysCount - firstDay + 1; i <= prevDaysCount; i++) {
            content.push(<div className='text-center border rounded-full bg-slate-500 border-slate-700 p-0.5' key={key}>{i}</div>);
            key++;
        }
        for (let i = 1; i <= daysCount; i++) {
            if (isCurMonth && isCurYear && currentDay === i) //state.month === state.currentMonth && state.currentYear===state.year && state.currentDay === i
            {
                content.push(<div className='hover:cursor-pointer hover:bg-blue-500 text-center border bg-blue-400 rounded-full border-slate-700 p-0.5' key={key}>{i}</div>);
            } else {
                content.push(<div className='hover:cursor-pointer hover:bg-slate-400 text-center border rounded-full bg-slate-300 border-slate-700 p-0.5' key={key}>{i}</div>);
            }

            key++;
        }
        for (let i = 1; i <= offset; i++) {
            content.push(<div className=' text-center border rounded-full bg-slate-500 border-slate-700 p-0.5' key={key}>{i}</div>);
            key++;
        }
        return content;
    };

    const createEventClick = () =>{
        dispatch(setCreating({type:'event',state:true}));
    }

    return (
        <div className='min-h-screen max-h-full w-1/5 flex flex-col border-r-2 border-slate-700'>
            {calendarsSlice.creatingEvent && <ModalAddEvent />}
            {calendarsSlice.creatingCalendar && <ModalCreateCalendar />}
            <div className='p-3 flex justify-center'>
                <div className="hover:cursor-pointer flex flex-row items-center justify-center ml-1 border-none rounded-full w-1/2 h-10 bg-violet-600 hover:bg-violet-400 transition duration-500 hover:ease-in">
                    <div className='text-lg' onClick={createEventClick}>Create</div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
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
            <div className='py-3 px-2 grid grid-cols-7 gap-2' >
                {props.dayOfWeek.map(day => {
                    return (
                        <div className='text-center' key={day + 1}>{day}</div>
                    )
                })}
                {
                    getDays(props.daysCount, props.firstDay, props.isCurMonth, props.isCurYear, props.currentDay, props.month, props.year)
                }
            </div>
            <DefaultCalendars  />
            <OtherCalendars  />
        </div>
    )
}
