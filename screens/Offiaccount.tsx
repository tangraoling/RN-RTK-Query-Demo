import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as appStyle from '../common/appStyle'
import { OffiaccountProps, OffiaccountArticleListProps } from '../common/navTypes'
import { FlatList, StyleSheet, View } from 'react-native'
import { useGetOffiaccountTabsQuery, useGetOffiaccountArticleQuery } from '../reducers/wanApi'
import useInfiniteScroll from '../common/useInfiniteScroll'
import ArticleItem from '../components/ArticleItem'
import Footer from '../components/Footer'
import { Article } from '../common/types'


const Tab = createMaterialTopTabNavigator()
export default function Offiaccount({ navigation }: OffiaccountProps) {
  const { data } = useGetOffiaccountTabsQuery()
  if (!data) {
    return null
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarPressColor: appStyle.pinkColor,
        lazy: true,
        tabBarIndicatorStyle: {
          backgroundColor: appStyle.mainColor,
        }
      }}
    >
     {data.map(tabItem => (
      <Tab.Screen key={tabItem.id} name={tabItem.name} component={OffiAccountArticleList} initialParams={{ id: tabItem.id }} />
     ))}
    </Tab.Navigator>
  )
}

function OffiAccountArticleList({ route }: OffiaccountArticleListProps) {
  const cid = route.params.id
  const {
    combinedData,
    isFetching,
    refresh,
    loadMore,
    localPage,
    hasMoreData,
    updateItem,
  } = useInfiniteScroll<Article>(useGetOffiaccountArticleQuery, { queryParameters: { cid }, tagList: [{ type: 'Offiaccount-Article', id: cid }] })

  const onFavorChange = (item: Article, collect: boolean) => {
    const index = combinedData.findIndex(a => a.id === item.id)
    updateItem(index, { ...item, collect }, 'getOffiaccountArticle')
  }
  return (
    <FlatList
      refreshing={localPage == 1 && (isFetching)}
      onRefresh={refresh}
      data={combinedData}
      renderItem={({ item }) => <ArticleItem item={item} showKind={false} onFavorChange={onFavorChange} />}
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