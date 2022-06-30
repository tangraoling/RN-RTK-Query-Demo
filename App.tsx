import React, { useEffect } from 'react'
import {
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { store } from './store'
import { Provider } from 'react-redux'
import { mainColor } from './common/appStyle'
import Drawer from './screens/Drawer'
import { initUserInfo } from './reducers/userState'


// const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    store.dispatch(initUserInfo())
  }, [])

  return (
      <Provider store={store}>
        <NavigationContainer >
          <StatusBar backgroundColor={mainColor} barStyle='light-content' />
          <Drawer />
        </NavigationContainer>
      </Provider>
  )
}

export default App
