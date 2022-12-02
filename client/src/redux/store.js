import authSlice from './features/auth/authSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import calendarSlice from '../reducers/calendarSlice';

const rootReducer = combineReducers({
    calendars: calendarSlice,
    auth: authSlice
})

export const store = configureStore({reducer: rootReducer})