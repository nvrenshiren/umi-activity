import httpRequest from '@/functions/http.request'
import {
  resBase,
  signWeiXinURLRes,
  specialItem,
  findSpecialByIdRes,
  getContentDetailRes
} from '@/interface/api.res'
import { exchangeReq } from '@/interface/api.req'

export default {
  findSpecialByThemeId: (params: { themeId: string }) => {
    return httpRequest.get<resBase<specialItem[]>>({
      url: '/special/findSpecialByThemeId.theme',
      params
    })
  },
  findSpecialByPid: (params: { pid: string }) => {
    return httpRequest.get<resBase<specialItem[]>>({
      url: '/special/findSpecialByPid.theme',
      params
    })
  },
  findSpecialById: (params: { id: string }) => {
    return httpRequest.get<resBase<findSpecialByIdRes>>({
      url: '/special/findSpecialById.theme',
      params
    })
  },
  getContentDetail: (params: { contentId: string }) => {
    return httpRequest.get<getContentDetailRes>({
      url: '/mobile/v1/getContentDetail.lm',
      params
    })
  }
}
