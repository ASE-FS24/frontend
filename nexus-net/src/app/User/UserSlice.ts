import {createAsyncThunk, createEntityAdapter, createSelector, createSlice,} from '@reduxjs/toolkit';
import {User} from "./UserType";
import {getAllUsers} from "./userService";

const userAdapter = createEntityAdapter<User>();
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

    const data = await getAllUsers();
    console.log(data);
    return data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        ...userAdapter.getInitialState(),
        status: 'idle',
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, {payload}) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.entities = payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export default usersSlice.reducer

interface RootState {
    users: ReturnType<typeof usersSlice.reducer>;
}

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdapter.getSelectors((state: RootState) => state.users);
