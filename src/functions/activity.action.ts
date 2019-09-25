import activityService from '@/service/activity.service'
import { getActivityCommentReq } from '@/interface/api.req'
import { activityDetail } from '@/interface/api.res'

export default class ActivityAction {
  constructor(activityID: string) {
    this.activityID = activityID
  }
  activityID: string
  actionID: string
  commentID: string
  activityDetail: activityDetail
  async init() {
    let detail = await activityService.detail(this.activityID)
    if (detail.status) {
      this.activityDetail = detail.result
      if (detail.result.prizes) {
        let actionData = detail.result.prizes.filter((item) => {
          return item.prizeSource === 0
        })[0]
        let commentData = detail.result.prizes.filter((item) => {
          return item.prizeSource === 1
        })[0]
        this.actionID = actionData && actionData.id
        this.commentID = commentData && commentData.id
      }
    } else {
      alert(detail.info)
    }
    return detail
  }
  async action() {
    try {
      let addOperateActivityComment = await activityService.addOperateActivityComment(
        {
          activityId: this.activityID,
          type: 0,
          state: 1,
          commentSource: 0
        }
      )
      let OperateID = addOperateActivityComment.result
      let prizeDraw = await activityService.prizeDraw({
        id: this.actionID,
        commentId: OperateID
      })
      return prizeDraw
    } catch (error) {
      console.log(error)
    }
  }
  blessList() {
    return activityService.getOperateActivityBlessingsList({
      activityId: this.activityID
    })
  }
  commentList(params: getActivityCommentReq) {
    return activityService.getActivityComment(params)
  }
  async comment(content: string, state: number = 1) {
    let addOperateActivityComment = await activityService.addOperateActivityComment(
      {
        activityId: this.activityID,
        type: 1,
        state,
        commentSource: 0,
        comment: content
      }
    )

    let OperateID = addOperateActivityComment.result
    let prizeDraw = await activityService.prizeDraw({
      id: this.commentID,
      commentId: OperateID
    })

    return prizeDraw
  }
  async remainPrize() {
    let remainPrize = await activityService.remainPrize({ id: this.actionID })
    return remainPrize
  }
  async prizeList() {
    let prizeList = await activityService.prizeList({ id: this.actionID })
    return prizeList
  }
  async allListPrize(params: { page: number; pageSize: number }) {
    let allListPrize = await activityService.allListPrize({
      prizeId: this.actionID,
      ...params
    })
    return allListPrize
  }
}
