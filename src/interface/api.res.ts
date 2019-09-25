export interface resBase<T = {}> {
  status?: boolean
  info: string
  msg: string
  result: T
}

export interface prizeItem {
  rewardId: string
  prizeCount: number
  prizeName: string
  url: string
}

export interface signWeiXinURLRes {
  jsapi_ticket: string
  signature: string
  url: string
  nonceStr: string
  timestamp: string
  appid: string
}

export interface getUserDetailRes {
  userName: string
  sex: number
  headUrl: string
}

export interface getOperateActivityBlessingsListRes {
  id: string
  activityId: string
  blessing: string
}

export interface activityDetail {
  id: string
  activityName: string
  activityThemeId: string
  activityType: number
  startTime: string
  endTime: string
  participateFrequence: number
  background: string
  activityDescription: string
  participantCount: number
  prizes: activityPrize[]
}

export interface activityPrize {
  id: string
  activityId: string
  prizeSource: number
}

export interface isHavePrizeRes {
  tabType: 0 | 1 | 2
  type?: 1 | 2
  actId?: number
  tip?: string
  residueDegree?: number
}

export interface prizeDrawRes {
  rewardId: string
  prizeCount: number
  prizeProbability: number
  index: number
  id?: number
}

export interface getActivityCommentRes {
  records: commentItem[]
  total: string
  size: string
  current: string
  searchCount: boolean
  pages: string
}

export interface commentItem {
  id: string
  userName: string
  activityId?: string
  comment: string
  state?: number
  sensitiveWord?: string
  type?: number
  createAt?: number
  createBy?: string
  isDeleted?: number
  path: string
  userId?: string
  isMine?: number
}

export interface listTheme {
  id: string
  activityName: string
  activityThemeId: string
  activityType: number
  startTime: string
  endTime: string
  participateFrequence: number
  background: string
  activityDescription: string
}

export interface rewardItem {
  rewardId: string
  count: number
  rewardName: string
  consumptionScore: number
  url: string
}

export interface listPrizeItem {
  prizeAddress?: string
  id: string
  rewardId: string
  rewardName: string
  count: number
  isGoods: number
  url: string
  isExchange?: boolean
}

export interface specialItem {
  id: number
  parentId: number
  specialIndex: number
  themeId: number
  treeLevel: number
  treeMax: string
  treeNumber: string
  title: string
  subtitle: string
  coverImage: string
  isDelete: number
}

export interface allListPrizeRes {
  records: allListPrizeItem[]
  total: string
  size: string
  current: string
  searchCount: boolean
  pages: string
}

export interface allListPrizeItem {
  userId: string
  userName: string
  name: string
  prizeQuantity: number
}

export interface findSpecialByIdRes {
  id: number
  parentId: number
  specialIndex: number
  treeLevel: number
  treeMax: string
  treeNumber: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  isDelete: number
  specialImgs: string[]
  infoTagContentVos: infoTagContentItem[]
}

export interface infoTagContentItem {
  showNum: number
  specialTag: SpecialTag
  specialContents: SpecialContentItem[]
}

export interface SpecialContentItem {
  contentIndex: number
  clickCount: string
  collectionNum: string
  tagId: number
  releaseDate: number
  origin: string
  contentId: number
  likeCount: string
  title: string
  url: string
  mediaPath?: string
  commentCount: string
  contentUrl: string
  contentType: string
  channelId: string
}

export interface SpecialTag {
  specialTag: string
  tagIndex: number
  id: number
  specialId: number
}

export interface getContentDetailRes extends resBase {
  list: getContentDetailItem[]
}

export interface getContentDetailItem {
  publishTime: number
  txt: string
  clickCount: number
  origin: string
  likeCount: number
  id: number
  title: string
  type: string
  commentCount: number
}
