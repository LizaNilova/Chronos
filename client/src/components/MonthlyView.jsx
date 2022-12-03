import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { daysInMonth } from '../functions/daysInMonth';
import getEventsByHours from '../functions/getEventsByHours';
import getEventsOfDay from '../functions/getEventsOfDay';
import Event from './Event';

export default function MonthlyView(props) {
  // console.log(props);

  const events = useSelector(state => state.calendars.choosedEvents);
  const calendars = useSelector(state => state.calendars.calendars);

  const [weeks, setWeeks] = useState(1);

  useEffect(() => {
    let weeks = Math.trunc((props.daysCount + props.firstDay) / 7);
    if ((props.daysCount + props.firstDay) % 7 >= 0) weeks++;
    setWeeks(weeks);
  }, [props.daysCount, props.firstDay, props.currentDay]);

  const drawEvents = (hours_events) => {
    let content = [];
    for (let i = 0; i < 24; i++) {
      // let max = 1;
      const result = hours_events.filter(hour_event => hour_event.hour === i);
      if (result.length > 0) {
        content.push(
          <div className='flex flex-col p-1 w-full '>
            {
              result.map(res => {
                let idx = calendars.findIndex(calendar => calendar._id === res.event.calendar);
                let color = calendars[idx]?.color;
                return (
                  <Event color={color} repeat={res.event.repeat} width={'w-full'} height={'h-full'} id={res.event.id} name={res.event.name} type={res.event.type} description={res.event.description} date_start={res.event.date_start} date_end={res.event.date_end} />
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
          let eventsOfDay;
          if (month > 0) {
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
          let eventsOfDay;
          if (month === 11) {
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
    return content;
  }

  return (
    <div className='flex flex-col w-full h-2screen px-2 py-1'>
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
