import { wrap, invokeApp } from '../../adapter'

const ACTION = 'device.getNetworkType'

/**
 * 获取设备的当前网络状态
 *
 * @param {Function} cb 回调函数
 *
 *  network_type:wifi     wifi网络
 * 	network_type:edge     非wifi,包含3G/2G
 * 	network_type:fail     网络断开连接
 * 	network_type:wwan     2g或者3g
 *
 */
wrap(ACTION, (cb: Object) => invokeApp(ACTION, cb))
