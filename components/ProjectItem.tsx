import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React, { useMemo } from 'react'
import { Article } from '../common/types'
import * as appStyle from '../common/appStyle'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import HtmlText from '../components/HtmlText'


type Props = {
  item: Article
}

export default function({ item }: Props) {
  const  navigation  = useNavigation()

  const pressArticle = (item: Article) => {
    navigation.navigate('Web', { uri: item.link, title: item.title })
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={() => pressArticle(item)}>
      <FastImage source={{ uri: item.envelopePic }} style={styles.img} />
      <View style={styles.right}>
        <HtmlText numberOfLines={2} style={styles.itemText}>{item.title}</HtmlText>
        <HtmlText numberOfLines={2} style={styles.desc}>{item.desc}</HtmlText>
        <View style={styles.itemBottom}>
          <Text style={styles.kindText}>{item.author || item.shareUser}</Text>
          <Text numberOfLines={1} style={styles.date}>{item.niceDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: appStyle.blackColor,
  },
  sp: {
    height: 1,
    backgroundColor: appStyle.grayColor,
  },
  date: {
    color: '#999999',
    fontSize: 13,
  },
  label: {
    backgroundColor: 'white',
    paddingHorizontal: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: appStyle.redColor,
    marginRight: 15,
  },
  lableText: {
    color: appStyle.redColor,
    fontSize: 11,
    textAlignVertical: 'center',
  },
  kindText: {
    color: '#999999',
    fontSize: 12,
    paddingRight: 15,
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  right: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {
    height: 100,
    width: 60,
  },
  desc: {
    color: '#999999',
    fontSize: 14,
  },
})