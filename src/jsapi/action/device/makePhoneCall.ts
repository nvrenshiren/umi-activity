import { wrap, invokeApp } from "../../adapter";

const ACTION = "device.makePhoneCall";

/**
 * 拨打电话
 *
 * @param {String} number 电话号码
 */
wrap(ACTION, number => invokeApp(ACTION, { number }));
