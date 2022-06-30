import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAppSelector } from '../hooks';
import Stack from './Stack'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import * as appStyle from '../common/appStyle'
import { DrawerActions, CommonActions } from '@react-navigation/native'
import { useLogoutMutation } from '../reducers/wanApi'
import { useAppDispatch } from '../hooks'
import { clearUserInfo } from '../reducers/userState';


const content = (props: DrawerContentComponentProps) => {
  const { isLogin, userInfo } = useAppSelector(st => st.user)
  const dispatch = useAppDispatch()
  const [toggleLogout] = useLogoutMutation()

  const login = () => {
    props.navigation.navigate('Login')
  }
  const pressMyFavor = () => {
    if (isLogin) {
      props.navigation.navigate('FavorArticle')
    } else {
      props.navigation.navigate('Login')
    }
  }
  const pressLogout = async () => {
    const ret = await toggleLogout().unwrap()
    if (ret.errorCode === 0) {
      dispatch(clearUserInfo())
    }
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
     <View style={styles.topWrap}>
        <TouchableOpacity style={styles.close} onPress={() => props.navigation.closeDrawer()}>
          <Icon name="close" size={25} color="white" />
        </TouchableOpacity>
        {isLogin ? (
          <View style={styles.top}>
            <Text style={styles.name}>{userInfo?.nickname}</Text>
            <Text style={styles.email}>{userInfo?.email}</Text>
          </View>
        ) : (
          <View style={styles.top}>
            {/* <TouchableOpacity style={styles.avatar}  onPress={login}>
              <Icon name="person" size={40} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
              <Text style={styles.loginBtnText}>登录</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.item} onPress={pressMyFavor}>
        <Icon name="heart-outline" size={20} color="#666666" />
        <Text style={styles.itemText}>我的收藏</Text>
      </TouchableOpacity>
      {isLogin && (
        <TouchableOpacity style={styles.item} onPress={pressLogout}>
          <Icon name="power-outline" size={20} color="#666666" />
          <Text style={styles.itemText}>退出</Text>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator();

export default function WanDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={content}
    >
      <Drawer.Screen name="Stack" component={Stack} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  scroll: {
    paddingTop: 0,
  },
  topWrap: {
    backgroundColor: appStyle.mainColor,
  },
  close: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  top: {
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    height: 140,
    // backgroundColor: 'pink'
  },
  avatar: {
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appStyle.grayColor,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink'
  },
  loginBtn: {
    // backgroundColor: 'white',
   
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: appStyle.grayColor,
  },
  loginBtnText: {
    fontSize: 16,
    color: 'white',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
  email: {
    fontSize: 14,
    color: 'white',
  },
  item: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: appStyle.grayColor,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 10,
  },
})