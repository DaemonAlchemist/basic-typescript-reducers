"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = exports.toggle = exports.basicReducers = void 0;
var redux_1 = require("redux");
var toggle_1 = require("./toggle/toggle");
Object.defineProperty(exports, "toggle", { enumerable: true, get: function () { return toggle_1.toggle; } });
var counter_1 = require("./counter/counter");
Object.defineProperty(exports, "counter", { enumerable: true, get: function () { return counter_1.counter; } });
exports.basicReducers = {
    basic: redux_1.combineReducers({
        toggle: toggle_1.toggleReducer,
        counter: counter_1.counterReducer,
    }),
};
