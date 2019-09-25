import { wrap, invokeApp } from "../../adapter";

const ACTION = "view.fullScreen";

/**
 * 页面全屏
 */
wrap(ACTION, () => {
	invokeApp(ACTION);
});
