/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/wp.starter-npm.sp/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/front.js":
/*!*************************!*\
  !*** ./src/js/front.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

var starter = {
  init: function init() {},
  cf7: {
    init: function init() {
      this.addEventListeners();
    },
    reInit: function reInit() {
      if (typeof wpcf7 === 'undefined') {
        return;
      }

      jQuery('div.wpcf7 > form').each(function () {
        var $form = jQuery(this);
        wpcf7.initForm($form);

        if (wpcf7.cached) {
          wpcf7.refill($form);
        }
      });
    },
    addEventListeners: function addEventListeners() {
      this.eventsSubmit();
      this.eventsValidate();
    },
    eventsValidate: function eventsValidate() {
      jQuery('.wpcf7-form-control').on('input', function () {
        jQuery(this).removeClass('wpcf7-not-valid');
      });
    },
    eventsSubmit: function eventsSubmit() {
      jQuery('div.wpcf7').on('wpcf7beforesubmit', function (event) {
        var $form = jQuery('form', event.target);
        $form.addClass('sending');
      });
      jQuery('div.wpcf7').on('wpcf7submit', function (event) {
        var $form = jQuery('form', event.target);
        $form.removeClass('sending');
      });
      jQuery('div.wpcf7').on('wpcf7mailsent', function (event) {
        var message = event.detail.apiResponse.message;
        var $btn = jQuery('form input[type="submit"]', event.target);
        var val = $btn.val();
        var fs = $btn.css('font-size');
        $btn.css('font-size', '13px');
        $btn.val(message);
        setTimeout(function () {
          $btn.css('font-size', fs);
          $btn.val(val);
        }, 8000);
      });
    }
  }
};
jQuery(window).load(function () {
  starter.init();
});

/***/ }),

/***/ "./src/scss/admin.scss":
/*!*****************************!*\
  !*** ./src/scss/admin.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/scss/front.scss":
/*!*****************************!*\
  !*** ./src/scss/front.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./src/js/front.js ./src/scss/front.scss ./src/scss/admin.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/sergey/NetBeansProjects/ml.newtmp.sp/wp-content/themes/wp.starter-npm.sp/src/js/front.js */"./src/js/front.js");
__webpack_require__(/*! /home/sergey/NetBeansProjects/ml.newtmp.sp/wp-content/themes/wp.starter-npm.sp/src/scss/front.scss */"./src/scss/front.scss");
module.exports = __webpack_require__(/*! /home/sergey/NetBeansProjects/ml.newtmp.sp/wp-content/themes/wp.starter-npm.sp/src/scss/admin.scss */"./src/scss/admin.scss");


/***/ })

/******/ });
//# sourceMappingURL=front.js.map