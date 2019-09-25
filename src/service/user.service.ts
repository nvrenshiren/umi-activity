import httpRequest from '@/functions/http.request'
import { resBase, getUserDetailRes, listPrizeItem } from '@/interface/api.res'
import { remainScoreReq } from '@/interface/api.req'

export default {
  getUserDetail: () => {
    return httpRequest.get<resBase<getUserDetailRes>>({
      url: '/specialtheme/operate-activity-comment/getUserDetail.theme'
    })
  },
  remainScore(params: remainScoreReq) {
    return httpRequest.get<resBase<number>, remainScoreReq>({
      url: '/specialtheme/activity-prize-count/remainScore.theme',
      params
    })
  },
  listPrize(params: { themeId: string }) {
    return httpRequest.get<resBase<listPrizeItem[]>>({
      url: '/specialtheme/activity-prize-count/listPrize.theme',
      params
    })
  }
}
