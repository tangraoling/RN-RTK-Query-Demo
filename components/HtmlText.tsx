import { decode } from 'html-entities'
import React, { useMemo } from 'react'
import { TextProps, Text } from 'react-native'


export default function(props: TextProps) {
  const { children, ...other } = props
  const text = useMemo(() => decode(children as string), [children])

  return <Text {...other}>{text}</Text>
}