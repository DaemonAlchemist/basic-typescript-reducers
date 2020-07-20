"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sets = exports.set = exports.counter = exports.toggle = exports.basicReducers = void 0;
var redux_1 = require("redux");
var counter_1 = require("./counter");
Object.defineProperty(exports, "counter", { enumerable: true, get: function () { return counter_1.counter; } });
var set_1 = require("./set");
Object.defineProperty(exports, "set", { enumerable: true, get: function () { return set_1.set; } });
Object.defineProperty(exports, "sets", { enumerable: true, get: function () { return set_1.sets; } });
var toggle_1 = require("./toggle");
Object.defineProperty(exports, "toggle", { enumerable: true, get: function () { return toggle_1.toggle; } });
exports.basicReducers = {
    basic: redux_1.combineReducers({
        toggle: toggle_1.toggleReducer,
        counter: counter_1.counterReducer,
    }),
};
