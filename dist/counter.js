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
exports.counterReducer = exports.counter = exports.COUNTER_DECREMENT = exports.COUNTER_INCREMENT = exports.COUNTER_RESET = void 0;
var ts_functional_1 = require("ts-functional");
//Action type definitions
exports.COUNTER_RESET = 'basic/counter/reset';
exports.COUNTER_INCREMENT = 'basic/counter/increment';
exports.COUNTER_DECREMENT = 'basic/counter/decrement';
//Action creators and selectors
exports.counter = {
    decrement: function (name, min) {
        if (min === void 0) { min = -9999999999999999; }
        return ({ type: exports.COUNTER_DECREMENT, name: name, min: min });
    },
    increment: function (name, max) {
        if (max === void 0) { max = 9999999999999999; }
        return ({ type: exports.COUNTER_INCREMENT, name: name, max: max });
    },
    reset: function (name, value) {
        if (value === void 0) { value = 0; }
        return ({ type: exports.COUNTER_RESET, name: name, value: value });
    },
    value: function (state, name) { var _a; return getValue(((_a = state === null || state === void 0 ? void 0 : state.basic) === null || _a === void 0 ? void 0 : _a.counter) || {}, name); },
};
var getValue = function (state, name) { return state[name] || 0; };
//Reducer
exports.counterReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    return ts_functional_1.switchOn(action.type, (_a = {},
        _a[exports.COUNTER_RESET] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = action.value || 0, _a)));
        },
        _a[exports.COUNTER_INCREMENT] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = getValue(state, action.name) + 1, _a)));
        },
        _a[exports.COUNTER_DECREMENT] = function () {
            var _a;
            return (__assign(__assign({}, state), (_a = {}, _a[action.name] = getValue(state, action.name) - 1, _a)));
        },
        _a.default = function () { return state; },
        _a)) || {};
};
