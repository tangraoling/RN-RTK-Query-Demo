export type Article = {
  apkLink: string
  audit: number
  author: string
  canEdit: boolean
  chapterId: number
  chapterName: string
  collect: boolean
  courseId: number
  desc: string
  descMd: string
  envelopePic: string
  fresh: boolean
  host: string
  id: number
  link: string
  niceDate: string
  niceShareDate: string
  origin: string
  originId: number
  prefix: string
  projectLink: string
  publishTime: number
  realSuperChapterId: number
  selfVisible: number
  shareDate: number
  shareUser: string
  superChapterId: number
  superChapterName: string
  tags: string[]
  title: string
  type: number
  userId: number
  visible: number
  zan: number
}

export type HomeBanner = {
  desc: string
  id: number
  imagePath: string
  isVisible: number
  order: number
  title: string
  type: number
  url: string
}

export type ListResponse<T> = {
  curPage: number
  datas: T[]
  offset: number
  over: boolean
  pageCount: number
  size: number
  total: number
}

export type WanResponse<T> = {
  data: T
  errorCode: number
  errorMsg: string
}


export type Tree = {
  author: string
  children: Tree[]
  courseId: number
  cover: string
  desc: string
  id: number
  lisense: string
  lisenseLink: string
  name: string
  order: number
  parentChapterId: number
  userControlSetTop: boolean
  visible: 1|0
}


export type UserInfo = {
  admin: boolean
  chapterTops: any[]
  coinCount: number
  collectIds: number[]
  email: string
  icon: string
  id: number
  nickname: string
  password: string
  publicName: string
  token: string
  type: number
  username: string
}

export type queryTagType = 'Home-Article'|'Tree-Article'|'Offiaccount-Article'|'Project-Article'|'Favor-Article'

