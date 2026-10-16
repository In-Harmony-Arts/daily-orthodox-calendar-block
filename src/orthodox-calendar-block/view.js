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

const orthocalblStore = store("orthodox-calendar-block", {
	state: {
		get hasContent() {
			const context = getContext();

			return context.contentHtml != "";
		},
		get hasError() {
			const context = getContext();

			return context.errorHtml != "";
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

			if (context.isLoading) return;

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
		handleLinkClick: withSyncEvent(function (event) {
			const context = getContext();

			event.preventDefault();

			const link = event.target.closest('a[target]');

			if (!link?.href) return;

			context.popupUrl = link.href;
		}),
		closePopup() {
			const context = getContext();
			const { ref } = getElement();

			context.popupUrl = "";

			const popup = ref.closest(".ocb-popup");

			setTimeout(
                withScope( () => {
                    orthocalblStore.actions.setContentHtml("", context, popup);
                } ),
                2000
            );
		},
		setContentHtml(html, context, ref) {
			context.contentHtml = html;

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
		fetchData(url, qsps) {
			const context = getContext();
			const { ref } = getElement();

			if (qsps === context.oldQsps) {
				return;
			}

			// update context
			context.isLoading = true;
			context.contentHtml = false;
			context.oldQsps = qsps;

			const path = url + qsps;

			// Get data from the server
			fetch(path, {
				method: "GET",
				credentials: "same-origin",
			})
				.then((response) => response.json())
				.then((response) => {
					if (response?.success && response?.data) {
						orthocalblStore.actions.setContentHtml(response.data, context, ref);
					} else {
						orthocalblStore.actions.setFetchErrorMesssage('Error loading content', context, ref);
					}
				})
				.catch((error) => {
					orthocalblStore.actions.setFetchErrorMesssage("Error loading content", context, ref);
				})
				.finally(() => {
					context.isLoading = false;
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
			if (context.isLoading) {
				return;
			}

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
				"&header=" +
				context.hh +
				"&lives=" +
				context.ll +
				"&trp=" +
				context.tt +
				"&scripture=" +
				context.ss +
				"&language=" +
				context.lang +
				"&sec_req=" +
				config.sec_req +
				"&cachebuster=" +
				cachebuster;

			orthocalblStore.actions.fetchData(config.url_day, qsps);
		},
		fetchPopupInfo: () => {
			const {isLoading, popupUrl, lang } = getContext();
			const {sec_pop, url_popup } = getConfig();

			// wait for current request to finish
			if (!orthocalblStore.state.showPopup || isLoading) {
				return;
			}

			const qsps = "&popup=" + encodeURI(popupUrl) +
				"&language=" + lang +
				"&sec_pop=" + sec_pop +
				"&cachebuster=" + getCacheBuster();

			orthocalblStore.actions.fetchData(url_popup, qsps)
		},
	}, // callbacks
}); // store
