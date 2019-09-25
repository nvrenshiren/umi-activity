import { wrap, invokeApp } from '../../adapter'

const ACTION = 'device.getLocation'
/**
 * 获取设备的当前位置
 *
 * @param {Function} cb 回调函数
 *
 *		longitude	String	经度
 *		latitude	String	纬度
 *		accuracy	Number	精度，单位米
 *		speed	Number	速度，单位毫秒
 *		country	String	国家名
 *		countryCode	string	国家编号
 *		province	String	省份名
 *		city	String	城市名
 *		cityCode	String	城市编码
 *		adCode	String	区域编码
 *		streetNumber	Object	街道门牌信息，结构是：{street, number}
 *		pois	Object Array	定位点附近的 POI 信息，结构是：{name, address}
 */
wrap(ACTION, (cb: Object) => invokeApp(ACTION, cb))
