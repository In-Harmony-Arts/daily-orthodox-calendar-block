import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity"
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ // define __esModule on exports
/******/ __webpack_require__.r = (exports) => {
/******/ 	Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 	Object.defineProperty(exports, '__esModule', { value: true });
/******/ };
/******/ 
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./src/orthodox-resources-daily-calendar/view.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");

const oneDay = 24 * 60 * 60 * 1000;
const setDate = date => {
  const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
  const newDate = new Date(date).toLocaleDateString("en-US");
  context.currentDate = newDate;
};
const dateIncrement = days => {
  const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
  const currentDay = new Date(context.currentDate);
  const timeOffset = days * oneDay;
  currentDay.setTime(currentDay.getTime() + timeOffset);
  setDate(currentDay);
};
const ocGetTwoDigitInt = num => {
  return num < 10 ? "0" + num : "" + num;
};
const setLang = lang => {
  const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
  context.lang = lang;
};
const getCacheBuster = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("cachebuster") || 0;
};
const setElementChildHtmlByClass = (element, selector, html) => {
  if (!element || !selector) return;
  const child = element.getElementsByClassName(selector)[0];
  if (child) {
    child.innerHTML = html;
    child.scrollTop = 0;
  }
};
const getContextContainer = (context, ref) => {
  if (!context || !ref) return false;
  const isinfo = ref.classList.contains('ordc-info-content');
  const container = isinfo ? 'content' : 'popup';
  return context[container];
};
const isEmpty = value => {
  return value === undefined || value === null || value === false || value === "";
};
const orthoresDcStore = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("orthores/daily-calendar", {
  state: {
    get hasContent() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const container = getContextContainer(context, ref);
      return !isEmpty(container?.contentHtml);
    },
    get hasError() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const container = getContextContainer(context, ref);
      return !isEmpty(container?.errorHtml);
    },
    get isLoading() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const element = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const container = getContextContainer(context, ref);
      console.log('isLoading() context', context);
      console.log('isLoading() element', element);
      console.log('isLoading() ref', ref);
      console.log('isLoading() container', container);
      return !!container?.isLoading;
    },
    get showPopup() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return !isEmpty(context.popupUrl);
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
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.showDatePicker = !context.showDatePicker;
    },
    datepickerOnChange(event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (context.content.isLoading) return;
      const value = event.target.value;

      // convert string date to usable date
      const selectedDate = new Date(value);
      const offsetDate = new Date(selectedDate.getTime() + oneDay);
      setDate(offsetDate);
    },
    toggleLanguage() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const ln = context.ln;
      const index = ln.indexOf(context.lang);
      const nextIndex = index + 1 < ln.length ? index + 1 : 0;
      setLang(ln[nextIndex]);
    },
    setPopupUrl(url) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.popupUrl = url;
    },
    handleLinkClick: (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withSyncEvent)(function (event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
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
    handleKeyDown: event => {
      if (event.key === "Escape") {
        const {
          ref
        } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
        const orcd = ref.closest('.wp-block-orthodox-resources-daily-calendar');
        const close = orcd.getElementsByClassName('ordc-button-close')[0];
        close.click();
      }
    },
    closePopup() {
      const {
        popup
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      orthoresDcStore.actions.setPopupUrl("");
      const orcd = ref.closest('.wp-block-orthodox-resources-daily-calendar');
      window.removeEventListener('keydown', orthoresDcStore.actions.handleKeyDown);
      setTimeout((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(() => {
        if (popup.isLoading) return;
        const popupEl = orcd.getElementsByClassName('ordc-popup')[0];
        const info = orcd.getElementsByClassName('ordc-info')[0];
        orthoresDcStore.actions.setContentHtml("", popup, popupEl);
      }), 200);
    },
    setContentHtml(html, context, ref) {
      context.contentHtml = html;
      if (html == "") {
        context.oldQsps = "";
      }
      setElementChildHtmlByClass(ref, "content", html);
    },
    setFetchErrorMesssage(errmsg, context, ref) {
      const {
        translations
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getConfig)();
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
        credentials: "same-origin"
      }).then(response => response.json()).then(response => {
        if (response?.success && response?.data) {
          orthoresDcStore.actions.setContentHtml(response.data, container, ref);
        } else {
          orthoresDcStore.actions.setFetchErrorMesssage('Error loading content', container, ref);
        }
      }).catch(error => {
        orthoresDcStore.actions.setFetchErrorMesssage("Error loading content", container, ref);
      }).finally(() => {
        container.isLoading = false;
      });
    }
  },
  // actions
  callbacks: {
    setDatePickerFormatedDate: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const date = new Date(context.currentDate);
      const mm = ocGetTwoDigitInt(date.getMonth() + 1);
      const dd = ocGetTwoDigitInt(date.getDate());
      const yy = date.getFullYear();
      const value = yy + "-" + mm + "-" + dd;
      context.datePickerFormatedDate = value;
    },
    fetchCalendarInfo: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const config = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getConfig)();

      // wait for current request to finish
      if (context.content.isLoading) {
        return;
      }
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const currentDay = new Date(context.currentDate);

      // date props
      const mm = ocGetTwoDigitInt(currentDay.getMonth() + 1);
      const dd = ocGetTwoDigitInt(currentDay.getDate());
      const yy = currentDay.getFullYear();
      const cachebuster = getCacheBuster();
      const qsps = "&month=" + mm + "&today=" + dd + "&year=" + yy + "&dt=" + context.dt + "&hh=" + context.hh + "&ll=" + context.ll + "&tt=" + context.tt + "&ss=" + context.ss + "&lang=" + context.lang + "&sec_req=" + config.sec_req + "&cachebuster=" + cachebuster;
      orthoresDcStore.actions.fetchData(config.url_day, qsps, context.content, ref);
    },
    fetchPopupInfo: () => {
      const {
        popup,
        popupUrl,
        lang
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        sec_pop,
        url_popup
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getConfig)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();

      // wait for current request to finish
      if (popup.contentHtml != "" || popup.isLoading || popupUrl == "") {
        return;
      }
      const qsps = "&popup=" + encodeURI(popupUrl) + "&language=" + lang + "&sec_pop=" + sec_pop + "&cachebuster=" + getCacheBuster();
      orthoresDcStore.actions.fetchData(url_popup, qsps, popup, ref);
    }
  } // callbacks
}); // store
})();


//# sourceMappingURL=view.js.map