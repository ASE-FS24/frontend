import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import {getAllPosts} from "./PostService";

interface IPostState {
    entities: any[];
    status: string;
}
const initialState: IPostState = {
    entities: [],
    status: 'idle'
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {

    const data = await getAllPosts();
    console.log(data);
    return data
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.entities = payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export default postsSlice.reducer

interface RootState {
    posts: ReturnType<typeof postsSlice.reducer>;
}

export const selectAllPosts = (state: RootState) => state.posts.entities;
export const selectPostsById = (state: RootState, id: number) =>
    state.posts.entities.find((post) => post.id === id);
