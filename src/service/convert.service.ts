import httpRequest from '@/functions/http.request'
import { resBase, signWeiXinURLRes } from '@/interface/api.res'
import { exchangeReq, addAddressReq } from '@/interface/api.req'

export default {
  exchange: (params: exchangeReq) => {
    return httpRequest.post<resBase<string>, exchangeReq>({
      url: '/specialtheme/activity-integral-exchange/exchange.theme',
      params,
      isJson: true
    })
  },
  addAddress: (params: addAddressReq) => {
    return httpRequest.post<resBase<any>, addAddressReq>({
      url: '/specialtheme/activity-prize-count/addAddress.theme',
      params,
      isJson: true
    })
  }
}
