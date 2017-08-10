(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["laughingMan"] = factory();
	else
		root["laughingMan"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function setOverlayStyle(overlay) {
  overlay.style.transition = 'all 0.5s'
  overlay.style.display = 'none'
  overlay.style.position = 'absolute'
  overlay.style.zIndex = '1'
}

function createCanvas(video) {
  canvas = document.createElement('canvas')
  const videoCompStyle = window.getComputedStyle(video)
  canvas.width = videoCompStyle.width.replace('px', '')
  canvas.height = videoCompStyle.height.replace('px', '')
  canvas.style.display = 'none'
  document.querySelector('body').appendChild(canvas)

  return canvas
}

function hideOverlay(overlay) {
  return setTimeout(() => {
    overlay.style.display = 'none'
  }, 500)
}

function createDrawFunction() {
  const faceDetector = new FaceDetector({ maxDetectedFaces: 1 })
  let isDetectingFaces = false
  let faces = []
  let hideTimeout

  return async function draw(canvas, video, overlay) {
    window.requestAnimationFrame(() => draw(canvas, video, overlay))
    const context = canvas.getContext('2d')
    const videoCompStyle = getComputedStyle(video)
    const videoWidth = videoCompStyle.width.replace('px', '')
    const videoHeight = videoCompStyle.height.replace('px', '')
    context.drawImage(video, 0, 0, videoWidth, videoHeight)

    clearTimeout(hideTimeout)
    if (faces.length) {
      const face = faces[0].boundingBox
      overlay.style.display = 'block'
      overlay.style.left = `${face.left - (face.width * 0.5)}px`
      overlay.style.top = `${face.top - (face.height * 0.75)}px`
      overlay.style.width = `${face.width * 2}px`
      overlay.style.height = `${face.height * 2}px`
    } else {
      hideTimeout = hideOverlay(overlay)
    }

    if (isDetectingFaces) return

    isDetectingFaces = true
    faces = await faceDetector.detect(canvas)
    isDetectingFaces = false
  }
}

//
// API
//

module.exports = (video, opts) => {
  const canvas = createCanvas(video)
  setOverlayStyle(opts.overlay)

  const draw = createDrawFunction()
  draw(canvas, video, opts.overlay)
}


/***/ })
/******/ ]);
});