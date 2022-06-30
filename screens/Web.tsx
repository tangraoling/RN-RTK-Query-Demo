import React, { useEffect } from 'react'
import { WebProps } from '../common/navTypes'
import { WebView } from 'react-native-webview'
import { decode } from 'html-entities'


export default function Web({ navigation, route }: WebProps) {
  useEffect(() => {
    navigation.setOptions({ title: decode(route.params.title) })
  }, [])

  return (
    <WebView
      source={{ uri: route.params.uri }}
    />
  )
}