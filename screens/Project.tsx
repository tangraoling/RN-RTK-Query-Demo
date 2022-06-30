import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as appStyle from '../common/appStyle'
import { ProjectProps, ProjectListProps } from '../common/navTypes'
import { Article } from '../common/types'
import { FlatList, StyleSheet, View } from 'react-native'
import { useGetProjectTabsQuery, useGetProjectArticleListQuery } from '../reducers/wanApi'
import useInfiniteScroll from '../common/useInfiniteScroll'
import ProjectItem from '../components/ProjectItem'
import Footer from '../components/Footer'
import { decode } from 'html-entities'


const Tab = createMaterialTopTabNavigator()
export default function Project({ navigation }: ProjectProps) {
  const { data } = useGetProjectTabsQuery()
  
  const list = React.useMemo(() => data?.map(tab => ({
    id: tab.id,
    name: decode(tab.name),
  })), [data])

  if (!list ) {
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
     {list?.map(tabItem => (
      <Tab.Screen key={tabItem.id} name={tabItem.name} component={ProjectList} initialParams={{ id: tabItem.id }} />
     ))}
    </Tab.Navigator>
  )
}

function ProjectList({ route }: ProjectListProps) {
  const cid = route.params.id
  const {
    combinedData,
    isFetching,
    refresh,
    loadMore,
    localPage,
    hasMoreData
  } = useInfiniteScroll<Article>(useGetProjectArticleListQuery, { queryParameters: { cid }, tagList: [{ type: 'Project-Article', id: cid }] })

  return (
    <FlatList
      refreshing={localPage == 1 && (isFetching)}
      onRefresh={refresh}
      data={combinedData}
      renderItem={({ item }) => <ProjectItem item={item} />}
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