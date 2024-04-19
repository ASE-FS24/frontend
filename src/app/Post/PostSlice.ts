import {createAsyncThunk, createSelector, createSlice,} from '@reduxjs/toolkit';
import {createNewPost, getAllPosts, getPost} from "./PostService";
import {NewPost, Post} from "./PostType";


interface IPostState {
    entities: any[];
    status: string;
}
const initialState: IPostState = {
    entities: [],
    status: 'idle'
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    return await getAllPosts()
})

export const createPost = createAsyncThunk('posts/createPost', async (newPost: NewPost) => {
    return await createNewPost(newPost);
})

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id: string) => {
    return await getPost(id);
});

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
            .addCase(createPost.fulfilled, (state, {payload}) => {
                state.entities = [...state.entities, payload];
            })
            .addCase(fetchPost.fulfilled, (state, {payload}) => {
                const index = state.entities.findIndex((post) => post.id === payload.id);
                console.log("index " + index);
                if (index !== -1) {
                    state.entities[index] = payload;
                }
            })
    }
})

export default postsSlice.reducer

interface RootState {
    posts: ReturnType<typeof postsSlice.reducer>;
}

// export const selectAllPosts = (state: RootState) => state.posts.entities;
function compareCreationDate(post1: Post, post2: Post) {
    const date1 = post1.edited ? post1.editedDateTime : post1.createdDateTime;
    const date2 = post2.edited ? post2.editedDateTime : post2.createdDateTime;
    const d1 = new Date(Date.parse(date1));
    const d2 = new Date(Date.parse(date2));
    return d1.getTime() - d2.getTime();
}
export const selectPostsById = (state: RootState, id: string): Post =>
    state.posts.entities.find((post: Post) => post.id === id);

export const selectPostsState = (state: RootState) => state.posts.status;

const selectPostsEntities = (state: RootState) => state.posts.entities;

export const selectAllPosts = createSelector(
    [selectPostsEntities],
    (postsEntities) => [...postsEntities].sort(compareCreationDate)
);
