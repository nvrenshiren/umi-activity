import { wrap, invokeApp } from "../../adapter";

const ACTION_SHOW = "ui.showLoading";
const ACTION_HIDE = "ui.hideLoading";

wrap(ACTION_SHOW, (content, delay = 1000) => {
	content = content || "";
	invokeApp(ACTION_SHOW, { content, delay });
});

wrap(ACTION_HIDE, () => {
	invokeApp(ACTION_HIDE);
});
