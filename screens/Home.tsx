import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { HomeProps } from '../common/navTypes'
import { useGetHomeArticleQuery, useGetHomeBannerQuery, useGetHomeTopArticleQuery } from '../reducers/wanApi'
import { Article, HomeBanner } from '../common/types'
import * as appStyle from '../common/appStyle'
import useInfiniteScroll  from '../common/useInfiniteScroll'
import Swiper from 'react-native-swiper'
import ArticleItem from '../components/ArticleItem'
import Icon from 'react-native-vector-icons/Ionicons'

const bannerHeight = appStyle.ScreenWidth * 0.55

export default function Home({ navigation }: HomeProps) {  
  const {
    combinedData,
    hasMoreData,
    loadMore,
    refresh,
    isFetching,
    localPage,
    updateItem,
  } = useInfiniteScroll<Article>(useGetHomeArticleQuery, { size: 15,  tagList: ['Home-Article'] } )
  const { data: bannerList, refetch: refetchBanner } = useGetHomeBannerQuery()
  const { data: topList, refetch: refetchTop } = useGetHomeTopArticleQuery()
  const [bannerIndex, setBannerIndex] = useState(0)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.menu} onPress={() => navigation.toggleDrawer()}>
          <Icon size={25} name="menu" color="white" />
        </TouchableOpacity>
      )
    })
  })

  const onEndReached = () => {
    loadMore()
  }
  const onRefresh = () => {
    refresh()
    refetchTop()
    refetchBanner()
  }

  const pressBanner = (item: HomeBanner) => {
    navigation.navigate('Web', { uri: item.url, title: item.title })
  }

  // console.log('home', combinedData)
  const renderBanner = () => {
    const list = bannerList || []

    return (
      <View>
        <Swiper
          autoplay
          height={bannerHeight}
          removeClippedSubviews={false}
          showsPagination={false}
          onIndexChanged={(index => setBannerIndex(index))}
        >
          {list.map((item, index) => (
            <TouchableOpacity activeOpacity={1} key={`key_${index}`} onPress={() => pressBanner(item)}>
              <Image style={styles.bannerImage} source={{ uri: item.imagePath }} />
            </TouchableOpacity>
          ))}
        
        </Swiper>
        {list.length > 0 && <View style={styles.pageTip}>
            <Text style={styles.pageTipText}>{`${bannerIndex + 1}/${list.length}`}</Text>
            <Text style={styles.pageTipText}>{list[bannerIndex].title}</Text>
        </View>}
       </View>
    )
  }

  const onListFavorChange = (item: Article, collect: boolean) => {
    const index = combinedData.findIndex(a => {
      console.log('find:', a.id)
      return a.id === item.id
    })
    const newItem: Article = { ...item, collect }
    
    updateItem(index, newItem, 'getHomeArticle')
  }

  const onTopFavorChange = (item: Article, favor: boolean) => {
    refetchTop()
  }

  const renderItem = ({ item, index, section: { type } }: { item: 'banner'|Article, index: number, section: { type: string } }) => {
    if (item === 'banner') {
      return renderBanner()
    }
    
    return (
      <ArticleItem item={item} showKind showTop={type === 'top'} onFavorChange={(a, favor) => {
        if (type === 'top') {
          onTopFavorChange(a, favor)
        } else {
          onListFavorChange(a, favor)
        }
      }} />
    )
   
  }

  return (
    <SectionList
      refreshing={localPage == 1 && (isFetching)}
      onRefresh={onRefresh}
      sections={[
        { data: ['banner'], type: 'banner' },
        { data: topList||[], type: 'top' },
        { data: combinedData, type: 'list' },
      ]}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.sp} />}
      SectionSeparatorComponent={() => <View style={styles.sps} />}
      onEndReached={onEndReached}
      keyExtractor={(_, index) => `${index}`}
      ListFooterComponent={() => {
        let text = '已无更多数据'
        if (hasMoreData || isFetching) {
          text = '加载中...'
        }
        return (
          <View style={styles.footer}>
            <Text style={styles.footerText}>{text}</Text>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  sp: {
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: appStyle.grayColor,
  },
  sps: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: appStyle.grayColor,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: appStyle.grayColor,
    fontSize: 13,
  },
  bannerImage: {
    height: bannerHeight,
    width: '100%'
  },
  pageTip: {
    position: 'absolute',
    height: 30,
    backgroundColor: '#0004',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  pageTipText: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 4,
  },
  menu: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  }
})