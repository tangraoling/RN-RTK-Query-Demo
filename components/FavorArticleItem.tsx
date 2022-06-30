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
import HtmlText from '../components/HtmlText'
import { useCancelFavorArticleInFavorPageMutation } from '../reducers/wanApi'


type Props = {
  item: Article
  onCancleFavor: (item: Article) => void
}

export default function({ item, onCancleFavor }: Props) {
  const  navigation  = useNavigation()
  const [unCollectArticle] = useCancelFavorArticleInFavorPageMutation()
  const pressArticle = () => {
    navigation.navigate('Web', { uri: item.link, title: item.title })
  }
  const unCollect = async () => {
    const  { errorCode } = await unCollectArticle({ id: item.id, originId: item.originId || -1 }).unwrap()
    if ( errorCode === 0) {
      onCancleFavor(item)
    }
  }
  return (
    <View style={styles.item}>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemLeft} onPress={pressArticle}>
        <HtmlText numberOfLines={2} style={styles.itemText}>{item.title}</HtmlText>

        <View style={styles.itemBottom}>
          <Text style={styles.kindText}>{item.author || item.shareUser}</Text>
          <Text style={styles.kindText}>{`${item.chapterName}`}</Text>
          <Text numberOfLines={1} style={styles.date}>{item.niceDate}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.collectBtn} onPress={unCollect}>
        <Text>取消收藏</Text>
      </TouchableOpacity>
    </View>
    
  )
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  itemLeft: {
    padding: 10,
    height: 90,
    paddingBottom: 5,
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: appStyle.blackColor,
    flex: 1,
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
    // backgroundColor: 'pink'
  },
  collectBtn: {
    marginRight: 10,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    paddingVertical: 12,
    color: appStyle.blackColor,
  }
})