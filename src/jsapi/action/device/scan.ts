import { wrap, invokeApp } from "../../adapter";

const ACTION = "device.scan";

/**
 * 扫码
 *
 * @param {Function} callback 回调函数
 *
 *   参数:
 * 		code : 扫码得到的内容
 */
wrap(ACTION, cb => invokeApp(ACTION, cb));
