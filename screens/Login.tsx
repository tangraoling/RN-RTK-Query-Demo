import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import { LoginProps } from '../common/navTypes'
import Icon from 'react-native-vector-icons/Ionicons'
import * as appStyle from '../common/appStyle'
import * as utils from '../common/utils'
import { useLoginMutation } from '../reducers/wanApi'
import { setUserInfo } from '../reducers/userState'
import { useAppDispatch } from '../hooks'


export default function Login({ navigation }: LoginProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [postLogin, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  console.log('is loading', isLoading)

  const login = async () => {
    if (name.trim().length === 0) {
      utils.showAlert('请输入用户名')
      return
    }
    if (password.trim().length === 0) {
      utils.showAlert('请输入密码')
      return
    }
    try {
      const arg = { username: name, password }
      console.log('arg:',arg)
      const data  = await postLogin(arg).unwrap()
      
      console.log('login resp:', data)
      if (data.errorCode === 0) {
        dispatch(setUserInfo(data.data))
        navigation.goBack()
      } else {
        utils.showAlert(data.errorMsg)
      }

    } catch(error) {
      utils.showAlert('登录失败')
      console.error(error)
    }
  }

  return (
    <View style={styles.bg}>
      <View style={styles.item}>
        <Icon name='person-outline' size={22} color={appStyle.mainColor} />
        <TextInput
          style={styles.ipt}
          underlineColorAndroid="transparent"
          onChangeText={text => setName(text)}
          placeholder="请输入用户名"
          keyboardType='default'
        />
      </View>
      <View style={styles.item}>
        <Icon name='lock-closed-outline' size={22} color={appStyle.mainColor} />
        <TextInput
          style={styles.ipt}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
          placeholder="请输入密码"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>登录</Text>
      </TouchableOpacity>

      <Modal
        visible={isLoading}
        transparent
      >
        <View style={styles.modal}>
          <ActivityIndicator color="#fff" size='large' />
        </View>
      </Modal>
    
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ipt: {
    borderBottomColor: appStyle.grayColor,
    paddingVertical: 0,
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: appStyle.mainColor,
    height: 40,
    borderRadius: 4,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})