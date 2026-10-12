import { store, getContext, getConfig } from '@wordpress/interactivity';

store( 'orthocalbl', {
	actions: {
		get calendarDate() {
			const context = getContext();
			return context.currentDate ? new Date(context.currentDate) : new Date();
		},
		setDate(date) {
			const context = getContext();
			const newDate = new Date(date).toLocaleDateString('en-US');
			context.currentDate = newDate;
		},
		dateToday() {
			const context = getContext();
			context.currentDate = new Date();
		},
		dateNext() {
			dateIncrement(1);
		},
		datePrevious() {
			dateIncrement(-1);
		},
		dateIncrement(days) {
			const context = getContext();
			const currentDay = new Date(context.currentDate);
			const timeOffset = days * oneDay;
			currentDay.setTime(currentDay.getTime() + timeOffset);
			setDate(currentDay);
		},
		setErrorMesssage(errmsg) {
			const context = getContext();
			const { translations } = getConfig();
			
			const append = errmsg ? '<br />' + errmsg : '';

			context.errorMessage = translations.errorMessage + append;
			context.isError = true;
		}
	}, // actions
	callbacks: {
		fetchCalendarInfo: () => {
			const context = getContext();
			const { url_day, sec_req } = getConfig();

			// reasons to not continue
			if (context.isLoading) {
				return;
			}

			// update state
			context.isError = false;
			context.isLoading = true;

			const currentDay = context.currentDate;

			// date props
			const mm = ocGetTwoDigitInt(currentDay.getMonth() + 1);
			const dd = ocGetTwoDigitInt(currentDay.getDate());
			const yy = currentDay.getFullYear();

			// content props
			const dt = ocEl.getAttribute("dt") ?? 1;
			const hh = ocEl.getAttribute("hh") ?? 1;
			const ll = ocEl.getAttribute("ll") ?? 1;
			const tt = ocEl.getAttribute("tt") ?? 1;
			const ss = ocEl.getAttribute("ss") ?? 1;
			const lang = ocEl.getAttribute("lang") ?? 'en';
			
			const urlParams = new URLSearchParams(window.location.search);
			const cachebuster = urlParams.get('cachebuster') || 0;

			const phpPath = url_day;
			const par =
				phpPath +
				"&month=" +
				mm +
				"&today=" +
				dd +
				"&year=" +
				yy +
				"&dt=" +
				dt +
				"&header=" +
				hh +
				"&lives=" +
				ll +
				"&trp=" +
				tt +
				"&scripture=" +
				ss +
				"&language=" +
				lang +
				"&sec_req=" +
				sec_req +
				"&cachebuster=" +
				cachebuster
				"&sid=" +
				Math.random();

			// Get data fro the server
			fetch(par, {
				method: "GET",
				credentials: "same-origin",
			})
				.then((response) => response.json())
				.then((response) => {
					if (!response?.success) {
						setErrorMesssage(response.data);
					} else {
						ocSetInfoHtml(ocEl, response.data);
					}
				})
				.catch((error) => {
					setErrorMesssage();
				})
				.finally(() => {
					context.isLoading = false;
				});
		}
	} // callbacks
} ); // store


/*

// update every 2 hours
const timerDelay = 2000 * 60 * 60;
// one day in milliseconds
const oneDay = 24 * 60 * 60 * 1000;

// block container class
const ocClass = "orthodox-calendar";
// info container class
const ocInfoClass = "ocContainer";
// button container
const ocBtnBarClass = "ocButtonsBar";
// previous button class
const ocPrevClass = "day-previous";
// current button class
const ocCurrClass = "day-current";
// next button class
const ocNextClass = "day-next";
// calendar button class
const ocCalendarClass = "day-picker";
// date picker class
const ocDatePickerClass = "ocDatePicker";
// language toggle class
const ocLangToggleClass = "lang-toggle";
// display box class
const ocDisplayBoxClass = "display-box";
// display box loading class
const ocDisplayLoadingClass = "display-box-loading";
// display box content class
const ocDisplayContentClass = "display-box-content";
// display box close btn
const ocDisplayBoxBtnClose = "ocBtnClose";

// loading message
const ocMsgLoading = "Loading...";


// day url
const url_day = oc_data?.url_day ?? false;
// content url
const url_popup = oc_data?.url_popup ?? false;
// get request nonce
const sec_req = window.oc_data?.sec_req ?? "";
// get popup nonce
const sec_pop = window.oc_data?.sec_pop ?? "";

// display popup window for link
async function ocDisplayBoxShow(ocEl, link) {
	if (!ocEl || !link?.href?.length) return;

	const displayBox = ocEl.getElementsByClassName(ocDisplayBoxClass)[0];
	if (! displayBox) return;

	const loading = ocEl.getElementsByClassName(ocDisplayLoadingClass)[0];
	if (! loading) return;

	const content = ocEl.getElementsByClassName(ocDisplayContentClass)[0];
	if (! content) return;
	
	const lang = ocEl.getAttribute("lang") ?? 'en';

	const urlParams = new URLSearchParams(window.location.search);
	const cachebuster = urlParams.get('cachebuster') || 0;

	// show loading message
	loading.classList.remove('hidden');
	displayBox.classList.remove('hidden');

	const path = url_popup +
		"&popup=" + encodeURI(link.href) +
		"&language=" + lang +
		"&sec_pop=" + sec_pop +
		"&cachebuster=" + cachebuster
	;

	// Get data fro the server
	fetch(path, {
		method: "GET",
		credentials: 'include'
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			if (!response?.success) {
				content.textContent = "Error fetching content. " + response.data;
			} else {
				content.innerHTML = response.data;
			}
		})
		.catch((error) => {
			content.textContent = "Error fetching content. " + error.message;
		})
		.finally(() => {
			loading.classList.add('hidden');
			content.classList.remove('hidden');
		});
};


function ocDisplayBoxHide(ocEl) {

	const displayBox = ocEl.getElementsByClassName(ocDisplayBoxClass)[0];
	if (! displayBox) return;
	displayBox.classList.add('hidden');

	const content = ocEl.getElementsByClassName(ocDisplayContentClass)[0];
	if (content) content.classList.add('hidden');
}

// search up from link to find containing calendar
function ocFindRoot(elem) {
	if (!elem || !elem.classList) {
		return null;
	}

	if (elem.classList.contains(ocClass)) {
		return elem;
	}

	return ocFindRoot(elem.parentNode);
}

function ocSetInfoHtml(ocEl, content) {
	if (!ocEl) return;

	const infoEl = ocGetInfoContainer(ocEl);

	if (infoEl) infoEl.innerHTML = content;
}

function ocToggleDatePicker(picker) {
	picker.hidden = !picker.hidden;
}

function ocGetLoading(ocEl) {
	return ocEl.getAttribute("loading") === "1";
}

function ocGetDate(ocEl) {
	const storedDate = ocEl.getAttribute('currentdate');
	return storedDate ? new Date(storedDate) : new Date();
}

function ocGetTwoDigitInt(num) {
	return (num < 10) ? '0' + num : '' + num;
}

function ocGetDatePickerFormatedDate(date) {

	if (typeof date === 'string') {
		date = new Date(date);
	}

	const mm = date.getMonth() + 1;
	const sm = ocGetTwoDigitInt(mm);
	const dd = date.getDate();
	const sd = ocGetTwoDigitInt(dd);
	const yy = date.getFullYear();

	return yy + '-' + sm + '-' + sd;
}

function ocSetDate(ocEl, date) {
	const newDate = new Date(date).toLocaleDateString('en-US');
	ocEl.setAttribute('currentdate', newDate);

	const datePicker = ocGetDatePicker(ocEl);
	datePicker?.setAttribute('value', ocGetDatePickerFormatedDate(date));
}

// display fetch error message
function ocShowFetchError(ocEl, data) {
	const intro = '<p>An error occurred fetching the calendar information.</p>';
	const err = ((typeof data == "string") && data !== "") ? '<p>' + data + '</p>' : '';
	const visit = '<p>Please visit <a href="http://www.holytrinityorthodox.com/">holytrinityorthodox.com/calendar</a> to see information.</p>';
	const msg = intro + err + visit;

	ocSetInfoHtml(ocEl, msg);
}

// find info container
function ocGetInfoContainer(ocEl) {
	return ocEl.getElementsByClassName(ocInfoClass)[0];
}

// find date picker
function ocGetDatePicker(ocEl) {
	return ocEl.getElementsByClassName(ocDatePickerClass)[0];
}

// change day by passed increment amount
function ocIncrementDay(ocEl, days) {
	const currentDay = ocGetDate(ocEl);
	const timeOffset = days * oneDay;
	currentDay.setTime(currentDay.getTime() + timeOffset);
	ocGetDateInfo(ocEl, currentDay);
}

// set calendar to previous day
function ocPreviousDate(ocEl) {
	ocIncrementDay(ocEl, -1);
}

// set calendar to next day
function ocNextDate(ocEl) {
	ocIncrementDay(ocEl, 1);
}

// set calendar to today
function ocTodayDate(ocEl) {
	const today = new Date();
	ocGetDateInfo(ocEl, today);
}

// toggle language
function ocToggleLang(data) {
	const { ocEl, langs } = data;

	const currLang = ocEl.getAttribute("lang");
	const index = langs.indexOf(currLang);
	const nextIndex = ((index + 1) >= langs.length) ? 0 : index + 1;

	ocGetLanguageInfo(ocEl, langs, nextIndex);
}

// load language based on index
function ocGetLanguageInfo(ocEl, langs, index) {
	
	const langBtn = ocEl.getElementsByClassName(ocLangToggleClass)[0];
	const currLang = ocEl.getAttribute("lang");
	const nextLang = langs[index];
	if (!langBtn || !nextLang || nextLang == currLang) return;

	// update current language strings
	langBtn.textContent = nextLang;
	ocEl.setAttribute("lang", nextLang);

	// load current info
	ocGetDateInfo(ocEl);
}

// enable/disable buttons
function ocDisableButtons(ocEl, state) {
	// make sure using a boolean
	const disabled = !!state;

	// get buttons
	const btns = ocEl.getElementsByClassName(ocBtnBarClass)[0]?.childNodes;
	// set button disabled state
	for(let btn of btns) {
		btn.disabled = disabled;
	}
}

// show that we are loading the info
function ocSetLoading(ocEl, state) {
	const newState = !!state ? 1 : 0;
	ocEl.setAttribute("loading", newState);

	if (newState) ocSetInfoHtml(ocEl, ocMsgLoading);

	ocDisableButtons(ocEl, newState);
}

// add onclick function to element
function ocSetOnClick(ocEl, elClass, func, arg) {
	const elem = ocEl.getElementsByClassName(elClass)[0];
	if (!elem || typeof func !== 'function') return;

	elem.onclick = function() {
		func.call(window, arg);
	}
}

// convert string date to usable date
function ocSetDateByString(ocEl, value) {
	// don't update of loading info
	if (ocGetLoading(ocEl)) return;

	// convert string date to usable date
	const selectedDate = new Date(value);
	const offsetDate = new Date(selectedDate.getTime() + oneDay);
	// get info for the date
	ocGetDateInfo(ocEl, offsetDate);
}

// set calendar element functions
function ocInitElements(ocEl) {
	// already setup this calendar
	if (ocEl.getAttribute("init") === "1") return;

	ocSetOnClick(ocEl, ocPrevClass, ocPreviousDate, ocEl);
	ocSetOnClick(ocEl, ocCurrClass, ocTodayDate, ocEl);
	ocSetOnClick(ocEl, ocNextClass, ocNextDate, ocEl);
	const langs = ocEl.getAttribute("ln").split(',');
	ocSetOnClick(ocEl, ocLangToggleClass, ocToggleLang, {langs: langs, ocEl: ocEl});
	ocSetOnClick(ocEl, ocDisplayBoxBtnClose, ocDisplayBoxHide, ocEl);

	const datePicker = ocGetDatePicker(ocEl);
	if (datePicker) {
		const storedDate = ocGetDatePickerFormatedDate(ocGetDate(ocEl));
		datePicker.setAttribute('value', storedDate);
		ocSetOnClick(ocEl, ocCalendarClass, ocToggleDatePicker, datePicker);
		datePicker.onchange = function (e) {
			if (ocGetLoading(ocEl)) return;
			ocSetDateByString(ocEl, e.target.value);
		};
	}

	const infoEl = ocGetInfoContainer(ocEl);
	infoEl.addEventListener('click', (event) => {
		const link = event.target.closest('a[target]');
	
		if (!link) return;

		event.preventDefault();

		ocDisplayBoxShow(ocEl, link);
	});
}

// get calendar values
function ocGetDateInfo(ocEl, date) {
	// reasons to not continue
	if (!ocEl || ocGetLoading(ocEl)) {
		return;
	}

	if (!date) {
		date = ocGetDate(ocEl);
	}

	ocSetDate(ocEl, date);
	ocSetLoading(ocEl, true);
	ocDisableButtons(ocEl, true);

	// date props
	const mm = date.getMonth() + 1;
	const sm = ocGetTwoDigitInt(mm);
	const dd = date.getDate();
	const sd = ocGetTwoDigitInt(dd);
	const yy = date.getFullYear();

	// content props
	const dt = ocEl.getAttribute("dt") ?? 1;
	const hh = ocEl.getAttribute("hh") ?? 1;
	const ll = ocEl.getAttribute("ll") ?? 1;
	const tt = ocEl.getAttribute("tt") ?? 1;
	const ss = ocEl.getAttribute("ss") ?? 1;
	const lang = ocEl.getAttribute("lang") ?? 'en';

	ocFetchInfo(ocEl, sm, sd, yy, dt, hh, ll, tt, ss, lang);
}

// call calendar api for data
async function ocFetchInfo(ocEl, mm, dd, yy, dt, hh, ll, tt, ss, lang) {
	if (!ocEl) {
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const cachebuster = urlParams.get('cachebuster') || 0;

	const phpPath = url_day;
	const par =
		phpPath +
		"&month=" +
		mm +
		"&today=" +
		dd +
		"&year=" +
		yy +
		"&dt=" +
		dt +
		"&header=" +
		hh +
		"&lives=" +
		ll +
		"&trp=" +
		tt +
		"&scripture=" +
		ss +
		"&language=" +
		lang +
		"&sec_req=" +
		sec_req +
		"&cachebuster=" +
		cachebuster
		"&sid=" +
		Math.random();

	// Get data fro the server
	fetch(par, {
		method: "GET",
		credentials: "same-origin",
	})
		.then((response) => response.json())
		.then((response) => {
			if (!response?.success) {
				ocShowFetchError(ocEl, response.data);
			} else {
				ocSetInfoHtml(ocEl, response.data);
			}
		})
		.catch((error) => {
			ocShowFetchError(ocEl);
		})
		.finally(() => {
			ocSetLoading(ocEl, false);
		});
}

function ocInit(ocEl) {

	if (!ocEl || !url_day || !sec_req) {
		ocSetInfoHtml(ocEl, "Plugin misconfiguration");
		ocDisableButtons(ocEl, true);
		return;
	}

	// already setup this calendar
	if (ocEl.getAttribute("init") === "1") return;

	// JS Date when script loads
	ocSetDate(ocEl, new Date());

	// make elements functional
	ocInitElements(ocEl);

	// load current info
	ocGetDateInfo(ocEl);

	// set current languate
	ocEl.setAttribute("lang", ocEl.getAttribute("dl"));

	// mark that calendar is initialized
	ocEl.setAttribute("init", "1");
}

const oCalendars = document.getElementsByClassName("orthodox-calendar-block");
if (oCalendars.length) {
	for (let cal of oCalendars) {
		ocInit(cal);
	}

	// timer every 2 hours
	setInterval(function () {
		for (let cal of oCalendars) {
			ocTodayDate(cal);
		}
	}, timerDelay);
}
*/