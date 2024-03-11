import {createSlice} from '@reduxjs/toolkit';

export const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState: {
        value: null
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            state.value = {...action.payload}
        }
    }
})

export default loggedInUserSlice.reducer

interface RootState {
    loggedInUser: ReturnType<typeof loggedInUserSlice.reducer>;
}

export const selectActiveUser = (state: RootState) => state.loggedInUser.value;
