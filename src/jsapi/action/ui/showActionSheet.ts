import { wrap, invokeApp } from "../../adapter";

const ACTION = "ui.showActionSheet";

/**
 * 显示系统操作菜单
 *
 * @params {Object} kv 参数键值对
 * 	kv:
 *  {
 * 		title: 菜单标题,
 * 		items: 菜单按钮的文字数组,
 * 		cancelText: 取消按钮文案，默认为「取消」
 * 	}
 * @params {Function} cb 回调函数
 *
 * 	参数:
 * 		index: 被点击的按钮的索引，从0开始。点击取消或蒙层时返回 -1
 *
 */
wrap(ACTION, (kv, cb) => {
	kv.title = kv.title || "";
	kv.items = kv.items || [];
	kv.cancelText = kv.cancelText || "取消";
	invokeApp(ACTION, kv, cb);
});
