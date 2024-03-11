import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './User/UserSlice'
import postsReducer from './Post/PostSlice'
import loggedInUserReducer from './User/LoggedInUserSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        loggedInUser: loggedInUserReducer,
        posts: postsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch