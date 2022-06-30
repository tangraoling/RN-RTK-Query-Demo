import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfo } from '../common/types'
import * as utils from '../common/utils'


type UserState = {
  userInfo: UserInfo | null,
  isLogin: boolean
}
const initialState: UserState = {
  isLogin: false,
  userInfo: null,
}
const userInfoKey = 'userInfoKey'

export const setUserInfo = createAsyncThunk<UserInfo, UserInfo>(
  'user/setUserInfo',
   async (userInfo) => {
    await utils.setStorageItem(userInfoKey, userInfo)
    return userInfo
  }
)

export const clearUserInfo = createAsyncThunk(
  'user/clearUserInfo',
  async () => {
    await utils.setStorageItem(userInfoKey, null)
  }
)

export const initUserInfo = createAsyncThunk(
  'user/initUser',
  async () => {
    const info = await utils.getStorageItem(userInfoKey, null)
    console.log('init userinfo:', info)
    if (info != null) {
      return info
    } else {
      throw new Error('无登录用户信息')
    }
  }
)
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(setUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload
      state.isLogin = true
    })
    builder.addCase(clearUserInfo.fulfilled,  (state) => {
      state.userInfo = null
      state.isLogin = false
    })
    builder.addCase(initUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload
      state.isLogin = true
    })
  },
  
})


// export const {   } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer
