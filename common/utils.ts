
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Platform } from 'react-native'



export async function setStorageItem(key: string, value: number|string|null|object ): Promise<void> {
  const k = 'th_' + key
  // console.log('setkv(', k, v, ')')
  if (value === null) {
    return await AsyncStorage.removeItem(k)
  }
  return await AsyncStorage.setItem(k, JSON.stringify(value))
}

export async function getStorageItem(key: string, defaultValue:any = null): Promise<any> {
  let k = 'th_' + key
  let str = await AsyncStorage.getItem(k)
  // console.log('getkv', k, str)
  if (!str) {
    return defaultValue
  }
  try {
    return JSON.parse(str)
  } catch (e) {
    console.log(e)
  }
  return str
}


export function showAlert(msg: string, title = '提示') {
  return Alert.alert(title, msg, [{ text: '确定' }])
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


