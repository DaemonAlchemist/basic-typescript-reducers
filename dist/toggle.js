"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleReducer = exports.toggle = exports.TOGGLE_TOGGLE = exports.TOGGLE_HIDE = exports.TOGGLE_SHOW = void 0;
var ts_functional_1 = require("ts-functional");
exports.TOGGLE_SHOW = 'basic/toggle/show';
exports.TOGGLE_HIDE = 'basic/toggle/hide';
exports.TOGGLE_TOGGLE = 'basic/toggle/toggle';
//Action creators and selectors
exports.toggle = {
    hide: function (name) { return ({ type: exports.TOGGLE_HIDE, name: name }); },
    isVisible: function (state, name, defaultState) {
        var _a;
        if (defaultState === void 0) { defaultState = false; }
        return isVisible(((_a = state === null || state === void 0 ? void 0 : state.basic) === null || _a === void 0 ? void 0 : _a.toggle) || {}, name, defaultState);
    },
    show: function (name) { return ({ type: exports.TOGGLE_SHOW, name: name }); },
    toggle: function (name, defaultState) {
        if (defaultState === void 0) { defaultState = false; }
        return ({ type: exports.TOGGLE_TOGGLE, name: name, defaultState: defaultState });
    },
};
var isVisible = function (state, name, defaultState) {
    if (defaultState === void 0) { defaultState = false; }
    return state && typeof state[name] !== 'undefined'
        ? state[name]
        : defaultState;
};
//Reducer
exports.toggleReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    return ts_functional_1.switchOn(action.type, (_a = {},
        _a[exports.TOGGLE_SHOW] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = true, _a)));
        },
        _a[exports.TOGGLE_HIDE] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = false, _a)));
        },
        _a[exports.TOGGLE_TOGGLE] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = !isVisible(state, action.name), _a)));
        },
        _a.default = function () { return state; },
        _a)) || {};
};
