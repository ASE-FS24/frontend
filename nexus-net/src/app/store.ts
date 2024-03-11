import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './User/UserSlice'
import postsReducer from './Post/PostSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch