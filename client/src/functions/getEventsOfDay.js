export default function getEventsOfDay(events, day, month, year) {
    let eventsOfDay = [];
    // console.log(events);
    events.forEach(event => {
        var dateObjStart = new Date(event.date_start);
        var dateObjEnd;
        // console.log(event.repeat);

        // let daysInMonth = daysInMonth(month, year);

        
        var monthStart = dateObjStart.getMonth(); //months from 0-11
        var dayStart = dateObjStart.getDate();
        var yearStart = dateObjStart.getFullYear();
        var hourStart = dateObjStart.getHours();
        var minutesStart = dateObjStart.getMinutes();

        
        var hoursEnd = hourStart + 1;
        var minutesEnd = minutesStart;
        if(event.date_end)
        {
            dateObjEnd = new Date(event.date_end);
            hoursEnd = dateObjEnd.getHours();
            minutesEnd = dateObjEnd.getMinutes();
        }
        if(event.type === 'holiday' || event.type === 'task')
        {
            hourStart = 0;
            hoursEnd = 1;
        }

        // console.log(dayStart, monthStart, yearStart, hourStart);
        // let repeatDay = dayStart;
        // let repeatMonth = monthStart;
        // let repeatYear = yearStart;
        switch (event.repeat) {
            case 'day':
                // console.log('DAYLY', event);
                    dayStart = day;
                    monthStart = month;
                    yearStart = year;
                break;
            case 'week':
                // repeatDay
                // console.log('WEEKLY', event);
                let weekDayEvent = (new Date(yearStart, monthStart, dayStart)).getDay();
                let weekDayToday = (new Date(year, month, day)).getDay();
                if(weekDayEvent === weekDayToday)
                {
                    dayStart = day;
                    monthStart = month;
                    yearStart = year;
                }
                break;
            case 'month':
                // console.log('MONTHLY', event);
                if(dayStart === day)
                {
                    dayStart = day;
                    monthStart = month;
                    yearStart = year;
                }
                break;

            default:
                break;
        }

        if (dayStart === day && monthStart === month && yearStart === year) {
            eventsOfDay.push({ id: event._id, name: event.name, type:event.type, repeat:event.repeat, description: event.description, date_start:event.date_start, date_end:event.date_end, month: monthStart, year: yearStart, day: dayStart, hoursStart: hourStart, minutesStart: minutesStart, hoursEnd: hoursEnd, minutesEnd: minutesEnd });
        }
    })
    return eventsOfDay;
}