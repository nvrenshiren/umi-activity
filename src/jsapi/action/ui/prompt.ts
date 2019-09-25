import { wrap, invokeApp } from "../../adapter";

const ACTION = "ui.prompt";

/**
 * 弹出系统交互框
 *
 * @params {Object} kv 参数键值对
 * 	kv:
 *  {
 * 		title: 标题,
 * 		msg: 消息内容,
 * 		placeholder: 默认文本
 * 	}
 * @params {Function} cb 回调函数
 *
 * 	参数:
 * 		content: 输入框中的内容
 */
wrap(ACTION, function (kv, cb) {
	// 针对null可能会引起App端的异常,采用空字符串形式
	kv.title = kv.title || "";
	kv.msg = kv.msg || "";
	kv.placeholder = kv.placeholder || "";

	invokeApp(ACTION, kv, cb);
});
