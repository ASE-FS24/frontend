import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createUser, getUser, getUserByUsername} from "./UserService";

interface IUserState {
    value: any;
}
const initialState: IUserState = {
    value: null,
};

export const getLoggedInUserThunk = createAsyncThunk('users/getLoggedInUser', async (username: string) => {
        return await getUserByUsername(username);
});

export const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            const newUser = action.payload;
            createUser(newUser);
            state.value = {...action.payload};
        }
    },
    extraReducers(builder) {
        builder.addCase(getLoggedInUserThunk.fulfilled, (state, {payload}) => {
            state.value = payload;
        })
    }
})

export const {setLoggedInUser} = loggedInUserSlice.actions

export default loggedInUserSlice.reducer

interface RootState {
    loggedInUser: ReturnType<typeof loggedInUserSlice.reducer>;
}

export const selectActiveUser = (state: RootState) => state.loggedInUser.value;
