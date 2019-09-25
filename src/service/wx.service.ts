import httpRequest from '@/functions/http.request'
import { resBase, signWeiXinURLRes } from '@/interface/api.res'

export default {
  signWeiXinURL: (params: { url: string }) => {
    return httpRequest.get<resBase<signWeiXinURLRes>>({
      url: '/infoTitle/signWeiXinURL.lm',
      params
    })
  }
}
