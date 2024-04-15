import {createAsyncThunk, createSelector, createSlice,} from '@reduxjs/toolkit';
import {getAllUsers, getNetwork} from "./UserService";
import {FollowUser} from "./UserType";

interface IUserState {
    entities: any[];
    network: FollowUser[];
    status: string;
    networkStatus: string;
}
const initialState: IUserState = {
    entities: [],
    network: [],
    status: 'idle',
    networkStatus: 'idle'
};
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await getAllUsers()
})

export const fetchNetwork = createAsyncThunk('users/fetchNetwork', async () => {
    return await getNetwork()
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
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
            .addCase(fetchNetwork.pending, (state, {payload}) => {
                state.networkStatus = 'loading'
            })
            .addCase(fetchNetwork.fulfilled, (state, {payload}) => {
                state.networkStatus = 'succeeded'
                state.network = payload;
            })
            .addCase(fetchNetwork.rejected, (state, action) => {
                state.networkStatus = 'failed';
            })
    }
})

export const selectNetwork = createSelector(
    // Input selector
    (state: RootState) => state.users.network,

    // Result function
    (network) => {
        const nodesMap = network.reduce((acc, link) => {
            [link.source, link.target].forEach(id => {
                acc.has(id) ? acc.get(id)!.val += 1 : acc.set(id, {id, name: id, val: 1});
            });
            return acc;
        }, new Map<string, { id: string, name: string, val: number }>());
        const nodes = Array.from(nodesMap.values());

        return {nodes: nodes, links: network};
    }
);

export const selectNetworkStatus = (state: RootState) => state.users.networkStatus;

export default usersSlice.reducer

interface RootState {
    users: ReturnType<typeof usersSlice.reducer>;
}

export const selectAllUsers = (state: RootState) => state.users.entities;

export const selectUserById = (state: RootState, id: number) =>
    state.users.entities.find((user) => user.id === id);
