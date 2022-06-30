import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { TreeProps } from '../../common/navTypes'
import { useGetTreeQuery } from '../../reducers/wanApi'
import { Tree } from '../../common/types'
import * as appStyle from '../../common/appStyle'
import HtmlText from '../../components/HtmlText'


const colors = [
  appStyle.blackColor,
  appStyle.pinkColor,
  appStyle.blueColor,
  appStyle.redColor,
  appStyle.yellowColor,
  appStyle.purpleColor,
  appStyle.cyanColor,
]

function getColor(index: number) {
  const i = index % colors.length
  return colors[i]
}
export default function TreeScreen(props: TreeProps) {
  const { data, isFetching } = useGetTreeQuery()
  
  function pressLabel(item: Tree, child: Tree) {
    props.navigation.navigate('TreeArticle', { id: item.id, childId: child.id})
  }
  function pressItem(item: Tree) {
    props.navigation.navigate('TreeArticle', { id: item.id, childId: item.children[0].id})
  }

  const renderItem = ({ item }: { item: Tree }) => {
    if (item.children.length == 0) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => pressItem(item)}
      >
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.children}>
          {item.children.map((child, index) => (
            <TouchableOpacity
              key={child.id}
              style={[styles.label, { backgroundColor: getColor(item.id + index)}]}
              onPress={() => pressLabel(item, child)}
             >
              <HtmlText style={styles.labelText}>{child.name}</HtmlText>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
  },
  title: {
    color: appStyle.blackColor,
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  children: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    paddingHorizontal: 12,
    height: 36,
    minWidth: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 18,
    margin: 4,
  },
  labelText: {
    fontSize: 12,
    color: 'white',
  },
})