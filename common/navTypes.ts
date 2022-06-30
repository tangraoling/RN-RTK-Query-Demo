import { StackScreenProps } from '@react-navigation/stack'
import { DrawerScreenProps } from '@react-navigation/drawer'
import type { CompositeScreenProps } from '@react-navigation/native';


type RootStackParamList = {
  Tab: undefined
  Login: undefined
  Home: undefined
  Web: {
    uri: string
    title: string
  },
  Tree: undefined
  TreeArticle: {
    id: number
    childId: number
  },
  TreeArticleList: {
    id: number
  },
  Offiaccount: undefined,
  OffiaccountArticleList: {
    id: number
  },
  Project: undefined
  ProjectList: {
    id: number
  },
  FavorArticle: undefined
}

type DrawerParmList = {
  Login: undefined
  Stack: undefined
}
export default RootStackParamList

export type TabProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Tab'>, DrawerScreenProps<DrawerParmList>>
export type HomeProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Home'>, DrawerScreenProps<DrawerParmList>>
export type LoginProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Login'>, DrawerScreenProps<DrawerParmList>>
export type WebProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Web'>, DrawerScreenProps<DrawerParmList>>
export type TreeProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Tree'>, DrawerScreenProps<DrawerParmList>>
export type TreeArticleProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'TreeArticle'>, DrawerScreenProps<DrawerParmList>>
export type TreeArticleListProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'TreeArticleList'>, DrawerScreenProps<DrawerParmList>>
export type OffiaccountProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Offiaccount'>, DrawerScreenProps<DrawerParmList>>
export type OffiaccountArticleListProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'OffiaccountArticleList'>, DrawerScreenProps<DrawerParmList>>
export type ProjectProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'Project'>, DrawerScreenProps<DrawerParmList>>
export type ProjectListProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'ProjectList'>, DrawerScreenProps<DrawerParmList>>
export type FavorArticleProps = CompositeScreenProps<StackScreenProps<RootStackParamList, 'FavorArticle'>, DrawerScreenProps<DrawerParmList>>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}