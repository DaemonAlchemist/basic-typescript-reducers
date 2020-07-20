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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sets = exports.set = exports.SET_CLEAR = exports.SET_REMOVE = exports.SET_ADD = void 0;
var redux_1 = require("redux");
var ts_functional_1 = require("ts-functional");
exports.SET_ADD = 'basic/set/add';
exports.SET_REMOVE = 'basic/set/remove';
exports.SET_CLEAR = 'basic/set/clear';
var createEmptySet = function () { return new Set(); };
var values = function (set) { return Array.from(set || createEmptySet()); };
exports.set = function (base) {
    var _a;
    return ({
        add: function (value) { return ({ type: exports.SET_ADD, value: value, base: base }); },
        remove: function (value) { return ({ type: exports.SET_REMOVE, value: value, base: base }); },
        clear: function () { return ({ type: exports.SET_CLEAR, base: base }); },
        values: function (state) { return Array.from(state.sets[base] || createEmptySet()); },
        reducer: (_a = {},
            _a[base] = function (state, action) {
                var _a;
                return base !== action.base
                    ? (state || createEmptySet())
                    : ts_functional_1.switchOn(action.type, (_a = {},
                        _a[exports.SET_ADD] = function () { return state ? new Set(__spreadArrays(values(state), [action.value])) : new Set([action.value]); },
                        _a[exports.SET_REMOVE] = function () { return state ? new Set(values(state).filter(function (a) { return a !== action.value; })) : createEmptySet(); },
                        _a[exports.SET_CLEAR] = function () { return createEmptySet(); },
                        _a.default = function () { return state; },
                        _a)) || createEmptySet();
            },
            _a),
    });
};
exports.sets = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return ({
        sets: redux_1.combineReducers(args.reduce(function (combined, arg) { return (__assign(__assign({}, combined), arg.reducer)); }, {})),
    });
};
