import {
	store,
	getContext,
	getConfig,
	getElement,
	withSyncEvent,
	withScope,
} from "@wordpress/interactivity";

const oneDay = 24 * 60 * 60 * 1000;

const setDate = (date) => {
	const context = getContext();
	const newDate = new Date(date).toLocaleDateString("en-US");

	context.currentDate = newDate;
};

const dateIncrement = (days) => {
	const context = getContext();
	const currentDay = new Date(context.currentDate);
	const timeOffset = days * oneDay;
	currentDay.setTime(currentDay.getTime() + timeOffset);
	setDate(currentDay);
};

const ocGetTwoDigitInt = (num) => {
	return num < 10 ? "0" + num : "" + num;
};

const setLang = (lang) => {
	const context = getContext();
	context.lang = lang;
};

const getCacheBuster = () => {
	const urlParams = new URLSearchParams(window.location.search);

	return urlParams.get("cachebuster") || 0;
}

const setElementChildHtmlByClass = (element, selector, html) => {
	if (!element || !selector) return;

	const child = element.getElementsByClassName(selector)[0];

	if (child) {
		child.innerHTML = html;
		child.scrollTop = 0;
	}
}

const getContextContainer = (context, ref) => {
	if (!context || !ref) return false;

	const isinfo = ref.classList.contains('ordc-info-content');
	const container = isinfo ? 'content' : 'popup';

	return context[container];
}

const orthoresDcStore = store("orthores/daily-calendar", {
	state: {
		get hasContent() {
			const context = getContext();
			const { ref } = getElement();
			const container = getContextContainer(context, ref);

			return container?.contentHtml != "";
		},
		get hasError() {
			const context = getContext();
			const { ref } = getElement();
			const container = getContextContainer(context, ref);

			return container?.errorHtml != "";
		},
		get showPopup() {
			const context = getContext();

			return context.popupUrl != "";
		}
	},
	actions: {
		dateToday() {
			setDate(new Date());
		},
		dateNext() {
			dateIncrement(1);
		},
		datePrevious() {
			dateIncrement(-1);
		},
		toggleDatePicker() {
			const context = getContext();
			context.showDatePicker = !context.showDatePicker;
		},
		datepickerOnChange(event) {
			const context = getContext();

			if (context.content.isLoading) return;

			const value = event.target.value;

			// convert string date to usable date
			const selectedDate = new Date(value);
			const offsetDate = new Date(selectedDate.getTime() + oneDay);

			setDate(offsetDate);
		},
		toggleLanguage() {
			const context = getContext();
			const ln = context.ln;

			const index = ln.indexOf(context.lang);
			const nextIndex = index + 1 < ln.length ? index + 1 : 0;

			setLang(ln[nextIndex]);
		},
		setPopupUrl(url) {
			const context = getContext();

			context.popupUrl = url;
		},
		handleLinkClick: withSyncEvent(function (event) {
			const context = getContext();
			const { ref } = getElement();

			event.preventDefault();

			const link = event.target.closest('a[target]');

			if (!link?.href) return;

			orthoresDcStore.actions.setPopupUrl(link.href);

			window.addEventListener('keydown', orthoresDcStore.actions.handleKeyDown);

			// const orcd = event.target.closest('.wp-block-orthodox-resources-daily-calendar');

			// // need dela so popup becomes visible
			// setTimeout(() => {
			// 	const popup = orcd.getElementsByClassName('ordc-popup')[0];
			// 	popup?.focus();
			// }, 1000);
		}),
		handleKeyDown: (event) => {
			if (event.key === "Escape") {
				const { ref } = getElement();
				const orcd = ref.closest('.wp-block-orthodox-resources-daily-calendar');
				const close = orcd.getElementsByClassName('ordc-button-close')[0];

				close.click();
			}
		},
		closePopup() {
			const { popup } = getContext();
			const { ref } = getElement();

			orthoresDcStore.actions.setPopupUrl("");

			const orcd = ref.closest('.wp-block-orthodox-resources-daily-calendar');

			window.removeEventListener('keydown', orthoresDcStore.actions.handleKeyDown);

			setTimeout(
                withScope( () => {
					if (popup.isLoading) return;

					const popupEl = orcd.getElementsByClassName('ordc-popup')[0];
					const info = orcd.getElementsByClassName('ordc-info')[0];

                    orthoresDcStore.actions.setContentHtml("", popup, popupEl);
                } ),
                200
            );
		},
		setContentHtml(html, context, ref) {
			context.contentHtml = html;

			if (html == "") {
				context.oldQsps = "";
			}

			setElementChildHtmlByClass(ref, "content", html);
		},
		setFetchErrorMesssage(errmsg, context, ref) {
			const { translations } = getConfig();

			const prepend = translations?.errorMessage || "An error occurred.";
			const append = errmsg ? "<br />" + errmsg : "";
			const errorMessage = prepend + append;

			context.errorMessage = errorMessage;

			setElementChildHtmlByClass(ref, "error", errorMessage);

			// update status
			context.oldQsps = "";
		},
		fetchData(url, qsps, container, ref) {
			if (!container) {
				return;
			}

			if (qsps === container.oldQsps) {
				return;
			}

			// update context
			container.isLoading = true;
			container.contentHtml = "";
			container.oldQsps = qsps;

			const path = url + qsps;

			// Get data from the server
			fetch(path, {
				method: "GET",
				credentials: "same-origin",
			})
				.then((response) => response.json())
				.then((response) => {
					if (response?.success && response?.data) {
						orthoresDcStore.actions.setContentHtml(response.data, container, ref);
					} else {
						orthoresDcStore.actions.setFetchErrorMesssage('Error loading content', container, ref);
					}
				})
				.catch((error) => {
					orthoresDcStore.actions.setFetchErrorMesssage("Error loading content", container, ref);
				})
				.finally(() => {
					container.isLoading = false;
				});
		}
	}, // actions
	callbacks: {
		setDatePickerFormatedDate: () => {
			const context = getContext();

			const date = new Date(context.currentDate);

			const mm = ocGetTwoDigitInt(date.getMonth() + 1);
			const dd = ocGetTwoDigitInt(date.getDate());
			const yy = date.getFullYear();

			const value = yy + "-" + mm + "-" + dd;

			context.datePickerFormatedDate = value;
		},
		fetchCalendarInfo: () => {
			const context = getContext();
			const config = getConfig();

			// wait for current request to finish
			if (context.content.isLoading) {
				return;
			}

			const { ref } = getElement();

			const currentDay = new Date(context.currentDate);

			// date props
			const mm = ocGetTwoDigitInt(currentDay.getMonth() + 1);
			const dd = ocGetTwoDigitInt(currentDay.getDate());
			const yy = currentDay.getFullYear();

			const cachebuster = getCacheBuster();

			const qsps =
				"&month=" +
				mm +
				"&today=" +
				dd +
				"&year=" +
				yy +
				"&dt=" +
				context.dt +
				"&hh=" +
				context.hh +
				"&ll=" +
				context.ll +
				"&tt=" +
				context.tt +
				"&ss=" +
				context.ss +
				"&lang=" +
				context.lang +
				"&sec_req=" +
				config.sec_req +
				"&cachebuster=" +
				cachebuster;

			orthoresDcStore.actions.fetchData(config.url_day, qsps, context.content, ref);
		},
		fetchPopupInfo: () => {
			const {popup, popupUrl, lang } = getContext();
			const {sec_pop, url_popup } = getConfig();
			const { ref } = getElement();

			// wait for current request to finish
			if (popup.contentHtml != "" || popup.isLoading || popupUrl == "") {
				return;
			}

			const qsps = "&popup=" + encodeURI(popupUrl) +
				"&language=" + lang +
				"&sec_pop=" + sec_pop +
				"&cachebuster=" + getCacheBuster();

			orthoresDcStore.actions.fetchData(url_popup, qsps, popup, ref);
		},
	}, // callbacks
}); // store