import { wrap, invokeApp } from "../../adapter";

const ACTION_SHOW = "ui.showToast";
const ACTION_HIDE = "ui.hideToast";

wrap(ACTION_SHOW, msg => {
	invokeApp(ACTION_SHOW, { msg });
});

wrap(ACTION_HIDE, () => {
	invokeApp(ACTION_HIDE);
});
