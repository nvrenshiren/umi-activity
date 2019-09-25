import { wrap, invokeApp } from "../../adapter";

import { isFn } from "../../utils";

const ACTION = "image.choose";

/**
 * count: 最大可选照片数,上限9张
 * sourceType: 相册选取或者拍照，默认 ['camera','album']
 *
 * cb:回调函数
 *   参数:
 *      filePaths
 *   错误信息:
 * 		code: 错误码  10: 用户取消操作 , 11	操作失败（权限不够）
 */
wrap(ACTION, (count, sourceType, cb) => {
	if (isFn(count)) {
		cb = count;
		count = 9;
		sourceType = ["camera", "album"];
	} else {
		count = !count || count > 9 ? 9 : Math.abs(count);
		if (isFn(sourceType)) {
			cb = sourceType;
			sourceType = ["camera", "album"];
		} else {
			sourceType = !sourceType ? ["camera", "album"] : sourceType;
		}
	}

	invokeApp(ACTION, { count, sourceType }, cb);
});
