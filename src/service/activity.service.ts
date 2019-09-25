import httpRequest from '@/functions/http.request'
import {
  addOperateActivityCommentReq,
  allListPrizeReq,
  getActivityCommentReq,
  isHavePrizeReq,
  prizeDrawReq
} from '@/interface/api.req'
import {
  activityDetail,
  allListPrizeRes,
  getActivityCommentRes,
  getOperateActivityBlessingsListRes,
  isHavePrizeRes,
  listTheme,
  prizeDrawRes,
  prizeItem,
  resBase,
  rewardItem
} from '@/interface/api.res'

export default {
  list: (themeid: string) => {
    return httpRequest.get<resBase<listTheme[]>>({
      url: `/specialtheme/operate-activity/${themeid}/list.theme`
    })
  },
  detail: (id: string) => {
    return httpRequest.get<resBase<activityDetail>>({
      url: `/specialtheme/operate-activity/${id}/detail.theme`
    })
  },
  addOperateActivityComment(params: addOperateActivityCommentReq) {
    return httpRequest.post<resBase<string>, addOperateActivityCommentReq>({
      url: `/specialtheme/operate-activity-comment/addOperateActivityComment.theme`,
      params
    })
  },
  isHavePrize(params: isHavePrizeReq) {
    return httpRequest.get<resBase<isHavePrizeRes>, isHavePrizeReq>({
      url: '/specialtheme/activity-prize-count/isHavePrize.theme',
      params
    })
  },
  prizeDraw(params: prizeDrawReq) {
    return httpRequest.post<resBase<prizeDrawRes>, prizeDrawReq>({
      url: `/specialtheme/activity-prize-count/prizeDraw.theme`,
      params
    })
  },
  getOperateActivityBlessingsList(params: { activityId: string }) {
    return httpRequest.get<resBase<getOperateActivityBlessingsListRes[]>>({
      url:
        '/specialtheme/operate-activity-blessings/getOperateActivityBlessingsList.theme',
      params
    })
  },
  getActivityComment(params: getActivityCommentReq) {
    return httpRequest.get<
      resBase<getActivityCommentRes>,
      getActivityCommentReq
    >({
      url: '/specialtheme/operate-activity-comment/getActivityComment.theme',
      params
    })
  },
  remainPrize(params: { id: string }) {
    return httpRequest.get<resBase<number>>({
      url: '/specialtheme/activity-prize-count/remainPrize.theme',
      params
    })
  },
  prizeList(params: { id: string }) {
    return httpRequest.get<resBase<prizeItem[]>>({
      url: '/specialtheme/activity-prize-count/prizeList.theme',
      params
    })
  },
  rewardList(params: { themeId: string }) {
    return httpRequest.get<resBase<rewardItem[]>>({
      url: '/specialtheme/activity-integral-exchange/rewardList.theme',
      params
    })
  },
  allListPrize(params: allListPrizeReq) {
    return httpRequest.get<resBase<allListPrizeRes>>({
      url: '/specialtheme/activity-prize-count/allListPrize.theme',
      params
    })
  }
}
