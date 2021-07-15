"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFull = exports.toggleFull = exports.isFull = exports.exitFull = exports.beFull = void 0;
var DOC_ELMENT = document.documentElement;
var FFS_METHOD_NAME = "requestFullscreen";
var EFS_METHOD_NAME = "exitFullscreen";
var FSE_PROP_NAME = "fullscreenElement";
var ON_FSC_PROP_NAME = "onfullscreenchange";
if ('webkitRequestFullScreen' in DOC_ELMENT) {
    FFS_METHOD_NAME = "webkitRequestFullScreen";
    EFS_METHOD_NAME = "webkitExitFullscreen";
    FSE_PROP_NAME = "webkitFullscreenElement";
    ON_FSC_PROP_NAME = "onwebkitfullscreenchange";
}
else if ('mozRequestFullScreen' in DOC_ELMENT) {
    FFS_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_PROP_NAME = 'mozFullScreenElement';
    ON_FSC_PROP_NAME = 'onmozfullscreenchange';
}
else if ("msRequestFullscreen" in DOC_ELMENT) {
    FFS_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_PROP_NAME = 'msFullscreenElement';
    ON_FSC_PROP_NAME = 'MSFullscreenChange';
}
else if (!DOC_ELMENT.requestFullscreen) {
    throw "当前浏览器不支持(Fullscreen)全屏api";
}
function beFull(el, options) {
    if (el === void 0) { el = DOC_ELMENT; }
    return el[FFS_METHOD_NAME](options);
}
exports.beFull = beFull;
function exitFull() {
    return document[EFS_METHOD_NAME]();
}
exports.exitFull = exitFull;
function isFull(el) {
    return el === document[FSE_PROP_NAME];
}
exports.isFull = isFull;
function toggleFull(el, options) {
    if (el === void 0) { el = DOC_ELMENT; }
    if (isFull(el)) {
        return exitFull();
    }
    else {
        return beFull(el, options);
    }
}
exports.toggleFull = toggleFull;
function watchFull(el, callback) {
    var cancel = function () {
        el.onfullscreenchange = null;
    };
    var handler = function (event) {
        if (null !== event.target) {
            callback(isFull(event.target));
        }
    };
    el[ON_FSC_PROP_NAME] = handler;
    return {
        cancel: cancel
    };
}
exports.watchFull = watchFull;
//# sourceMappingURL=main.js.map