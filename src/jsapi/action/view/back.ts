import { wrap, invokeApp } from "../../adapter";

const ACTION = "view.back";

/**
 * 页面回退
 */
wrap(ACTION, () => {
	invokeApp(ACTION);
});
