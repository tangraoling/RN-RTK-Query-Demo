import { configureStore } from '@reduxjs/toolkit'
import { wanApi } from './reducers/wanApi'
import userReducer from './reducers/userState'
import logger from 'redux-logger';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [wanApi.reducerPath]: wanApi.reducer,
  },
  middleware:(getDefaultMiddleware) => {
    if (__DEV__) {
      return getDefaultMiddleware().concat(wanApi.middleware)
    } else {
      return getDefaultMiddleware().concat(wanApi.middleware)
    }
   
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
