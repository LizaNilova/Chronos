import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { daysInMonth } from '../functions/daysInMonth';
import drawTimeColumn from '../functions/drawTimeColumn';
import getEventsByHours from '../functions/getEventsByHours';
import getEventsOfDay from '../functions/getEventsOfDay';
import Event from './Event';

export default function WeeklyView(props) {
    const events = useSelector(state => state.calendars.choosedEvents);
    const calendars = useSelector(state => state.calendars.calendars);
    // console.log('rerender'); 
    const [week, setWeek] = useState(1); // current week number
    const [weeks, setWeeks] = useState(1); // how many weeks we have at that month

    useEffect(() => {
        let weeks = Math.trunc((props.daysCount + props.firstDay) / 7);
        if ((props.daysCount + props.firstDay) % 7 > 0) weeks++;
        // console.log(weeks);
        setWeeks(weeks);
        
        // opens current week by default

        let currentWeek = Math.trunc((props.currentDay + props.firstDay) / 7);
        if ((props.currentDay + props.firstDay) % 7 > 0) currentWeek++;
        setWeek(currentWeek);

    }, [props.daysCount, props.firstDay, props.currentDay]);

    const drawWeekGrid = (events, daysCount, firstDay, month, year, currentDay, week) => {
        let content = [];
        switch (week) {
            case 1:
                let prevDaysCount;
                if (month > 0) {
                    prevDaysCount = daysInMonth(month - 1, year);
                } else {
                    prevDaysCount = daysInMonth(11, year - 1);
                }
                for (let i = prevDaysCount - firstDay + 1; i <= prevDaysCount; i++) {
                    let eventsOfDay;
                    if(month > 0)
                    {
                      eventsOfDay = getEventsOfDay(events, i, month - 1, year);
                    } else eventsOfDay = getEventsOfDay(events, i, 11, year - 1);
                    // console.log(eventsOfDay);
                    let hoursEvents = getEventsByHours(eventsOfDay);
                    // console.log(hoursEvents);
                    content.push(
                        <div className='text-center border border-slate-700 flex flex-col w-1/6 h-full bg-slate-500'>
                            <div className='font-bold text-lg h-1/24 border-b border-slate-700 p-1'>{i}</div>
                            {drawEvents(hoursEvents)}
                        </div>
                    )
                }
                for (let i = 1; i <= 7 - firstDay; i++) {
                    let eventsOfDay = getEventsOfDay(events, i, month, year);
                    let hoursEvents = getEventsByHours(eventsOfDay);
                    content.push(
                        <div className='text-center border border-slate-700 flex flex-col w-1/6 h-full bg-slate-300'>
                            <div className='font-bold text-lg h-1/24 border-b border-slate-700 p-1'>{i}</div>
                            {drawEvents(hoursEvents)}
                        </div>
                    )
                }
                return content;
            case weeks:
                for (let i = (week - 1) * 7 + 1 - firstDay; i <= daysCount; i++) {
                    let eventsOfDay = getEventsOfDay(events, i, month, year);
                    let hoursEvents = getEventsByHours(eventsOfDay);
                    content.push( 
                        <div className='text-center border border-slate-700 flex flex-col w-1/6 h-full bg-slate-300'>
                            <div className='font-bold text-lg h-1/24 border-b border-slate-700 p-1'>{i}</div>
                            {drawEvents(hoursEvents)}
                        </div>
                    )
                }
                // let nextDayCount;
                // if (month < 11) {
                //   prevDaysCount = daysInMonth(month + 1, year);
                // } else {
                //   prevDaysCount = daysInMonth(0, year + 1);
                // }
                for (let i = 1; i <= 6 - (daysCount - ((week - 1) * 7 + 1 - firstDay)); i++) {
                    let eventsOfDay ;
                    if(month === 11)
                    {
                      eventsOfDay = getEventsOfDay(events, i, 0, year + 1);
                    } else eventsOfDay = getEventsOfDay(events, i, month + 1, year);
                    let hoursEvents = getEventsByHours(eventsOfDay);
                    content.push(
                        <div className='text-center border border-slate-700 flex flex-col w-1/6 h-full bg-slate-500'>
                            <div className='font-bold text-lg h-1/24 border-b border-slate-700 p-1'>{i}</div>
                            {drawEvents(hoursEvents)}
                        </div>
                    )
                }
                return content;
            default:
                for (let i = (week - 1) * 7 + 1 - firstDay; i <= 7 * week - firstDay; i++) {
                    let eventsOfDay = getEventsOfDay(events, i, month, year);
                    let hoursEvents = getEventsByHours(eventsOfDay);
                    content.push(
                        <div className='text-center border border-slate-700 flex flex-col w-1/6 h-full bg-slate-300'>
                            <div className='font-bold text-lg h-1/24 border-b border-slate-700 p-1'>{i}</div>
                            {drawEvents(hoursEvents)}
                        </div>
                    )
                }
                return content;
        }



    }

    const drawEvents = (hours_events) => {
        let content = [];
        for (let i = 0; i < 24; i++) {
            // let max = 1;
            const result = hours_events.filter(hour_event => hour_event.hour === i);
            // result.forEach(res => {
            //     if (res.size > max) {
            //         max = res.size;
            //     }
            // })
            if (result.length > 0) {
                content.push(
                    <div className={`p-0.5 h-1/24 border-y border-slate-700 w-full`}>
                        {
                            result.map(res => {
                                let width;
                                if (result.length > 1) {
                                    switch (result.length) {
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
                                } else width = 'w-4/5';
                                let height;
                                if (res.size > 1) {
                                    switch (res.size) {
                                        case 2:
                                            height = 'h-[210%]'
                                            break;
                                        case 3:
                                            height = 'h-[320%]'
                                            break;
                                        case 4:
                                            height = 'h-[440%]'
                                            break;
                                        case 5:
                                            height = 'h-[560%]'
                                            break;
                                        case 6:
                                            height = 'h-[670%]'
                                            break;
                                        case 7:
                                            height = 'h-[790%]'
                                            break;
                                        default:
                                            break;
                                    }
                                } else {
                                    height = 'h-full'
                                }
                                let idx = calendars.findIndex(calendar => calendar._id === res.event.calendar);
                                let color = calendars[idx]?.color;
                                return (
                                    <Event color={color} width={width} height={height} id={res.event.id} 
                                    name={res.event.name} type={res.event.type} 
                                    description={res.event.description} 
                                    date_start={res.event.date_start} date_end={res.event.date_end}
                                    repeat={res.event.repeat}/>
                                )
                            })
                        }
                    </div>
                )
            } else {
                content.push(
                    <div className='p-1 h-1/24 border-y border-slate-700 w-full'>

                    </div>
                )
            }

        }
        return content;
    }

    const incrementWeek = () => {
        let weekNum = week;
        if(weekNum < weeks) 
            weekNum++;
        setWeek(weekNum);
    }

    const decrementWeek = () =>{
        let weekNum = week;
        if(weekNum > 1) 
            weekNum--;
        setWeek(weekNum);
    }

    return (
        <div className='flex flex-col w-full min-h-screen '>
            <div className='flex flex-row p-1 w-full'>
                <div className='text-center w-1/7 flex flex-row items-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={decrementWeek}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div className='w-full select-none text-lg font-semibold'>Week {week}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={incrementWeek}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
                {props.dayOfWeek.map(day => {
                    return (
                        <div className='text-center w-1/7 select-none font-semibold border-slate-700' key={day}>{day}</div>
                    )
                })}
            </div>
            <div className='p-1 m-1 flex flex-row w-full h-2screen'>
                {drawTimeColumn(true)}
                <div className='w-6/7 flex flex-row '>
                    {
                        drawWeekGrid(events, props.daysCount, props.firstDay, props.month, props.year, props.currentDay, week)
                    }
                </div>
            </div>

        </div >
    )
}
