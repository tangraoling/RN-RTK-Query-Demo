import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ListResponse, queryTagType } from './types'
import { useAppDispatch } from '../hooks';
import { wanApi } from '../reducers/wanApi';
import type { TagDescription, QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

type ListQuery = 'getHomeArticle'|'getTreeArticle'|'getOffiaccountArticle'|'getProjectArticleList'|'getFavorArticleList'

export const isValidNotEmptyArray = (array: any[]): boolean => {
  return !!(array && array?.length && array?.length > 0)
}

type InfiniteParamType = {
  tagList: TagDescription<queryTagType>[]
  size?: number,
  queryParameters?: {}
}

type InfiniteResultType<T> = {
  combinedData: T[]
  localPage: number
  loadMore: () => void
  refresh: () => void
  hasMoreData: boolean
  isLoading: boolean
  isFetching: boolean
  deleteItem: (index: number, qName: ListQuery) => void
  updateItem: (index: number, item: any, qName: ListQuery) => void
}
type PageQuery<T> = QueryDefinition<any, any, queryTagType, ListResponse<T>>
const useInfiniteScroll = <T>(useGetDataListQuery: UseQuery<PageQuery<T>>, { tagList, size = 20, queryParameters }: InfiniteParamType): InfiniteResultType<T> => {
  const [localPage, setLocalPage] = useState(1);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const queryResponse = useGetDataListQuery({
    page: localPage,
    size,
    ...queryParameters
  })

  const {
    datas: fetchData = [],
    curPage: remotePage = 1,
    pageCount: maxPages = 1,
  } = queryResponse?.data || {}

  useEffect(() => {
    if (isValidNotEmptyArray(fetchData)) {
      if (localPage === 1) {
        setCombinedData(fetchData)
      } else if (localPage === remotePage) {
        setCombinedData((previousData) => [...previousData, ...fetchData])
      }
    }
  }, [fetchData])

  const dispatch = useAppDispatch()

  const refresh = useCallback(() => {
    dispatch(wanApi.util.invalidateTags(tagList))
    setLocalPage(1)
  }, [])

  const hasMoreData = localPage < maxPages && localPage === remotePage

  const loadMore = () => {
    console.log('load more ...', localPage, remotePage, maxPages)
    if (hasMoreData) {
      setLocalPage((page) => page + 1)
    }
  }

  const deleteItem = (index: number, qName: ListQuery) => {
    const list = [...combinedData]
    list.splice(index, 1)
    setCombinedData(list)

    const page = Math.floor(index / size) + 1
    dispatch(
      wanApi.util.updateQueryData(qName, { size, page, ...queryParameters }, (list) => {
        const i = index - ((page-1) * size)
       
        list.datas.splice(i, 1)
      })
    )
  }

  const updateItem = (index: number, item: any, qName: ListQuery) => {
    const list = [...combinedData]
    list[index] = item
    console.log('update item:', index, item)
    setCombinedData(list)

    const page = Math.floor(index / size) + 1
    dispatch(
      wanApi.util.updateQueryData(qName, { size, page, ...queryParameters }, (list) => {
        const i = index - ((page-1) * size)
        // console.log('update ', i, index, page)
        list.datas[i] = item
      })
    )
  }

  useEffect(() => {
    console.log('use infinit scroll init', combinedData.length)
  }, [])
 
  return {
    combinedData,
    localPage,
    loadMore,
    refresh,
    hasMoreData,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
    deleteItem,
    updateItem,
  };
};

export default useInfiniteScroll;
