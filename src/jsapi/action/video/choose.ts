import { wrap, invokeApp } from "../../adapter";

const ACTION = "video.choose";

/**
 * {
 *  count: 最大可选照片数,上限9张
 *  sourceType: 相册选取或者拍照，默认 ['camera','album']
 *  camera: 前置或者后置摄像头，默认前后都有，即：[‘front’, ‘back’]
 * }
 * cb:回调函数
 *   参数:
 *      filePaths
 *   错误信息:
 * 		code: 错误码  10: 用户取消操作 , 11	操作失败（权限不够）
 */
wrap(ACTION, ({ count, sourceType, camera }, cb) => {
	count = !count || count > 9 ? 9 : Math.abs(count);
	sourceType = !sourceType ? ["camera", "album"] : sourceType;
	camera = !camera ? ["front", "back"] : camera;

	invokeApp(ACTION, { count, sourceType, camera }, cb);
});
