import { wrap, invokeApp } from "../../adapter";

const ACTION_SHOW = "view.showOptionMenu";
const ACTION_HIDE = "view.hideOptionMenu";

/**
 * 显示页面右上角按钮
 */
wrap(ACTION_SHOW, () => {
	invokeApp(ACTION_SHOW);
});

/**
 * 隐藏页面右上角按钮
 */
wrap(ACTION_HIDE, () => {
	invokeApp(ACTION_HIDE);
});
