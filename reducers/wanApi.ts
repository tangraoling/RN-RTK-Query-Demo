import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article, HomeBanner, WanResponse, ListResponse, Tree, UserInfo } from '../common/types'


export const wanApi = createApi({
  reducerPath: 'wanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.wanandroid.com/' }),
  tagTypes: ['Home-Article', 'Tree-Article', 'Offiaccount-Article', 'Project-Article', 'Favor-Article'],
  endpoints: (builder) => ({
    getHomeArticle: builder.query<ListResponse<Article>, { page: number, size: number }>({
      query: ({ page, size }) => `article/list/${page-1}/json?page_size=${size}`,
      transformResponse: (rv: WanResponse<ListResponse<Article>>) => rv.data,
      providesTags: () => ['Home-Article']
    }),
    getHomeTopArticle: builder.query<Article[], void>({
      query: () => `article/top/json`,
      transformResponse: (rv: WanResponse<Article[]>) => rv.data,
      providesTags: () => ['Home-Article']
    }),
    getHomeBanner: builder.query<HomeBanner[], void>({
      query: () => 'banner/json',
      transformResponse: (rv: WanResponse<HomeBanner[]>) => rv.data,
    }),
    getTree: builder.query<Tree[], void>({
      query: () => 'tree/json',
      transformResponse: (rv: WanResponse<Tree[]>) => rv.data,
    }),
    getTreeArticle: builder.query<ListResponse<Article>, { size: number, page: number, cid: number }>({
      query: ({ page, cid, size }) => `article/list/${page-1}/json?cid=${cid}&page_size=${size}`,
      transformResponse: (rv: WanResponse<ListResponse<Article>>) => rv.data,
      providesTags: (result, err, arg) => [{ type: 'Tree-Article', id: arg.cid }]
    }),
    getOffiaccountTabs: builder.query<Tree[], void>({
      query: () => 'wxarticle/chapters/json',
      transformResponse: (rv: WanResponse<Tree[]>) => rv.data,
    }),
    getOffiaccountArticle: builder.query<ListResponse<Article>, { page: number, cid: number }>({
      query: ({ page, cid }) => `wxarticle/list/${cid}/${page}/json`,
      transformResponse: (rv: WanResponse<ListResponse<Article>>) => rv.data,
      providesTags: (result, err, arg) => [{ type: 'Offiaccount-Article', id: arg.cid }]
    }),
    getProjectTabs: builder.query<Tree[], void>({
      query: () => `project/tree/json`,
      transformResponse: (rv: WanResponse<Tree[]>) => rv.data,
    }),
    getProjectArticleList: builder.query<ListResponse<Article>, { page: number, cid: number }>({
      query: ({ page, cid }) => `project/list/${page}/json?cid=${cid}`,
      transformResponse: (rv: WanResponse<ListResponse<Article>>) => rv.data,
      providesTags: (result, err, arg) => [{ type: 'Project-Article', id: arg.cid }]
    }),
    getFavorArticleList: builder.query<ListResponse<Article>, { page: number }>({
      query: ({ page }) => `lg/collect/list/${page-1}/json`,
      transformResponse: (rv: WanResponse<ListResponse<Article>>) => rv.data,
      providesTags: (result, err, arg) => [{ type: 'Favor-Article' }]
    }),
    favorArticle: builder.mutation<WanResponse<any>, number>({
      query: (id) => ({url: `lg/collect/${id}/json`, method: 'post'}),
      invalidatesTags: () => [{ type: 'Favor-Article' }],
    }),
    cancelFavorArticle: builder.mutation<WanResponse<any>, number>({
      query: (id) => ({ url: `lg/uncollect_originId/${id}/json`, method: 'post' }),
      invalidatesTags: () => [{ type: 'Favor-Article' }],
    }),
    cancelFavorArticleInFavorPage: builder.mutation<WanResponse<any>, { id: number, originId: number }>({
      query: ({ id, originId }) => ({ url: `lg/uncollect/${id}/json?originId=${originId}`, method: 'post' }),
      invalidatesTags: () => [{ type: 'Favor-Article' }],
    }),
    login: builder.mutation<WanResponse<UserInfo>, { username: string, password: string }>({
      query: (arg) => ({
        url: 'user/login',
        method: 'POST',
        params: arg,
      }),
    }),
    logout: builder.mutation<WanResponse<any>, void>({
      query: () => 'user/logout/json',
    })
  }),
})


export const {
  useGetHomeArticleQuery,
  useGetHomeTopArticleQuery,
  useGetHomeBannerQuery,
  useGetTreeQuery,
  useGetTreeArticleQuery,
  useGetOffiaccountTabsQuery,
  useGetOffiaccountArticleQuery,
  useGetProjectTabsQuery,
  useGetProjectArticleListQuery,
  useLoginMutation,
  useGetFavorArticleListQuery,
  useLogoutMutation,
  useCancelFavorArticleInFavorPageMutation,
  useCancelFavorArticleMutation,
  useFavorArticleMutation,
} = wanApi
