export interface remainScoreReq {
  themeId: string
  rewardId: string
}

export interface addOperateActivityCommentReq {
  activityId: string
  type: 0 | 1 | number
  state: 0 | 1 | number
  commentSource: 0 | 1 | number
  comment?: string
}

export interface isHavePrizeReq {
  //参与种类ID
  id: string
  //参与ID
  commentId: string
  //活动主题ID
  activityThemeId: string
}

export interface prizeDrawReq {
  id: string
  commentId?: string
}

export interface getActivityCommentReq {
  page: number
  pageSize: number
  activityId: string
  type: 0 | 1 | number
}

export interface exchangeReq {
  id?: number
  rewardId?: number
  themeId?: number
}

export interface allListPrizeReq {
  page: number
  pageSize: number
  prizeId: string
}

export interface addAddressReq {
  address: string
  detailAddress: string
  id: string
  isExchange?: boolean
  mobileNumber: string
  userName: string
}
