import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { mainColor } from '../common/appStyle'
import { TabProps } from '../common/navTypes'
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home'
import Tree from './tree/Tree'
import Offiaccount from './Offiaccount'
import Project from './Project'


const Tab = createBottomTabNavigator()

export default function WanTab({ route }: TabProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: '#aaaaaa',
       
        headerStyle: {
          backgroundColor: mainColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 17,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen 
        name="ChatList" 
        component={Home}
        options={{ 
          tabBarLabel: '首页',
          title: '首页',
          tabBarIcon: ({ color, size }) => <Icon  name="home-outline" size={size} color={color} />,
        }}
      />
     <Tab.Screen
        name="Offiaccount"
        component={Offiaccount}
        options={{
          tabBarLabel: '公众号',
          title: '公众号',
          tabBarIcon: ({ color, size }) => <Icon name="person-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Project"
        component={Project}
        options={{
          tabBarLabel: '项目',
          title: '项目',
          tabBarIcon: ({ color, size }) => <Icon name="egg-outline" size={size} color={color} />,
        }}
      />
       <Tab.Screen
        name="Tree"
        component={Tree}
        options={{
          tabBarLabel: '体系',
          title: '体系',
          tabBarIcon: ({ color, size }) => <Icon name="apps-outline" size={size} color={color} />,
        }} />
    </Tab.Navigator>
  )
}