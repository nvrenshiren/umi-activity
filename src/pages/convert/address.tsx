import React from 'react'
import QueryString, { ParsedUrl } from 'query-string'
import { Box, TextField, Button } from '@material-ui/core'
import PageDefault from '@/components/page/page.default'
import commonFunc from '@/functions/common.func'
import { CSSProperties } from '@material-ui/styles'
import { router } from 'umi'
import convertService from '@/service/convert.service'
import modalBox from '@/components/util/modal.box'
import { UtilToast } from '@/components/util/util.toast'
import AddressSelect from '@/components/convert/address.select'
import addressData from '@/components/convert/address.data'

interface Props {}
interface State {
  userName: string
  mobileNumber: string
  address: string
  detailAddress: string
}

const labelStyle: CSSProperties = {
  fontSize: commonFunc.toVW(32),
  lineHeight: commonFunc.toVW(42)
}
const inputStyle: CSSProperties = {
  fontSize: commonFunc.toVW(24),
  lineHeight: commonFunc.toVW(42),
  marginTop: commonFunc.toVW(15)
}

export default class ConvertAddress extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    let { address, id } = this.urlParams.query
    this.urlValue = !!address ? JSON.parse(address.toString()) : []
    if (!id) {
      router.goBack()
    }
    let [userName, mobileNumber, addressUrl, detailAddress] = this.urlValue
    this.state = {
      userName,
      mobileNumber,
      address: addressUrl,
      detailAddress
    }
  }
  urlParams: ParsedUrl = QueryString.parseUrl(location.href)
  urlValue: string[] = []
  render() {
    let [userName, mobileNumber, address, detailAddress] = this.urlValue
    return (
      <PageDefault
        config={{ title: '收货地址' }}
        appBar
        back
        close
        barStyle={{ background: '#fff', color: '#666' }}
      >
        <Box className="pageBox" height="100%" bgcolor="#fff">
          <Box p={commonFunc.toVW(30)}>
            <TextField
              onChange={(e) => {
                this.setState({
                  userName: e.target.value
                })
              }}
              label="收货人"
              defaultValue={userName}
              placeholder="请输入收货人姓名"
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
                style: labelStyle
              }}
              inputProps={{
                style: inputStyle
              }}
            />
            <TextField
              label="手机号码"
              onChange={(e) => {
                this.setState({
                  mobileNumber: e.target.value
                })
              }}
              defaultValue={mobileNumber}
              placeholder="请输入手机号码"
              fullWidth
              error={
                !!this.state.mobileNumber
                  ? !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                      this.state.mobileNumber
                    )
                  : false
              }
              margin="dense"
              InputLabelProps={{
                shrink: true,
                style: labelStyle
              }}
              inputProps={{
                style: inputStyle
              }}
            />
            <AddressSelect
              default={address}
              data={addressData}
              onChange={(data) => {
                this.setState(
                  {
                    address: data
                      .map((item) => {
                        return item.text
                      })
                      .join('-')
                  },
                  () => {
                    console.log(this.state.address)
                  }
                )
              }}
            />
            {/* <TextField
              label="所在地区"
              onChange={(e) => {
                this.setState({
                  address: e.target.value
                })
              }}
              defaultValue={address}
              placeholder="请选择所在地区"
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
                style: labelStyle
              }}
              inputProps={{
                style: inputStyle
              }}
            /> */}
            <TextField
              label="详细地址"
              onChange={(e) => {
                this.setState({
                  detailAddress: e.target.value
                })
              }}
              defaultValue={detailAddress}
              placeholder="请输入详细地址"
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
                style: labelStyle
              }}
              inputProps={{
                style: inputStyle
              }}
            />
          </Box>
          <Box p={commonFunc.toVW(30)}>
            <Button
              fullWidth
              color="primary"
              size="large"
              variant="contained"
              onClick={() => {
                this.postAddress()
              }}
            >
              完成
            </Button>
          </Box>
        </Box>
      </PageDefault>
    )
  }
  postAddress() {
    let { mobileNumber, userName, address, detailAddress } = this.state
    if (
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        mobileNumber
      ) &&
      !!userName &&
      !!address &&
      !!detailAddress
    ) {
      convertService
        .addAddress({
          isExchange: !!this.urlParams.query.isExchange,
          id: this.urlParams.query.id.toString(),
          mobileNumber,
          userName,
          address,
          detailAddress
        })
        .then((res) => {
          modalBox.open({
            content: UtilToast,
            hideBg: true,
            params: {
              message: '地址保存成功',
              onClose: () => {
                router.goBack()
              }
            }
          })
        })
    }
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.setState = () => {}
    /**
     * clearInterval()
     * clearTimeout()
     */
  }
}
