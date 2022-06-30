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
import Icon from 'react-native-vector-icons/Ionicons'
import { useCancelFavorArticleMutation, useFavorArticleMutation } from '../reducers/wanApi'

type Props = {
  item: Article
  showKind: boolean
  showTop?: boolean
  onFavorChange: (item: Article, collected: boolean) => void
}

export default function({ item, showKind, showTop = false, onFavorChange }: Props) {
  const  navigation  = useNavigation()
  const [postCollect] = useFavorArticleMutation()
  const [postUnCollect] = useCancelFavorArticleMutation()


  const pressArticle = (item: Article) => {
    navigation.navigate('Web', { uri: item.link, title: item.title })
  }
  const collect = async () => {
    console.log('collect', item.id)
    const { errorCode } = await postCollect(item.id).unwrap()
    if (errorCode === 0) {
      onFavorChange(item, true)
    }
  }
  const unCollect = async () => {
    const { errorCode } = await postUnCollect(item.id).unwrap()
    if (errorCode === 0) {
      onFavorChange(item, false)
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={() => pressArticle(item)}>
      <HtmlText numberOfLines={2} style={styles.itemText}>{item.title}</HtmlText>

      <View style={styles.itemBottom}>
        {item.collect ? (
          <TouchableOpacity style={styles.collectBtn} onPress={() => unCollect()}>
            <Icon size={20} name='heart' color={appStyle.redColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.collectBtn} onPress={() =>collect()}>
            <Icon size={20} name='heart-outline' color={appStyle.grayColor} />
          </TouchableOpacity>
        )}
        {showTop &&  <View style={styles.label}>
            <Text style={styles.lableText}>置顶</Text>
          </View>
        }
        {item.fresh && <View style={styles.label}>
            <Text style={styles.lableText}>新</Text>
          </View>
        }
      
        <Text style={styles.kindText}>{item.author || item.shareUser}</Text>
        {showKind && <Text style={styles.kindText}>{`${item.superChapterName}/${item.chapterName}`}</Text>}
        <Text numberOfLines={1} style={styles.date}>{item.niceDate}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 90,
    paddingBottom: 5,
    backgroundColor: 'white',
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
    paddingRight: 10,
    paddingTop: 5,
    // backgroundColor: 'pink',
  }
})