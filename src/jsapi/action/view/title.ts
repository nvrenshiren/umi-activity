import { wrap, invokeApp } from "../../adapter";

const ACTION_CHANGETITLE = "view.changeTitle";
const ACTION_TITLECLICK = "view.onTitleClick";

/**
 * 改变顶部标题
 */
wrap(ACTION_CHANGETITLE, title => {
	invokeApp(ACTION_CHANGETITLE, { title });
});

/**
 * 点击顶部标题
 */
wrap(ACTION_TITLECLICK, cb => {
	invokeApp(ACTION_TITLECLICK, cb);
});
