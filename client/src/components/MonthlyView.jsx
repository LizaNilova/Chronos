import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { daysInMonth } from '../functions/daysInMonth';
import getEventsByHours from '../functions/getEventsByHours';
import getEventsOfDay from '../functions/getEventsOfDay';
import Event from './Event';

export default function MonthlyView(props) {
  // console.log(props);

  const events = useSelector(state => state.calendars.choosedEvents);
  // console.log(events);
  // const choosedCalendars = useSelector(state => state.calendars.choosedCalendars);
  const [weeks, setWeeks] = useState(1);

  useEffect(() => {
    let weeks = Math.trunc((props.daysCount + props.firstDay) / 7);
    if ((props.daysCount + props.firstDay) % 7 >= 0) weeks++;
    // console.log(weeks);
    // if(weeks < 6)
    // {
    //   weeks++;
    // }
    setWeeks(weeks);
}, [props.daysCount, props.firstDay, props.currentDay]);

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
            <div className='flex flex-col p-1 w-full '>
              {
                      result.map(res => {
                          // let width;
                          // if (result.length > 1) {
                          //     switch (result.length) {
                          //         case 2:
                          //             width = 'w-1/2'
                          //             break;
                          //         case 3:
                          //             width = 'w-1/3'
                          //             break;
                          //         // case 4:
                          //         //     width = 'w-1/4'
                          //         //     break;
                          //         // case 5:
                          //         //     width = 'w-1/5'
                          //         //     break;
                          //         // case 6:
                          //         //     width = 'w-1/6'
                          //         //     break;


                          //         default:
                          //           width = 'w-1/3' 
                          //             break;
                          //     }
                          // } else width = 'w-full';
                          // let height;
                          // if (res.size > 1) {
                          //     switch (res.size) {
                          //         case 2:
                          //             height = 'h-[210%]'
                          //             break;
                          //         case 3:
                          //             height = 'h-[320%]'
                          //             break;
                          //         case 4:
                          //             height = 'h-[440%]'
                          //             break;
                          //         case 5:
                          //             height = 'h-[560%]'
                          //             break;
                          //         case 6:
                          //             height = 'h-[670%]'
                          //             break;
                          //         case 7:
                          //             height = 'h-[790%]'
                          //             break;
                          //         default:
                          //             break;
                          //     }
                          // } else {
                          //     height = 'h-full'
                          // }
                          return (
                              <Event repeat={res.event.repeat} width={'w-full'} height={'h-full'} id={res.event.id} name={res.event.name} type={res.event.type} description={res.event.description} date_start={res.event.date_start} date_end={res.event.date_end}/>
                          )
                      })
                    }
                    </div>
          )
      } else {
          content.push(
              <div className=''>

              </div>
          )
      }

  }
  return content;
}

const getMonthEvents = (weeks, daysCount, firstDay, month, year, currentDay, events) => {
  let content = [];
  for (let i = 1; i <= weeks; i++) {
    content.push(
      <div className='flex flex-row px-1 w-full h-full'>
        {getEventsGrid(i, daysCount, firstDay, month, year, currentDay, events)}
      </div>
    )
  }
  return content;
}

const getEventsGrid = (week, daysCount, firstDay, month, year, currentDay, events) => {
    // console.log(events);
    let content = [];
    // let offset = 42 - daysCount - firstDay;
    // let key = 0;
    // for (let week = 1; week <= weeks; week++) {
      switch (week) {
        case 1:
            let prevDaysCount;
            if (month > 0) {
                prevDaysCount = daysInMonth(month - 1, year);
            } else {
                prevDaysCount = daysInMonth(11, year - 1);
            }
            for (let i = prevDaysCount - firstDay + 1; i <= prevDaysCount; i++) {
                let eventsOfDay ;
                if(month > 0)
                {
                  eventsOfDay = getEventsOfDay(events, i, month - 1, year);
                } else eventsOfDay = getEventsOfDay(events, i, 11, year - 1);
                // console.log(eventsOfDay);
                let hoursEvents = getEventsByHours(eventsOfDay);
                // console.log(hoursEvents);
                content.push(
                    <div className='text-center border border-slate-700 w-1/6 h-full bg-slate-500 flex flex-col'>
                        <div className='font-bold text-lg p-1'>{i}</div>
                        {drawEvents(hoursEvents)}
                    </div>
                )
            }
            for (let i = 1; i <= 7 - firstDay; i++) {
                let eventsOfDay = getEventsOfDay(events, i, month, year);
                let hoursEvents = getEventsByHours(eventsOfDay);
                content.push(
                    <div className='text-center border border-slate-700 w-1/6 h-full bg-slate-300 flex flex-col'>
                        <div className='font-bold text-lg p-1'>{i}</div>
                        {drawEvents(hoursEvents)}
                    </div>
                )
            }
            break;
        case weeks:
            for (let i = (week - 1) * 7 + 1 - firstDay; i <= daysCount; i++) {
                let eventsOfDay = getEventsOfDay(events, i, month, year);
                let hoursEvents = getEventsByHours(eventsOfDay);
                content.push(
                    <div className='text-center border border-slate-700 w-1/6 h-full bg-slate-300 flex flex-col'>
                        <div className='font-bold text-lg  p-1'>{i}</div>
                        {drawEvents(hoursEvents)}
                    </div>
                )
            }
            for (let i = 1; i <= 6 - (daysCount - ((week - 1) * 7 + 1 - firstDay)); i++) {
                let eventsOfDay ;
                if(month === 11)
                {
                  eventsOfDay = getEventsOfDay(events, i, 0, year + 1);
                } else eventsOfDay = getEventsOfDay(events, i, month + 1, year);
                let hoursEvents = getEventsByHours(eventsOfDay);
                content.push(
                    <div className='text-center border border-slate-700 w-1/6 h-full bg-slate-500 flex flex-col'>
                        <div className='font-bold text-lg p-1'>{i}</div>
                        {drawEvents(hoursEvents)}
                    </div>
                )
            }
            // return content;
            break;
        default:
            for (let i = (week - 1) * 7 + 1 - firstDay; i <= 7 * week - firstDay; i++) {
                let eventsOfDay = getEventsOfDay(events, i, month, year);
                let hoursEvents = getEventsByHours(eventsOfDay);
                content.push(
                    <div className='text-center border border-slate-700 w-1/6 h-full bg-slate-300 flex flex-col'>
                        <div className='font-bold text-lg p-1'>{i}</div>
                        {drawEvents(hoursEvents)}
                    </div>
                )
            }
            break;
      }
    // }
    
    // let prevDaysCount;
    // if (month > 0) {
    //   prevDaysCount = daysInMonth(month - 1, year);
    // } else {
    //   prevDaysCount = daysInMonth(11, year - 1);
    // }

    // if (rowNum === 0) {
      // for (let i = prevDaysCount - firstDay + 1; i <= prevDaysCount; i++) {
      //   content.push(
      //     <div className='text-center border border-slate-400 flex flex-col w-1/6 bg-slate-200'>
      //       <div className='font-bold text-lg' >{i}</div>
      //     </div>
      //   )
      // }
      // for (let i = 1; i <= 7 - firstDay; i++) {
      //   content.push(
      //     <div className='text-center border border-slate-400 flex flex-col w-1/6'>
      //       {isCurMonth && isCurYear && currentDay === i ? <div className='font-bold text-lg bg-blue-200'>{i}</div> : <div className='font-bold text-lg'>{i}</div>}
      //       <div className='overflow-y-auto scrollbar'>
      //         {events.length > 0 && events.map(event => {
      //           var dateObjStart = new Date(event.date_start);
      //           var monthStart = dateObjStart.getMonth(); //months from 0-11
      //           var dayStart = dateObjStart.getDate();
      //           var yearStart = dateObjStart.getFullYear();
      //           if (monthStart === month && dayStart === i && yearStart === year) {
      //             key++;
      //             return (<div className='border p-1 mx-3 my-1 hover:cursor-pointer' key={key}>{event.name}</div>)
      //           }
      //           else return <></>
      //         })}
      //       </div>
      //     </div>
      //   )
      //   key++;
      // }
    // } else {
    //   // console.log(rowNum * 7 - firstDay + 1, (rowNum + 1) * 7 - firstDay)
    //   if ((rowNum + 1) * 7 - firstDay > daysCount && rowNum * 7 - firstDay + 1 <= daysCount) {
    //     for (let i = rowNum * 7 - firstDay + 1; i <= daysCount; i++) {
    //       content.push(
    //         <div className='text-center border border-slate-400 flex flex-col w-1/6' >
    //           {isCurMonth && isCurYear && currentDay === i ? <div className='font-bold text-lg bg-blue-200'>{i}</div> : <div className='font-bold text-lg'>{i}</div>}
    //           <div className='overflow-y-auto scrollbar'>
    //             {events.length > 0 && events.map(event => {
    //               var dateObjStart = new Date(event.date_start);
    //               var monthStart = dateObjStart.getMonth(); //months from 0-11
    //               var dayStart = dateObjStart.getDate();
    //               var yearStart = dateObjStart.getFullYear();
    //               if (monthStart === month && dayStart === i && yearStart === year) {
    //                 key++;
    //                 return (<div className='border p-1 mx-3 my-1 hover:cursor-pointer' key={key}>{event.name}</div>)
    //               }
    //               else return <></>
    //             })}
    //           </div>
    //         </div>
    //       )
    //       key++;
    //     }
    //     for (let i = 1; i <= (rowNum + 1) * 7 - firstDay - daysCount; i++) {
    //       content.push(
    //         <div className='text-center border border-slate-400 flex flex-col w-1/6 bg-slate-200'>
    //           {isCurMonth && isCurYear && currentDay === i ? <div className='font-bold text-lg bg-blue-200'>{i}</div> : <div className='font-bold text-lg'>{i}</div>}
    //           <div className='overflow-y-auto scrollbar'>
    //             {events.length > 0 && events.map(event => {
    //               var dateObjStart = new Date(event.date_start);
    //               var monthStart = dateObjStart.getMonth(); //months from 0-11
    //               var dayStart = dateObjStart.getDate();
    //               var yearStart = dateObjStart.getFullYear();
    //               if (monthStart === month + 1 && dayStart === i && yearStart === year) {
    //                 key++;
    //                 return (<div className='border p-1 mx-3 my-1 hover:cursor-pointer' key={key}>{event.name}</div>)
    //               }

    //               else return <></>
    //             })}
    //           </div>
    //         </div>
    //       )
    //       key++;
    //     }
    //   } else if ((rowNum + 1) * 7 - firstDay > daysCount && rowNum * 7 - firstDay + 1 > daysCount) {
    //     for (let i = rowNum * 7 - firstDay - daysCount + 1; i <= rowNum * 7 - firstDay - daysCount + 7; i++) {
    //       content.push(
    //         <div className='text-center border border-slate-400 flex flex-col w-1/6 bg-slate-200' >
    //           {isCurMonth && isCurYear && currentDay === i ? <div className='font-bold text-lg bg-blue-200'>{i}</div> : <div className='font-bold text-lg'>{i}</div>}
    //           <div className='overflow-y-auto scrollbar'>
    //             {events.length > 0 && events.map(event => {
    //               var dateObjStart = new Date(event.date_start);
    //               var monthStart = dateObjStart.getMonth(); //months from 0-11
    //               var dayStart = dateObjStart.getDate();
    //               var yearStart = dateObjStart.getFullYear();
    //               if (monthStart === month && dayStart === i && yearStart === year) {
    //                 key++;
    //                 return (<div className='border p-1 mx-3 my-1 hover:cursor-pointer' key={key}>{event.name}</div>)
    //               }
    //               else return <></>
    //             })}
    //           </div>
    //         </div>
    //       )
    //       key++;
    //     }
    //   } else {
    //     for (let i = rowNum * 7 - firstDay + 1; i <= (rowNum + 1) * 7 - firstDay; i++) {
    //       content.push(
    //         <div className='text-center border border-slate-400 flex flex-col w-1/6' >
    //           {isCurMonth && isCurYear && currentDay === i ? <div className='font-bold text-lg bg-blue-200'>{i}</div> : <div className='font-bold text-lg'>{i}</div>}
    //           <div className='overflow-y-auto scrollbar'>
    //             {events.length > 0 && events.map(event => {
    //               var dateObjStart = new Date(event.date_start);
    //               var monthStart = dateObjStart.getMonth(); //months from 0-11
    //               var dayStart = dateObjStart.getDate();
    //               var yearStart = dateObjStart.getFullYear();
    //               if (monthStart === month && dayStart === i && yearStart === year) {
    //                 key++;
    //                 return (<div className='border p-1 mx-3 my-1 hover:cursor-pointer' key={key}>{event.name}</div>)
    //               }
    //               else return <></>
    //             })}
    //           </div>
    //         </div>
    //       )

    //     }
    //   }

    // }

    return content;
  }

  return (
    <div className='flex flex-col w-full h-2screen'>
      <div className='flex flex-row p-1 w-full '>
        {props.dayOfWeek.map(day => {
          return (
            <div className='text-center w-1/6 font-semibold' key={day}>{day}</div>
          )
        })}
      </div>
      {getMonthEvents(weeks, props.daysCount, props.firstDay, props.month, props.year, props.currentDay, events)}

    </div>
  )
}
