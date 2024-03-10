import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './User/UserSlice'

export default configureStore({
    reducer: {
        users: usersReducer
    },
})