
export default function getEventsByHours(eventsOfDayArr) {
    let hours_events = []
    for (let i = 0; i < 24; i++) {
        let count = 0;
        eventsOfDayArr.forEach(event => {
            if (event.hoursStart === i) {
                hours_events.push(
                    { hour: i, count: ++count, event: event, size: event.hoursEnd > event.hoursStart ? event.hoursEnd - event.hoursStart : 1 }
                )
            }
        })
    }
    // console.log(hours_events);
    return hours_events;
}