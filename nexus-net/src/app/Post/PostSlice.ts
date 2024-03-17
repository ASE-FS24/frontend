import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import {getAllPosts} from "./PostService";
import {Post} from "./PostType";

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

// export const selectAllPosts = (state: RootState) => state.posts.entities;
function compareCreationDate(post1: Post, post2: Post) {
    const date1 = post1.edited ? post1.editedDate : post1.createdDate;
    const date2 = post2.edited ? post2.editedDate : post2.createdDate;
    const d1 = new Date(Date.parse(date1));
    const d2 = new Date(Date.parse(date2));
    return d1.getTime() - d2.getTime();
}

export const selectAllPosts = (state: RootState) => {
    return [...state.posts.entities].sort(compareCreationDate);
}
export const selectPostsById = (state: RootState, id: number) =>
    state.posts.entities.find((post) => post.id === id);
