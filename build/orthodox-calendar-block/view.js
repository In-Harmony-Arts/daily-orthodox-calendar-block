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
/*!*********************************************!*\
  !*** ./src/orthodox-calendar-block/view.js ***!
  \*********************************************/
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
const orthocalblStore = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("orthodox-calendar-block", {
  state: {
    get hasContent() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.contentHtml != "";
    },
    get hasError() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.errorHtml != "";
    },
    get showPopup() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
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
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.showDatePicker = !context.showDatePicker;
    },
    datepickerOnChange(event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (context.isLoading) return;
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
    handleLinkClick: (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withSyncEvent)(function (event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      event.preventDefault();
      const link = event.target.closest('a[target]');
      if (!link?.href) return;
      context.popupUrl = link.href;
    }),
    closePopup() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      context.popupUrl = "";
      const popup = ref.closest(".ocb-popup");
      setTimeout((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(() => {
        orthocalblStore.actions.setContentHtml("", context, popup);
      }), 2000);
    },
    setContentHtml(html, context, ref) {
      context.contentHtml = html;
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
    fetchData(url, qsps) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
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
        credentials: "same-origin"
      }).then(response => response.json()).then(response => {
        if (response?.success && response?.data) {
          orthocalblStore.actions.setContentHtml(response.data, context, ref);
        } else {
          orthocalblStore.actions.setFetchErrorMesssage('Error loading content', context, ref);
        }
      }).catch(error => {
        orthocalblStore.actions.setFetchErrorMesssage("Error loading content", context, ref);
      }).finally(() => {
        context.isLoading = false;
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
      if (context.isLoading) {
        return;
      }
      const currentDay = new Date(context.currentDate);

      // date props
      const mm = ocGetTwoDigitInt(currentDay.getMonth() + 1);
      const dd = ocGetTwoDigitInt(currentDay.getDate());
      const yy = currentDay.getFullYear();
      const cachebuster = getCacheBuster();
      const qsps = "&month=" + mm + "&today=" + dd + "&year=" + yy + "&dt=" + context.dt + "&header=" + context.hh + "&lives=" + context.ll + "&trp=" + context.tt + "&scripture=" + context.ss + "&language=" + context.lang + "&sec_req=" + config.sec_req + "&cachebuster=" + cachebuster;
      orthocalblStore.actions.fetchData(config.url_day, qsps);
    },
    fetchPopupInfo: () => {
      const {
        isLoading,
        popupUrl,
        lang
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        sec_pop,
        url_popup
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getConfig)();

      // wait for current request to finish
      if (!orthocalblStore.state.showPopup || isLoading) {
        return;
      }
      const qsps = "&popup=" + encodeURI(popupUrl) + "&language=" + lang + "&sec_pop=" + sec_pop + "&cachebuster=" + getCacheBuster();
      orthocalblStore.actions.fetchData(url_popup, qsps);
    }
  } // callbacks
}); // store
})();


//# sourceMappingURL=view.js.map