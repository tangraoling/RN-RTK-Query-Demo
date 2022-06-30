import { StyleSheet } from 'react-native'
import * as appStyle from '../common/appStyle'
import { Text, View } from 'react-native'
import React from 'react'

export default function(props: { showLoading: boolean }) {
  let text = '已无更多数据'
  if (props.showLoading) {
    text = '加载中...'
  }
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: appStyle.grayColor,
    fontSize: 13,
  },
})