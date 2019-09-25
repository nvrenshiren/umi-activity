import { wrap, invokeApp } from "../../adapter";

import { isDebug } from "../../debug";

const ACTION = "ui.alert";

/**
 * 调用原生Alert弹框
 *
 * @param {String} title 标题
 * @param {String | Object} msg 消息内容
 */
wrap(ACTION, (title, msg) => {
	if (isDebug()) {
		alert(
			JSON.stringify({
				title,
				msg
			})
		);
		return;
	}

	invokeApp(ACTION, { title, msg });
});
