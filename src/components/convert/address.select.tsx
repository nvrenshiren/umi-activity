import React, { CSSProperties } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import commonFunc from '@/functions/common.func'

interface addressItem {
  parent?: string
  value: string
  text: string
  children?: addressItem[]
}

interface Props {
  default?: string
  data: addressItem[]
  onChange: (data: addressItem[]) => void
}
const labelStyle: CSSProperties = {
  fontSize: commonFunc.toVW(32),
  lineHeight: commonFunc.toVW(42)
}

interface State {
  select: string[]
}

const labelName = ['省', '市', '区']
class AddressSelect extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.checkData(this.props.data)
    this.state = {
      select: this.props.default ? this.initData : this.setData(0, [])
    }
  }
  levelData: addressItem[][] = []
  render() {
    return (
      <Box id="AddressSelect">
        {this.levelData.map((itemlist, index) => {
          return (
            <FormControl key={`item-${index}`} style={{ width: '33.3333%' }}>
              <InputLabel shrink style={labelStyle}>
                {labelName[index]}
              </InputLabel>
              <Select
                value={this.state.select[index]}
                onChange={(e) => {
                  this.setState(
                    {
                      select: this.setData(
                        index,
                        this.state.select,
                        e.target.value
                      )
                    },
                    () => {
                      this.callBack()
                    }
                  )
                }}
              >
                {this.getItemList(index, this.state.select).map((item) => {
                  return (
                    <MenuItem
                      key={`item-children-${item.value}`}
                      value={item.value}
                    >
                      {item.text}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )
        })}
      </Box>
    )
  }
  callBack() {
    let data: addressItem[] = []
    this.state.select.map((key, index) => {
      data.push(
        this.levelData[index].filter((item) => {
          return item.value === key
        })[0]
      )
    })
    this.props.onChange && this.props.onChange(data)
  }
  setData(index: number, data: string[], value?: any) {
    let item = this.getItemList(index, data)[0]
    let newData = [].concat(data)
    newData[index] = value || item.value
    if (index < this.levelData.length - 1) {
      newData = this.setData(index + 1, newData)
    }
    return newData
  }
  getItemList(index: number, select?: string[]) {
    let allItem = this.levelData[index]
    return allItem.filter((item) => {
      let data = select || []
      return item.parent === (data[index - 1] || '0')
    })
  }
  checkData(data: addressItem[], index: number = 0, parent: string = '0') {
    data.forEach((item) => {
      let newItem = Object.assign({ parent }, item)
      if (!!newItem.children) {
        this.checkData(item.children, index + 1, item.value)
        delete newItem.children
      }
      if (this.levelData[index]) {
        this.levelData[index].push(newItem)
      } else {
        this.levelData[index] = [].concat(newItem)
      }
    })
  }
  get initData() {
    let address = this.props.default.split('-')
    return address.map((txt, index) => {
      return this.levelData[index].filter((item) => {
        return item.text === txt
      })[0].value
    })
  }
  componentDidMount() {
    this.callBack()
  }
  componentWillUnmount() {}
}
export default AddressSelect
