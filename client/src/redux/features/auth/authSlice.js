import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
  user: null,
  isLoading: false,
  status: null,
  me: null
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ login, password, passwordConfirmation, email }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        login,
        password,
        passwordConfirmation,
        email,
      }, { withCredentials: true })
      return data
    } catch (error) {
      console.log(error)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username_or_email, password }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        username_or_email,
        password
      }, { withCredentials: true })

      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  },
)

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
    // console.log(data)
    // localStorage.setItem('me', data.user)
    return data
  } catch (error) {
    console.log(error)
  }
},
)

export const passwordForgot = createAsyncThunk(
  "auth/passwordForgot",
  async ({ email }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/recover", {
        email,
      }, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const verifyPassword = createAsyncThunk(
  "auth/verifyPassword",
  async ({ new_password, confirm_password, token }) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/recover/${token}`, {
        new_password,
        confirm_password,
      }, { withCredentials: true });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// function setCookie(name, value, options = {}) {

//   options = {
//     path: '/',
//     // при необходимости добавьте другие значения по умолчанию
//     ...options
//   };

//   if (options.expires instanceof Date) {
//     options.expires = options.expires.toUTCString();
//   }

//   let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

//   for (let optionKey in options) {
//     updatedCookie += "; " + optionKey;
//     let optionValue = options[optionKey];
//     if (optionValue !== true) {
//       updatedCookie += "=" + optionValue;
//     }
//   }

//   document.cookie = updatedCookie;
// }

// function deleteCookie(name) {
//   setCookie(name, "", {
//     'max-age': -1
//   })
// }

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/logout', { withCredentials: true })
      // deleteCookie('accessToken')
      // deleteCookie('jwt')
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      return data
    }
    catch (error) {
      console.log(error)
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: {
    //Registration
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Login
    [loginUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Logout
    [logout.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null
      state.isLoading = false
      state.status = action.payload.message
      state.me = null
    },
    [logout.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    //Check authorization (Get ME)
    [getMe.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = null
      // state.userID = localStorage.getItem('userId')
      state.me = action.payload?.user
      // state.token = action.payload?.token
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },

    // Forgot password
    [passwordForgot.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [passwordForgot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    [passwordForgot.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Verify password
    [verifyPassword.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [verifyPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    [verifyPassword.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  }
})

export default authSlice.reducer