import { useEffect, useState } from 'react';
import LeftPanel from '../components/LeftPanel';
import MonthlyView from '../components/MonthlyView';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { getAllCalendars, getAllUserEvents } from '../reducers/calendarSlice';
import { daysInMonth } from '../functions/daysInMonth';
import WeeklyView from '../components/WeeklyView';
import Header from '../components/Header';
import DailyView from '../components/DailyView';
import ModalEventEdit from '../components/ModalEventEdit';


export default function MainPage() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
      month: null,
      year: null,
      day: null,
      firstDay: null,
      daysCount: null,
  
      currentDay: null,
      currentMonth: null,
      currentYear: null,
  
      isSidePanelVisible: true
    });
  
    const dayOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
    useEffect(() => {
  
      var dateObj = new Date();
      var month = dateObj.getMonth(); //months from 0-11
      var day = dateObj.getDate();
      var year = dateObj.getFullYear();
      let firstDay = (new Date(year, month)).getDay();
      let daysCount = daysInMonth(month, year);
      // console.log(day + '.' + month + '.' + year, 'First day is a ', firstDay, ' in a week; ', daysCount, ' - days in this month');
  
      setState(prevState => ({
        ...prevState,
        month: month,
        year: year,
        day: day,
        currentDay: day,
        currentMonth: month,
        currentYear: year,
        firstDay: firstDay,
        daysCount: daysCount
      }));
      
      // Строка ниже использовалась когда модуль регистрации не был прикреплён.
      // axios.post(`http://localhost:3002/api/auth/login`, { "username_or_email": "kukushka", "password": "kuku1" }, { withCredentials: true });
  
      dispatch(getAllCalendars());
      dispatch(getAllUserEvents({year: year}));
  
    }, [dispatch]);
  
  
    const incrementMonth = () => {
      if (state.month < 11) {
        let month = state.month + 1;
        let firstDay = (new Date(state.year, month)).getDay();
        let daysCount = daysInMonth(month, state.year);
        setState(prevState => ({
          ...prevState,
          month: month,
          firstDay: firstDay,
          daysCount: daysCount
        }));
      } else {
        let year = state.year + 1;
        let firstDay = (new Date(year, 0)).getDay();
        let daysCount = daysInMonth(0, year);
        setState(prevState => ({
          ...prevState,
          year: year,
          month: 0,
          firstDay: firstDay,
          daysCount: daysCount
        }));
      }
    }
  
    const decrementMonth = () => {
      if (state.month > 0) {
        let month = state.month - 1;
        let firstDay = (new Date(state.year, month)).getDay();
        let daysCount = daysInMonth(month, state.year);
        setState(prevState => ({
          ...prevState,
          month: month,
          firstDay: firstDay,
          daysCount: daysCount
        }));
      } else {
        let year = state.year - 1;
        let firstDay = (new Date(year, 11)).getDay();
        let daysCount = daysInMonth(11, year);
        setState(prevState => ({
          ...prevState,
          year: year,
          month: 11,
          firstDay: firstDay,
          daysCount: daysCount
        }));
      }
    }
  
    const hideClick = () => {
      if (state.isSidePanelVisible) {
        setState(prevState => ({
          ...prevState,
          isSidePanelVisible: false
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          isSidePanelVisible: true
        }));
      }
    }
    
    const viewType = useSelector(state => state.calendars.viewType);
  
    const getView = (viewType) => {
      switch (viewType) {
        case 'month':
          return(
            <MonthlyView
              dayOfWeek={dayOfWeek}
              daysCount={state.daysCount}
              firstDay={state.firstDay}
              month={state.month}
              year={state.year}
              isCurMonth={state.currentMonth === state.month}
              isCurYear={state.year === state.currentYear}
              currentDay={state.currentDay}
            />
          )
        case 'week':
          return(
            <WeeklyView
              dayOfWeek={dayOfWeek}
              daysCount={state.daysCount}
              firstDay={state.firstDay}
              month={state.month}
              year={state.year}
              isCurMonth={state.currentMonth === state.month}
              isCurYear={state.year === state.currentYear}
              currentDay={state.currentDay}
            />
          )
        case 'day':
          return(
            <DailyView
              // dayOfWeek={dayOfWeek}
              daysCount={state.daysCount}
              // firstDay={state.firstDay}
              month={state.month}
              year={state.year}
              isCurMonth={state.currentMonth === state.month}
              isCurYear={state.year === state.currentYear}
              currentDay={state.currentDay}
            />
          )
        default:
          break;
      }
    }

    const editing = useSelector(state => state.calendars.editing);
    
    
    if (state.month !== null)
      return (
        <div className="flex flex-col min-h-screen">
          <Header incrementMonth={incrementMonth} decrementMonth={decrementMonth} hideClick={hideClick} months={months} month={state.month} year={state.year} />
          <div className='px-4 flex flex-row bg-neutral-400 h-full w-full'>
            {
              state.isSidePanelVisible &&
              <LeftPanel
                months={months}
                dayOfWeek={dayOfWeek}
                month={state.month}
                year={state.year}
                incrementMonth={incrementMonth}
                decrementMonth={decrementMonth}
                daysCount={state.daysCount}
                firstDay={state.firstDay}
                isCurMonth={state.currentMonth === state.month}
                isCurYear={state.year === state.currentYear}
                currentDay={state.currentDay}
              />
            }
            {editing.type === 'event' && <ModalEventEdit id={editing.id}/>}
            { getView(viewType) } 
          </div>
        </div>
      );
    else return (
    <div className='flex flex-row items-center justify-center text-center font-bold h-screen text-2xl'>
      <div>Loading ...</div>
    </div>      
    )

}
