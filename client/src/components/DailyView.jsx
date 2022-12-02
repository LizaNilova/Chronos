import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import drawTimeColumn from '../functions/drawTimeColumn';
import getEventsByHours from '../functions/getEventsByHours';
import getEventsOfDay from '../functions/getEventsOfDay';
// import { setEditing } from '../reducers/calendarSlice';
import Event from './Event';

export default function DailyView(props) {

    const [day, setDay] = useState(1); // current day number

    useEffect(() => {
        setDay(props.currentDay);
        // console.log(props.currentDay)
    }, [props.currentDay]);

    const events = useSelector(state => state.calendars.choosedEvents);

    const drawDay = (events, month, year, day) => {
        let content = [];
        let eventsOfDay = getEventsOfDay(events, day, month, year);
        let hoursEvents = getEventsByHours(eventsOfDay);
        console.log(events);
        for (let i = 0; i < 24; i++) {
            const eventsOfHour = hoursEvents.filter(hour_event => hour_event.hour === i);
            if (eventsOfHour.length > 0) {
                content.push(
                    <div className={`p-2 h-1/24 border-b border-l border-slate-700 w-full bg-slate-300`}>
                        {
                            eventsOfHour.map(res => {
                                let width;
                                if (eventsOfHour.length > 1) {
                                    switch (eventsOfHour.length) {
                                        case 2:
                                            width = 'w-1/2'
                                            break;
                                        case 3:
                                            width = 'w-1/3'
                                            break;
                                        case 4:
                                            width = 'w-1/4'
                                            break;
                                        case 5:
                                            width = 'w-1/5'
                                            break;
                                        case 6:
                                            width = 'w-1/6'
                                            break;


                                        default:
                                            break;
                                    }
                                } else width = 'w-1/3';
                                let height;
                                if (res.size > 1) {
                                    switch (res.size) {
                                        case 2:
                                            height = 'h-[230%]'
                                            break;
                                        case 3:
                                            height = 'h-[320%]'
                                            break;
                                        case 4:
                                            height = 'h-[480%]'
                                            break;
                                        case 5:
                                            height = 'h-[610%]'
                                            break;
                                        case 6:
                                            height = 'h-[740%]'
                                            break;
                                        case 7:
                                            height = 'h-[870%]'
                                            break;
                                        default:
                                            break;
                                    }
                                } else {
                                    height = 'h-full'
                                }
                                console.log(res.event);
                                if (res.event.type === 'event') {
                                    return (
                                        <Event repeat={res.event.repeat} width={width} height={height} id={res.event.id} name={res.event.name} type={res.event.type} description={res.event.description} date_start={res.event.date_start} date_end={res.event.date_end}/>
                                    )
                                } else if (res.event.type === 'task') {
                                    return (
                                        <Event repeat={res.event.repeat} width={width} height={'h-1/2'} id={res.event.id} name={res.event.name} type={res.event.type} description={res.event.description} date_start={res.event.date_start} date_end={res.event.date_end}/>
                                    )
                                } else {
                                    return (
                                        <Event repeat={res.event.repeat} width={width} height={'h-1/2'} id={res.event.id} name={res.event.name} type={res.event.type} description={res.event.description} date_start={res.event.date_start} date_end={res.event.date_end}/>
                                    )
                                }

                            })
                        }
                    </div>
                )
            } else {
                content.push(
                    <div className='p-1 h-1/24 border-b border-l border-slate-700 w-full bg-slate-300'>

                    </div>
                )
            }
        }
        return content;
    }

    const incrementDay = () => {
        let dayCount = day;
        if (dayCount < props.daysCount) {
            dayCount++;
            setDay(dayCount)
        } else return;
    }

    const decrementDay = () => {
        let dayCount = day;
        if (dayCount > 1) {
            dayCount--;
            setDay(dayCount)
        } else return;
    }
    
    const jumpToday = () => {
        setDay(props.currentDay);
    }
    
    return (
        <div className='flex flex-col w-full min-h-screen max-h-full'>

            <div className='flex flex-row p-1 w-full'>
                <div className='text-center w-1/7 flex flex-row items-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={decrementDay}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div className={props.isCurMonth && props.isCurYear && day === props.currentDay ? 'w-full select-none text-center text-lg font-semibold rounded-2xl bg-blue-200 py-1 mx-3' : 'w-full select-none text-center text-lg font-semibold rounded-xl'}>Day {day}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={incrementDay}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
                <div className='w-1/6 flex items-center justify-center'>
                    <button onClick={jumpToday} className="selection-none ml-1 border-none rounded-full w-1/2 h-10 bg-violet-600 hover:bg-violet-400 transition duration-500 hover:ease-in text-lg font-semibold">Today</button>
                </div>
                {/* {props.dayOfWeek.map(day => {
                    return (
                        <div className='text-center w-1/7 select-none' key={day}>{day}</div>
                    )
                })} */}
            </div>
            <div className='p-1 m-1 flex flex-row w-full h-2screen'>
                {drawTimeColumn(false)}
                <div className='w-6/7 flex flex-col border-y border-slate-700'>
                    {drawDay(events, props.month, props.year, day)}
                </div>
            </div>

        </div >
    )
}
