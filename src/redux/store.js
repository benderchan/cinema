import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { genresApi } from '../services/genres'
import { authApi } from '../services/auth'
import { accountApi } from '../services/account'
import { discoverApi } from '../services/discover'
import { movieApi } from '../services/movies'
import authReducer from './slices/authSlice'


export const store = configureStore({
    reducer: {
        [genresApi.reducerPath]: genresApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [discoverApi.reducerPath]: discoverApi.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(genresApi.middleware, authApi.middleware, accountApi.middleware, discoverApi.middleware, movieApi.middleware)
})

setupListeners(store.dispatch)
