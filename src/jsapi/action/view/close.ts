import { wrap, invokeApp } from "../../adapter";

const ACTION = "view.close";

/**
 * 页面关闭
 */
wrap(ACTION, () => {
	invokeApp(ACTION);
});
