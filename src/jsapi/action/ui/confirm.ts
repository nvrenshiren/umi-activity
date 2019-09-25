import { wrap, invokeApp } from "../../adapter";

const ACTION = "ui.confirm";

/**
 * 调用原生Alert弹框
 *
 * @param {String} title 标题
 * @param {String | Object} msg 消息内容
 *
 */
wrap(ACTION, (title, msg, cb) => {
	/**
	 * cb形式 : cb(err,res)
	 * res:
	 *  {
	 *    "button":"点击的按钮 OK或CANCEL"
	 *  }
	 */
	invokeApp(ACTION, { title, msg }, cb);
});
