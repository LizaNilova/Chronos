import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllCalendars = createAsyncThunk(
    'api/users',
    async function(_,{dispatch})
    {
        try {
            let response = await axios.get('http://localhost:3002/api/calendars',{ withCredentials: true });
            // console.log(response.data);
            dispatch(setCalendars(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users:[],

    },
    reducers:{
        setCalendars(state, action){
            state.users = action.payload;
        },
    },
    extraReducers:{

    }
})

export default usersSlice.reducer
export const {setCalendars} = usersSlice.actions;

