import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as appStyle from '../../common/appStyle'
import { TreeArticleProps, TreeArticleListProps } from '../../common/navTypes'
import { FlatList, StyleSheet, View } from 'react-native'
import { useGetTreeQuery, useGetTreeArticleQuery } from '../../reducers/wanApi'
import useInfiniteScroll from '../../common/useInfiniteScroll'
import ArticleItem from '../../components/ArticleItem'
import Footer from '../../components/Footer'
import { decode } from 'html-entities'
import { Article } from '../../common/types'
import { useAppDispatch } from '../../hooks'

const Tab = createMaterialTopTabNavigator()
export default function TreeArticle({ route, navigation }: TreeArticleProps) {
  const { data } = useGetTreeQuery()
  const item = data?.find(item => item.id === route.params.id)
  React.useEffect(() => {
    navigation.setOptions({ title: item?.name })
  }, [])

  const initialRouteName = item?.children.find(ch => ch.id === route.params.childId)?.name
  const list = React.useMemo(() => item?.children.map(tab => ({
    id: tab.id,
    name: decode(tab.name),
  })), [item])

  if (!list) {
    return null
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        lazy: true,
        tabBarPressColor: appStyle.pinkColor,
        tabBarIndicatorStyle: {
          backgroundColor: appStyle.mainColor,
        }
      }}
      initialRouteName={initialRouteName}
    >
     {list.map(tabItem => (
      <Tab.Screen key={tabItem.id} name={tabItem.name} component={TreeArticleList} initialParams={{ id: tabItem.id }} />
     ))}
    </Tab.Navigator>
  )
}
const SIZE = 15

function TreeArticleList({ navigation, route }: TreeArticleListProps) {
  const cid = route.params.id
  const {
    combinedData,
    isFetching,
    refresh,
    loadMore,
    localPage,
    hasMoreData,
    updateItem,
  } = useInfiniteScroll<Article>(useGetTreeArticleQuery, { size: SIZE, queryParameters: { cid }, tagList: [{ type: 'Tree-Article', id: cid }] })
  const dispatch = useAppDispatch()

  const onCollectChange = (item: Article, favor: boolean) => {
    const index = combinedData.findIndex(a => a.id === item.id)
    updateItem(index, { ...item, collect: favor }, 'getTreeArticle')
  }
  
  return (
    <FlatList
      refreshing={localPage == 1 && (isFetching)}
      onRefresh={refresh}
      data={combinedData}
      renderItem={({ item }) => <ArticleItem item={item} showKind={false} onFavorChange={onCollectChange} />}
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