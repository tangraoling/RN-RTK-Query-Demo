import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RootStackParamList from '../common/navTypes'
import { mainColor } from '../common/appStyle'
import Tab from './Tab'
import Login from './Login'
import Web from './Web'
import TreeArticle from './tree/TreeArticle'
import FavorArticle from './FavorArticle'


const Stack = createStackNavigator<RootStackParamList>()


export default function WanStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: mainColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 17,
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: '登录' }} />
      <Stack.Screen name="Web" component={Web} />
      <Stack.Screen name="TreeArticle" component={TreeArticle} />
      <Stack.Screen name="FavorArticle" component={FavorArticle} options={{ title: '我的收藏' }} />
    </Stack.Navigator>
  )
}