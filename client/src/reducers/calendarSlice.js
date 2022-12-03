import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllCalendars = createAsyncThunk(
    'api/calendars',
    async function(_,{dispatch})
    {
        try {
            let response = await axios.get('http://localhost:3002/api/users/calendars',{ withCredentials: true });
            // console.log(response.data);
            dispatch(setCalendars(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const createCalendar = createAsyncThunk(
    'api/calendars',
    async function({name, description, color, members},{dispatch})
    {
        try {
            let response = await axios.post('http://localhost:3002/api/calendars',{name, description, color, members}, { withCredentials: true });
            console.log(response.data);
            dispatch(addCalendar(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCalendar = createAsyncThunk(
    'api/calendars',
    async function({calendars, choosed, id},{dispatch})
    {
        try {
            await axios.delete(`http://localhost:3002/api/calendars/${id}`, { withCredentials: true });
            // console.log(calendars, choosed, id);
            dispatch(removeCalendar({calendars: calendars, choosed:choosed, id: id}));
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateCalendar = createAsyncThunk(
    'api/calendars',
    async function({calendars, name, description, color, visible, national_holidays, members, id},{dispatch})
    {
        try {
            let response = await axios.patch(`http://localhost:3002/api/calendars/${id}`, {name, description, color, visible, national_holidays, members}, { withCredentials: true });
            console.log(response.data);
            dispatch(editCalendar({calendars: calendars, newCalendar: response.data, id: id}))
            // dispatch(setCalendarEvents(id, response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllCalendarEvents = createAsyncThunk(
    'api/calendars/:id/events',
    async function({id},{dispatch})
    {
        try {
            let response = await axios.get(`http://localhost:3002/api/calendars/${id}/events`, { withCredentials: true });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllUserEvents = createAsyncThunk(
    'api/calendars/:id/events',
    async function(_,{dispatch})
    {
        try {
            let response = await axios.get(`http://localhost:3002/api/events`, { withCredentials: true });
            let holidays = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/en.ukrainian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyDHaJwdvxnTBHY_DuLZ2I02fhuSz_xJEpE`);
            console.log(holidays.data.items);
            console.log(response.data);
            dispatch(setUserEvents({events:response.data, holidays: holidays.data.items}));
        } catch (error) {
            console.log(error);
        }
    }
)

export const createEvent = createAsyncThunk(
    'api/events',
    async function({remind, name, description, date_start, date_end, calendars, type, completed, repeat},{dispatch})
    {
        try {
            let response = await axios.post('http://localhost:3002/api/events',
                {remind, name, description, date_start, date_end, calendars, type, completed, repeat}, 
                { withCredentials: true });
            console.log(response.data);
            if(!response.data.message)
                dispatch(addEvent(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateEvent = createAsyncThunk(
    'api/events/:id',
    async function({remind, name, 
        description, date_start, date_end, 
        calendars, type, completed, repeat, id, events},{dispatch})
    {
        try {
            let response = await axios.patch(`http://localhost:3002/api/events/${id}`,
                {remind, name, description, date_start, date_end, calendars, type, completed, repeat}, 
                { withCredentials: true });
            console.log(response.data);
            if(!response.data.message)
                dispatch(editEvent({newEvent: response.data, id: id, events: events}));
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'api/events/:id',
    async function({events, choosed, id},{dispatch})
    {
        try {
            await axios.delete(`http://localhost:3002/api/events/${id}`,
                { withCredentials: true });
            // console.log(response.data);
            dispatch(removeEvent({events: events, choosed: choosed, id: id}));
        } catch (error) {
            console.log(error);
        }
    }
)


const calendarsSlice = createSlice({
    name: 'calendar',
    initialState:{
        calendars:[],

        viewType:'month',

        events: [],
        holidays: [],

        choosedCalendars:[],
        choosedEvents: [],

        creatingEvent: false,
        creatingCalendar: false,

        editing: {
            isEditing: false,
            type: '',
            id: null
        },

    },
    reducers:{
        setCalendars(state, action){
            state.calendars = action.payload;
            let choosedCalendars = [];
            action.payload.forEach(calendar => {
                choosedCalendars.push(calendar._id);
            })
            state.choosedCalendars = choosedCalendars;
        },
        setEvents(state, action)
        {
            state.events = action.payload;
            state.choosedEvents = action.payload;
        },
        setUserEvents(state, action)
        {   
            let holidays = action.payload.holidays;
            // let holidaysEdited = [];
            // holidaysEdited = holidays.map(holiday => {
            //     return({
            //         id: holiday.id,
            //         name: holiday.summary,
            //         date_start: holiday.start.date,
            //         type:'holiday',
            //         description: holiday.summary,
            //         completed: false
            //     })
            // })
            let events = action.payload.events;
            holidays.forEach(holiday => {
                // if(!holiday.summary.includes('Suspended'))
                events.push({
                    id: holiday.id,
                    name: holiday.summary,
                    date_start: holiday.start.date,
                    type: 'holiday',
                    description: holiday.summary,
                    completed: false,
                    remind: '',
                    repeat: 'none',
                    calendars: [],
                    date_end: null
                })
            })
            // state.holidays = holidaysEdited;
            console.log(events);
            state.events = events;
            state.choosedEvents = events;
        },
        setChoosedCalendars(state, action)
        {
            state.choosedCalendars = action.payload.calendars;
            let events = action.payload.events;
            // console.log(action.payload);
            let choosedEvents = []
            events.forEach(event =>{
                let included = false;
                action.payload.calendars.forEach(calendar => {
                    // console.log(event.calendars, calendar);
                    if(event.calendars.includes(calendar) || event.calendars.length === 0)
                    {
                        included = true;
                    }
                    
                })
                if(included)
                {
                    choosedEvents.push(event);
                }
            })
            // console.log(choosedEvents);
            state.choosedEvents = choosedEvents;
        },
        setCreating(state, action)
        {
            if(action.payload.type === 'event')
            {
                state.creatingEvent = action.payload.state;
            } else {
                state.creatingCalendar = action.payload.state;
            }
        },
        addEvent(state, action){
            state.events.push(action.payload);
        },
        addCalendar(state, action){
            state.calendars.push(action.payload);
        },
        removeCalendar(state, action)
        {
            let calendars = [...action.payload.calendars];
            // console.log(calendars);
            let idx = calendars.findIndex(calendar => calendar._id === action.payload.id);
            // console.log(idx);
            calendars.splice(idx, 1);
            state.calendars = calendars;

            // console.log(action.payload.choosed);

            let choosedCalendars = [...action.payload.choosed];
            idx = choosedCalendars.findIndex(calendar => calendar._id === action.payload.id);
            choosedCalendars.splice(idx, 1);
            state.choosedCalendars = choosedCalendars;
        },
        editCalendar(state, action){
            let calendars = [...action.payload.calendars];
            // console.log(calendars);
            let idx = calendars.findIndex(calendar => calendar._id === action.payload.id);
            // console.log(idx);
            calendars[idx] = action.payload.newCalendar;
            state.calendars = calendars;
        },
        editEvent(state, action)
        {
            let events = [...action.payload.events];
            let idx = events.findIndex(event => event._id === action.payload.id);
            events[idx] = action.payload.newEvent;
            state.events = events;
        },
        setViewType(state, action)
        {
            state.viewType = action.payload;
        },
        setEditing(state, action)
        {
            state.editing = action.payload;
        },
        removeEvent(state, action)
        {
            let events = [...action.payload.events];

            console.log(events);

            let idx = events.findIndex(event => event._id === action.payload.id);

            console.log(idx);

            events.splice(idx, 1);
            state.events = events;

            console.log(action.payload.choosed);

            let choosedEvents = [...action.payload.choosed];
            idx = choosedEvents.findIndex(event => event._id === action.payload.id);
            choosedEvents.splice(idx, 1);
            state.choosedEvents = choosedEvents;
        }
    }
})

export default calendarsSlice.reducer
export const {setCalendars, setCalendarEvents, setUserEvents, setChoosedCalendars, setCreating, addEvent, addCalendar, removeCalendar, setViewType, setEditing, editCalendar, editEvent, removeEvent} = calendarsSlice.actions;

