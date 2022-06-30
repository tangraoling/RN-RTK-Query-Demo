import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native'
import { FavorArticleProps } from '../common/navTypes'
import * as appStyle from '../common/appStyle'
import useInfiniteScroll from "../common/useInfiniteScroll"
import { Article } from "../common/types"
import { useGetFavorArticleListQuery } from '../reducers/wanApi'
import ArticleItem from "../components/FavorArticleItem"
import Footer from "../components/Footer"



export default function FavorArticle({ navigation }: FavorArticleProps) {
  const {
    combinedData,
    isFetching,
    refresh,
    loadMore,
    localPage,
    hasMoreData,
    deleteItem,
  } = useInfiniteScroll<Article>(useGetFavorArticleListQuery, { tagList: [{ type: 'Favor-Article' }] })

  const onCancleFavor = (item: Article) => {
    const index = combinedData.findIndex(a => a.id === item.id)
    deleteItem(index, 'getFavorArticleList')
  }
  
  return (
    <FlatList
      refreshing={localPage == 1 && (isFetching)}
      onRefresh={refresh}
      data={combinedData}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item, index }) => <ArticleItem item={item} onCancleFavor={onCancleFavor} />}
      ItemSeparatorComponent={() => <View style={styles.sp} />}
      onEndReached={loadMore}
      ListFooterComponent={() =>(<Footer showLoading={isFetching || hasMoreData} />)}
    />
  )
}

const styles = StyleSheet.create({
  sp: {
    height: 1,
    backgroundColor: appStyle.grayColor,
  },
})