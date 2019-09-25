import { wrap, invokeApp } from "../../adapter";

const ACTION = "view.goto";

/**
 * 页面跳转
 *
 * @params {Object} kv 键值对参数
 * {
 * 		title: title,
 * 		url: url,
 * 		isNative: isNative
 * }
 */
wrap(ACTION, kv => {
	kv.title = kv.title || "";
	kv.url = kv.url || "";
	invokeApp(ACTION, kv);
});
