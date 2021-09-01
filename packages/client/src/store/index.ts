import {applyMiddleware, compose, configureStore, createStore} from '@reduxjs/toolkit'
import walletReducer from '../slices/wallet'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {createRootReducer} from "../slices/index"
export const history = createBrowserHistory()
export const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history)]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch