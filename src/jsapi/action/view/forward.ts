import { wrap, invokeApp } from "../../adapter";

const ACTION = "view.forward";

/**
 * 页面前进
 */
wrap(ACTION, () => {
	invokeApp(ACTION);
});
