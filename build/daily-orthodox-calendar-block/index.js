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
/* harmony export */   blockicon: () => (/* binding */ blockicon),
/* harmony export */   filterArrayByArray: () => (/* binding */ filterArrayByArray),
/* harmony export */   languages: () => (/* binding */ languages),
/* harmony export */   msgLoading: () => (/* binding */ msgLoading)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


// supported languages

const languages = [{
  "label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("English", "orthores"),
  "value": "en"
}, {
  "label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Russian", "orthores"),
  "value": "ru"
}];

// loading message
const msgLoading = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Loading...", "orthores");

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
const blockicon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
  width: "1em",
  height: "1em",
  version: "1.1",
  viewBox: "0 0 32 32",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("title", {
    children: "Orthodox  Cross Calendar"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "m9 4v1h-4v22h22v-22h-4v-1h-2v1h-10v-1zm-2 3h2v1h2v-1h10v1h2v-1h2v2h-18zm0 4h18v14h-18z",
    fill: "currentColor"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "m20.424 17.973v-1.4468h-3.7269v-1.447h1.065v-1.4468h-1.065v-1.4468h-1.4198v1.4468h-1.0646v1.4468h1.0646v1.447h-3.7269v1.4468h3.7269v2.592l-1.4196-0.60282v1.4468l1.4196 0.60282v1.7481h1.4198v-1.1453l1.42 0.60282v-1.4468l-1.42-0.60282v-3.1949z"
  })]
});

/***/ },

/***/ "./src/components/OCInspectorControls.js"
/*!***********************************************!*\
  !*** ./src/components/OCInspectorControls.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_OCMultiCheckboxComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/OCMultiCheckboxComponent */ "./src/components/OCMultiCheckboxComponent.js");
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */





/**
 * Static props
 */


const OCInspectorControls = ({
  props
}) => {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    dp,
    dt,
    hh,
    ll,
    ss,
    tt,
    ln,
    dl,
    li
  } = attributes;
  const {
    text_prev,
    text_curr,
    text_next,
    text_prev_acc,
    text_curr_acc,
    text_next_acc,
    text_date,
    text_date_acc,
    text_language_acc
  } = attributes;
  const {
    btn_today,
    btn_day
  } = attributes;
  const {
    text_close,
    text_close_acc
  } = attributes;
  const multipleLanguages = ln.length > 1;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Settings", "orthores"),
      initialOpen: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Edit with live info", "orthores"),
        checked: li,
        onChange: value => setAttributes({
          li: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_OCMultiCheckboxComponent__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: "Languages",
        options: _Statics__WEBPACK_IMPORTED_MODULE_4__.languages,
        values: ln,
        onChange: value => setAttributes({
          ln: value
        })
      }), multipleLanguages && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Default Language", "orthores"),
        value: dl,
        onChange: value => setAttributes({
          dl: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("The language to show when first loaded", "orthodox-calendar"),
        options: [{
          value: "en",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("English", "orthores"),
          disabled: !ln.includes("en")
        }, {
          value: "ru",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Russian", "orthores"),
          disabled: !ln.includes("ru")
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
        children: "Control Buttons"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show today button", "orthores"),
        checked: btn_today,
        onChange: value => setAttributes({
          btn_today: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show day button", "orthores"),
        checked: btn_day,
        onChange: value => setAttributes({
          btn_day: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show date picker", "orthores"),
        checked: dp,
        onChange: datepick => setAttributes({
          dp: datepick ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show date", "orthores"),
        checked: dt,
        onChange: value => setAttributes({
          dt: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show a heading before", "orthores"),
        help: hh ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display header", "orthores") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No header", "orthores"),
        checked: hh,
        onChange: value => setAttributes({
          hh: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
        children: "Content options"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Lives of Saints", "orthores"),
        value: ll,
        onChange: value => setAttributes({
          ll: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the lives of the saints", "orthodox-calendar"),
        options: [{
          value: 0,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthores")
        }, {
          value: 1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("all Saints in separate paragraphs", "orthocalbl")
        }, {
          value: 2,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("all Saints in one paragraph", "orthocalbl")
        }, {
          value: 3,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints in separate paragraphs", "orthocalbl")
        }, {
          value: 4,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints in one paragraph", "orthocalbl")
        }, {
          value: 5,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints and New Martyrs in separate paragraphs", "orthocalbl")
        }, {
          value: 6,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("major Saints and New Martyrs in one paragraph", "orthocalbl")
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Scripture Readings", "orthores"),
        value: ss,
        onChange: value => setAttributes({
          ss: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the Scripture Readings", "orthodox-calendar"),
        options: [{
          value: 0,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthores")
        }, {
          value: 1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header", "orthores")
        }, {
          value: 2,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header", "orthores")
        }, {
          value: 3,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header and wtih verses", "orthocalbl")
        }, {
          value: 4,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header and with verses", "orthocalbl")
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Troparion", "orthores"),
        value: tt,
        onChange: value => setAttributes({
          tt: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to display the Troparion", "orthores"),
        options: [{
          value: 0,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do not display", "orthores")
        }, {
          value: 1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display with header", "orthores")
        }, {
          value: 2,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("display without header", "orthores")
        }]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text", "orthores"),
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Button Text", "orthores"),
        value: text_prev,
        onChange: value => setAttributes({
          text_prev: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous Button Accessibility Text", "orthocalbl"),
        value: text_prev_acc,
        onChange: value => setAttributes({
          text_prev_acc: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Button Text", "orthores"),
        value: text_curr,
        onChange: value => setAttributes({
          text_curr: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Button Accessibility Text", "orthocalbl"),
        value: text_curr_acc,
        onChange: value => setAttributes({
          text_curr_acc: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Button Text", "orthores"),
        value: text_next,
        onChange: value => setAttributes({
          text_next: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Button Accessibility Text", "orthocalbl"),
        value: text_next_acc,
        onChange: value => setAttributes({
          text_next_acc: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Text", "orthores"),
        value: text_date,
        onChange: value => setAttributes({
          text_date: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Text", "orthores"),
        value: text_date,
        onChange: value => setAttributes({
          text_date: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date Picker Accessibility Text", "orthocalbl"),
        value: text_date_acc,
        onChange: value => setAttributes({
          text_date_acc: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Language Toggle Button Accessibility Text", "orthocalbl"),
        value: text_language_acc,
        onChange: value => setAttributes({
          text_language_acc: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Close Button Accessibility Text", "orthocalbl"),
        value: text_close,
        onChange: value => setAttributes({
          text_close: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Close Button Accessibility Text", "orthocalbl"),
        value: text_close_acc,
        onChange: value => setAttributes({
          text_close_acc: value
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OCInspectorControls);

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

/***/ "./src/daily-orthodox-calendar-block/edit.js"
/*!***************************************************!*\
  !*** ./src/daily-orthodox-calendar-block/edit.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/daily-orthodox-calendar-block/block.json");
/* harmony import */ var _components_OCInspectorControls_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/OCInspectorControls.js */ "./src/components/OCInspectorControls.js");
/* harmony import */ var _Statics_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Statics.js */ "./src/Statics.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/daily-orthodox-calendar-block/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
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




// import { store, getContext, getConfig } from '@wordpress/interactivity';




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
  const ocicProps = {
    'attributes': attributes,
    'useState': _wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState,
    'setAttributes': setAttributes
  };
  let parsedAtts = (0,_Statics_js__WEBPACK_IMPORTED_MODULE_7__.filterArrayByArray)(attributes, []);
  parsedAtts['editor'] = 1;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_OCInspectorControls_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
      props: ocicProps
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Disabled, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default()), {
          block: _block_json__WEBPACK_IMPORTED_MODULE_5__.name,
          skipBlockSupportAttributes: true,
          attributes: parsedAtts
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/daily-orthodox-calendar-block/index.js"
/*!****************************************************!*\
  !*** ./src/daily-orthodox-calendar-block/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/daily-orthodox-calendar-block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/daily-orthodox-calendar-block/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/daily-orthodox-calendar-block/block.json");
/* harmony import */ var _Statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Statics */ "./src/Statics.js");
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  icon: _Statics__WEBPACK_IMPORTED_MODULE_4__.blockicon,
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * Using render.php for all output
   */
  save: () => {
    return null;
  }
});

/***/ },

/***/ "./src/daily-orthodox-calendar-block/editor.scss"
/*!*******************************************************!*\
  !*** ./src/daily-orthodox-calendar-block/editor.scss ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/daily-orthodox-calendar-block/style.scss"
/*!******************************************************!*\
  !*** ./src/daily-orthodox-calendar-block/style.scss ***!
  \******************************************************/
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

/***/ "@wordpress/server-side-render"
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
(module) {

module.exports = window["wp"]["serverSideRender"];

/***/ },

/***/ "./src/daily-orthodox-calendar-block/block.json"
/*!******************************************************!*\
  !*** ./src/daily-orthodox-calendar-block/block.json ***!
  \******************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"orthodox-resources/daily-calendar","version":"1.0.0","title":"Daily Orthodox Calendar","category":"widgets","icon":"calendar-alt","description":"Displays the daily Orthodox Calendar information from https://www.holytrinityorthodox.com/calendar","example":{},"attributes":{"dp":{"type":"integer","default":0},"dt":{"type":"integer","default":1},"hh":{"type":"integer","default":1},"ll":{"type":"integer","default":3},"ss":{"type":"integer","default":1},"tt":{"type":"integer","default":1},"ln":{"type":"array","default":["en","ru"]},"dl":{"type":"string","default":"en"},"lang":{"type":"string","default":"en"},"li":{"type":"integer","default":0},"btn_language":{"type":"integer","default":"0"},"btn_today":{"type":"integer","default":"1"},"btn_day":{"type":"integer","default":"1"},"text_prev":{"type":"string","default":"❰"},"text_prev_acc":{"type":"string","default":"Previous Day"},"text_curr":{"type":"string","default":"⬤"},"text_curr_acc":{"type":"string","default":"Today"},"text_next":{"type":"string","default":"❱"},"text_next_acc":{"type":"string","default":"Next Day"},"text_date":{"type":"string","default":"Show Date Picker"},"text_date_acc":{"type":"string","default":"Pick Date"},"text_language":{"type":"string","default":"”"},"text_language_acc":{"type":"string","default":"Switch Language"},"text_close":{"type":"string","default":"X"},"text_close_acc":{"type":"string","default":"Close popup"}},"supports":{"html":false,"spacing":{"margin":true,"padding":true,"blockGap":true},"color":{"background":true,"text":true,"gradients":false},"typography":{"fontSize":true,"lineHeight":false},"interactivity":true},"textdomain":"orthores","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js","styles":[{"name":"none","label":"None","isDefault":true},{"name":"blue","label":"Blue"},{"name":"grey","label":"Grey"},{"name":"red","label":"Red"}]}');

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
/******/ 			"daily-orthodox-calendar-block/index": 0,
/******/ 			"daily-orthodox-calendar-block/style-index": 0
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
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkorthodox_resources_daily_calendar"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["daily-orthodox-calendar-block/style-index"], () => (__webpack_require__("./src/daily-orthodox-calendar-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map