/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Statics.js"
/*!************************!*\
  !*** ./src/Statics.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   badStrings: () => (/* binding */ badStrings),
/* harmony export */   containerClassName: () => (/* binding */ containerClassName),
/* harmony export */   filterArrayByArray: () => (/* binding */ filterArrayByArray),
/* harmony export */   languages: () => (/* binding */ languages),
/* harmony export */   msgLoading: () => (/* binding */ msgLoading)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


// supported languages
const languages = [{
  "label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("English", "orthocalbl"),
  "value": "en"
}, {
  "label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Russian", "orthocalbl"),
  "value": "ru"
}];

// loading message
const msgLoading = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Loading...", "orthocalbl");

// outermost container class
const containerClassName = "orthodox-calendar-block";

// attributes to filter out
const badStrings = ["btn_", "text_"];

/**
 * Function to filter out values
 * @param {Array} search Array to search through
 * @param {Array} filter Array of strings to filter out withf
 * @returns Array
 */
function filterArrayByArray(search, filter) {
  let parsedAtts = [];
  let keep = true;
  for (let key in search) {
    keep = true;
    if (search.hasOwnProperty(key)) {
      filter.every(bad => {
        if (key.includes(bad)) {
          keep = false;
          return false;
        }
        return true;
      });
    }
    if (keep) {
      parsedAtts[key] = "" + search[key];
    }
  }
  return parsedAtts;
}

/***/ },

/***/ "./src/components/OCButton.js"
/*!************************************!*\
  !*** ./src/components/OCButton.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const OCButton = ({
  show,
  css,
  text,
  text_acc
}) => {
  if (!show) return null;
  const classes = ["ocButton", css].join(" ");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
    type: "button",
    className: classes,
    children: [text_acc && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "screen-reader-text",
      children: text_acc
    }), text]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCButton);

/***/ },

/***/ "./src/components/OCButtonsBar.js"
/*!****************************************!*\
  !*** ./src/components/OCButtonsBar.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_OCButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/OCButton */ "./src/components/OCButton.js");
/* harmony import */ var _OCDatePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCDatePicker */ "./src/components/OCDatePicker.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Load components
 */



const OCButtonBar = ({
  atts
}) => {
  const {
    dp,
    ln,
    dl
  } = atts;
  const {
    text_prev,
    text_curr,
    text_next,
    text_prev_acc,
    text_curr_acc,
    text_next_acc,
    text_date,
    text_date_acc
  } = atts;
  const {
    text_week_prev,
    text_week_prev_acc,
    text_week_next,
    text_week_next_acc,
    text_language_acc
  } = atts;
  const {
    btn_today,
    btn_day,
    btn_week
  } = atts;
  const {
    btn_close,
    text_close,
    text_close_acc
  } = atts;
  const dpShow = !!dp;
  const showTodayBtn = !!btn_today;
  const showDayBtn = !!btn_day;
  const showWeekBtn = !!btn_week;
  const showLangBtn = ln?.length > 1;
  const showCloseBtn = !!btn_close;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "ocButtonsBar",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showWeekBtn,
      css: "week-previous",
      text: text_week_prev,
      text_acc: text_week_prev_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showDayBtn,
      css: "day-previous",
      text: text_prev,
      text_acc: text_prev_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showTodayBtn,
      css: "day-current",
      text: text_curr,
      text_acc: text_curr_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showDayBtn,
      css: "day-next",
      text: text_next,
      text_acc: text_next_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showWeekBtn,
      css: "week-next",
      text: text_week_next,
      text_acc: text_week_next_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_OCDatePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      show: dpShow,
      css: "day-picker",
      text: text_date,
      text_acc: text_date_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showLangBtn,
      css: "lang-toggle",
      text: dl,
      text_acc: text_language_acc
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_OCButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
      show: showCloseBtn,
      css: "ocBtnClose",
      text: text_close,
      text_acc: text_close_acc
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCButtonBar);

/***/ },

/***/ "./src/components/OCDatePicker.js"
/*!****************************************!*\
  !*** ./src/components/OCDatePicker.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OCIconCalendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCIconCalendar */ "./src/components/OCIconCalendar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Button Calendar icon
 */


const OCDatePicker = ({
  show,
  css,
  text,
  text_acc
}) => {
  if (!show) return null;
  const classes = ["ocButton", css].join(" ");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "date-picker-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      type: "button",
      className: classes,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_OCIconCalendar__WEBPACK_IMPORTED_MODULE_0__["default"], {
        title: text
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
      className: "ocDatePicker",
      "aria-label": text_acc,
      type: "date",
      hidden: true
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCDatePicker);

/***/ },

/***/ "./src/components/OCIconCalendar.js"
/*!******************************************!*\
  !*** ./src/components/OCIconCalendar.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const OCIconCalendar = ({
  title
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 32 32",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("title", {
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "currentColor",
      d: "M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCIconCalendar);

/***/ },

/***/ "./src/components/OCLoading.js"
/*!*************************************!*\
  !*** ./src/components/OCLoading.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const OCLoading = ({
  isLoading
}) => {
  if (!isLoading) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "ocContainer",
    children: _Statics__WEBPACK_IMPORTED_MODULE_0__.msgLoading
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCLoading);

/***/ },

/***/ "./src/components/OCMultiCheckboxComponent.js"
/*!****************************************************!*\
  !*** ./src/components/OCMultiCheckboxComponent.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const OCMulitChekboxes = ({
  options,
  values,
  onChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
    children: options.map(opt => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
        className: "check_items",
        label: opt.label,
        checked: values.includes(opt.value),
        onChange: check => {
          onChange(opt, check);
        }
      })
    }))
  });
};
const OCMultiCheckboxComponent = ({
  title,
  options,
  values,
  onChange
}) => {
  const [choices, setChoices] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(values);
  function mcOnChange(opt, check) {
    // copy values so that we are not directly mutating original to trigger render
    const newVals = choices.splice(0);
    check ? newVals.push(opt.value) : newVals.splice(newVals.indexOf(opt.value), 1);
    onChange(newVals);
    setChoices(newVals);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(OCMulitChekboxes, {
      options: options,
      values: choices,
      onChange: mcOnChange
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCMultiCheckboxComponent);

/***/ },

/***/ "./src/components/OCPopup.js"
/*!***********************************!*\
  !*** ./src/components/OCPopup.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
/* harmony import */ var _OCButtonsBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCButtonsBar */ "./src/components/OCButtonsBar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const OCPopup = ({
  displayBoxBtnAtts
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "display-box hidden fade-in ",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_OCButtonsBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      atts: displayBoxBtnAtts
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "display-box-loading",
      children: _Statics__WEBPACK_IMPORTED_MODULE_0__.msgLoading
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "display-box-content hidden fade-in"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCPopup);

/***/ },

/***/ "./src/orthodox-calendar-block/edit.js"
/*!*********************************************!*\
  !*** ./src/orthodox-calendar-block/edit.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_OCButtonsBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/OCButtonsBar */ "./src/components/OCButtonsBar.js");
/* harmony import */ var _components_OCPopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/OCPopup */ "./src/components/OCPopup.js");
/* harmony import */ var _components_OCMultiCheckboxComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/OCMultiCheckboxComponent */ "./src/components/OCMultiCheckboxComponent.js");
/* harmony import */ var _components_OCLoading_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/OCLoading.js */ "./src/components/OCLoading.js");
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor.scss */ "./src/orthodox-calendar-block/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */




/**
 * Load components
 */





/**
 * Static props
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


function getPathArgs(dt, hh, ll, tt, ss, li, ln) {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const yy = date.getFullYear();
  const sec_req = window?.oc_data?.sec_req ?? "";
  const args = "&month=" + mm + "&today=" + dd + "&year=" + yy + "&dt=" + dt + "&header=" + hh + "&lives=" + ll + "&trp=" + tt + "&scripture=" + ss + "&liveinfo=" + li + "&language=" + ln + "&sec_req=" + sec_req + "&editor=" + 1;
  return args;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} root0
 * @param {Array} root0.attributes
 * @param {Function} root0.setAttributes
 *
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: {
      containerClassName: _Statics__WEBPACK_IMPORTED_MODULE_8__.containerClassName
    }
  });
  const className = blockProps.className;
  const {
    dp,
    dt,
    hh,
    ll,
    ss,
    tt,
    ln,
    dl
  } = attributes;
  const {
    text_prev,
    text_curr,
    text_next,
    text_prev_acc,
    text_curr_acc,
    text_next_acc,
    text_date,
    text_date_acc
  } = attributes;
  const {
    text_week_prev,
    text_week_prev_acc,
    text_week_next,
    text_week_next_acc,
    text_language_acc
  } = attributes;
  const {
    btn_today,
    btn_day,
    btn_week
  } = attributes;
  const {
    text_close,
    text_close_acc
  } = attributes;
  const displayBoxBtnAtts = {
    'btn_close': true,
    'text_close': text_close,
    'text_close_acc': text_close_acc
  };
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [loadingContent, setLoadingContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
  const [info, setInfo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(_Statics__WEBPACK_IMPORTED_MODULE_8__.msgLoading);
  const [liveinfo, setLiveinfo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
  const multipleLanguages = ln.length > 1;
  function mcOnChange(value) {
    setAttributes({
      ln: value
    });
  }
  const parsedAtts = (0,_Statics__WEBPACK_IMPORTED_MODULE_8__.filterArrayByArray)(attributes, _Statics__WEBPACK_IMPORTED_MODULE_8__.badStrings);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setLoadingContent(true);
    const url = oc_data?.url_day ?? false;
    if (!url) {
      setError("Misconfiguration");
      return;
    }
    const lang = dl === ln ? dl : ln[0];
    const pathArgs = getPathArgs(dt, hh, ll, tt, ss, liveinfo, lang);
    const path = url + pathArgs;
    fetch(path, {
      method: "GET",
      credentials: "same-origin"
    }).then(response => response.json()).then(resp => {
      setInfo(resp.data);
    }).catch(err => {
      setError(err.message);
    }).finally(() => setLoadingContent(false));
  }, [dt, hh, ll, ss, tt, ln, dl, liveinfo]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Settings", "orthodox-calendar-block"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Edit with live info", "orthodox-calendar-block"),
          checked: liveinfo,
          onChange: li => setLiveinfo(li ? 1 : 0)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(MultiCheckboxComponent, {
          title: "Languages",
          options: _Statics__WEBPACK_IMPORTED_MODULE_8__.languages,
          values: ln,
          onChange: mcOnChange
        }), multipleLanguages && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Default Language", "orthodox-calendar-block"),
          value: dl,
          onChange: value => setAttributes({
            dl: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("The language to show when first loaded", "orthodox-calendar"),
          options: [{
            value: "en",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("English", "orthodox-calendar-block"),
            disabled: !ln.includes("en")
          }, {
            value: "ru",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Russian", "orthodox-calendar-block"),
            disabled: !ln.includes("ru")
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show today button", "orthodox-calendar-block"),
          checked: btn_today,
          onChange: value => setAttributes({
            btn_today: value ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show day button", "orthodox-calendar-block"),
          checked: btn_day,
          onChange: value => setAttributes({
            btn_day: value ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show week button", "orthodox-calendar-block"),
          checked: btn_week,
          onChange: value => setAttributes({
            btn_week: value ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show date picker", "orthodox-calendar-block"),
          checked: dp,
          onChange: datepick => setAttributes({
            dp: datepick ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show date", "orthodox-calendar-block"),
          checked: dt,
          onChange: sd => setAttributes({
            dt: sd ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show a heading before", "orthodox-calendar-block"),
          help: hh ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display header", "orthodox-calendar-block") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No header", "orthodox-calendar-block"),
          checked: hh,
          onChange: sh => setAttributes({
            hh: sh ? 1 : 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Lives of Saints", "orthodox-calendar-block"),
          value: ll,
          onChange: lives => setAttributes({
            ll: lives
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the lives of the saints", "orthodox-calendar"),
          options: [{
            value: 0,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthodox-calendar-block")
          }, {
            value: 1,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("all Saints in separate paragraphs", "orthodox-calendar-block")
          }, {
            value: 2,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("all Saints in one paragraph", "orthodox-calendar-block")
          }, {
            value: 3,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints in separate paragraphs", "orthodox-calendar-block")
          }, {
            value: 4,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints in one paragraph", "orthodox-calendar-block")
          }, {
            value: 5,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints and New Martyrs in separate paragraphs", "orthodox-calendar-block")
          }, {
            value: 6,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints and New Martyrs in one paragraph", "orthodox-calendar-block")
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Scripture Readings", "orthodox-calendar-block"),
          value: ss,
          onChange: scripts => setAttributes({
            ss: scripts
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the Scripture Readings", "orthodox-calendar"),
          options: [{
            value: 0,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthodox-calendar-block")
          }, {
            value: 1,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header", "orthodox-calendar-block")
          }, {
            value: 2,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header", "orthodox-calendar-block")
          }, {
            value: 3,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header and wtih verses", "orthodox-calendar-block")
          }, {
            value: 4,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header and with verses", "orthodox-calendar-block")
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Troparion", "orthodox-calendar-block"),
          value: tt,
          onChange: trpn => setAttributes({
            tt: trpn
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the Troparion", "orthodox-calendar-block"),
          options: [{
            value: 0,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthodox-calendar-block")
          }, {
            value: 1,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header", "orthodox-calendar-block")
          }, {
            value: 2,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header", "orthodox-calendar-block")
          }]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text", "orthodox-calendar-block"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Button Text", "orthodox-calendar-block"),
          value: text_prev,
          onChange: value => setAttributes({
            text_prev: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Button Accessibility Text", "orthodox-calendar-block"),
          value: text_prev_acc,
          onChange: value => setAttributes({
            text_prev_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Button Text", "orthodox-calendar-block"),
          value: text_curr,
          onChange: value => setAttributes({
            text_curr: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Button Accessibility Text", "orthodox-calendar-block"),
          value: text_curr_acc,
          onChange: value => setAttributes({
            text_curr_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Button Text", "orthodox-calendar-block"),
          value: text_next,
          onChange: value => setAttributes({
            text_next: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Button Accessibility Text", "orthodox-calendar-block"),
          value: text_next_acc,
          onChange: value => setAttributes({
            text_next_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Text", "orthodox-calendar-block"),
          value: text_date,
          onChange: value => setAttributes({
            text_date: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Text", "orthodox-calendar-block"),
          value: text_date,
          onChange: value => setAttributes({
            text_date: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Accessibility Text", "orthodox-calendar-block"),
          value: text_date_acc,
          onChange: value => setAttributes({
            text_date_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Week Button Text", "orthodox-calendar-block"),
          value: text_week_prev,
          onChange: value => setAttributes({
            text_week_prev: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Week Button Accessibility Text", "orthodox-calendar-block"),
          value: text_week_prev_acc,
          onChange: value => setAttributes({
            text_week_prev_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Week Button Text", "orthodox-calendar-block"),
          value: text_week_next,
          onChange: value => setAttributes({
            text_week_next: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Week Button Accessibility Text", "orthodox-calendar-block"),
          value: text_week_next_acc,
          onChange: value => setAttributes({
            text_week_next_acc: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Language Toggle Button Accessibility Text", "orthodox-calendar-block"),
          value: text_language_acc,
          onChange: value => setAttributes({
            text_language_acc: value
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      ...parsedAtts,
      className: className,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_OCButtonsBar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        atts: attributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "ocContainer",
        id: "ocContainer",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_OCLoading_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
          isLoading: loadingContent
        }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("There was an error loading calendar information.", "orthodox-calendar-block")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
            children: error
          })]
        }), !loadingPosts && !error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.RawHTML, {
          children: info
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_OCPopup__WEBPACK_IMPORTED_MODULE_5__["default"], {
        displayBoxBtnAtts: displayBoxBtnAtts
      })]
    })]
  });
}

/***/ },

/***/ "./src/orthodox-calendar-block/index.js"
/*!**********************************************!*\
  !*** ./src/orthodox-calendar-block/index.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/orthodox-calendar-block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/orthodox-calendar-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/orthodox-calendar-block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/orthodox-calendar-block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */





/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/orthodox-calendar-block/save.js"
/*!*********************************************!*\
  !*** ./src/orthodox-calendar-block/save.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_OCButtonsBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/OCButtonsBar */ "./src/components/OCButtonsBar.js");
/* harmony import */ var _components_OCPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/OCPopup */ "./src/components/OCPopup.js");
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Load components
 */



/**
 * Static props
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param 	{Object} 	root0
 * @param 	{Array} 	root0.attributes
 *
 * @return 	{Element} 	Element to render.
 */

function save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: {
      containerClassName: _Statics__WEBPACK_IMPORTED_MODULE_4__.containerClassName
    }
  });
  const className = blockProps?.className ?? "";
  const {
    text_close,
    text_close_acc
  } = attributes;
  const displayBoxBtnAtts = {
    'btn_close': true,
    'text_close': text_close,
    'text_close_acc': text_close_acc
  };
  const parsedAtts = (0,_Statics__WEBPACK_IMPORTED_MODULE_4__.filterArrayByArray)(attributes, _Statics__WEBPACK_IMPORTED_MODULE_4__.badStrings);
  parsedAtts.lang = parsedAtts.dl;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    ...parsedAtts,
    className: className,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_OCButtonsBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
      atts: attributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "ocContainer",
      children: _Statics__WEBPACK_IMPORTED_MODULE_4__.msgLoading
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_OCPopup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      displayBoxBtnAtts: displayBoxBtnAtts
    })]
  });
}

/***/ },

/***/ "./src/orthodox-calendar-block/editor.scss"
/*!*************************************************!*\
  !*** ./src/orthodox-calendar-block/editor.scss ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/orthodox-calendar-block/style.scss"
/*!************************************************!*\
  !*** ./src/orthodox-calendar-block/style.scss ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/orthodox-calendar-block/block.json"
/*!************************************************!*\
  !*** ./src/orthodox-calendar-block/block.json ***!
  \************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"orthodox-calendar-block/orthodox-calendar-block","version":"0.11.1","title":"Orthodox Calendar","category":"widgets","icon":"calendar-alt","description":"Displays the daily Orthodox Calendar information","example":{},"attributes":{"dp":{"type":"integer","default":0},"dt":{"type":"integer","default":1},"hh":{"type":"integer","default":1},"ll":{"type":"integer","default":3},"ss":{"type":"integer","default":1},"tt":{"type":"integer","default":1},"ln":{"type":"array","default":["en","ru"]},"dl":{"type":"string","default":"en"},"btn_language":{"type":"integer","default":"0"},"btn_today":{"type":"integer","default":"1"},"btn_day":{"type":"integer","default":"1"},"text_prev":{"type":"string","default":"❰"},"text_prev_acc":{"type":"string","default":"Previous Day"},"text_curr":{"type":"string","default":"⬤"},"text_curr_acc":{"type":"string","default":"Today"},"text_next":{"type":"string","default":"❱"},"text_next_acc":{"type":"string","default":"Next Day"},"text_date":{"type":"string","default":"Show Date Picker"},"text_date_acc":{"type":"string","default":"Pick Date"},"text_week_prev":{"type":"string","default":"❰❰"},"text_week_prev_acc":{"type":"string","default":"Previous Week"},"text_week_next":{"type":"string","default":"❱❱"},"text_week_next_acc":{"type":"string","default":"Previous Week"},"text_language":{"type":"string","default":"”"},"text_language_acc":{"type":"string","default":"Switch Language"},"text_close":{"type":"string","default":"X"},"text_close_acc":{"type":"string","default":"Close popup"}},"supports":{"color":{"text":true,"background":true},"interactivity":true},"textdomain":"orthodox-calendar-block","viewScript":"file:./view.js","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","styles":[{"name":"none","label":"None","isDefault":true},{"name":"blue","label":"Blue"},{"name":"grey","label":"Grey"},{"name":"red","label":"Red"}]}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"orthodox-calendar-block/index": 0,
/******/ 			"orthodox-calendar-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkorthodox_calendar_block"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["orthodox-calendar-block/style-index"], () => (__webpack_require__("./src/orthodox-calendar-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map