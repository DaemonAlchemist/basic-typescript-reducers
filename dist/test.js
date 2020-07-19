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
var redux_1 = require("redux");
var index_1 = require("./index");
var reducer = redux_1.combineReducers(__assign({}, index_1.basicReducers));
var init = {
    basic: {
        toggle: {},
        counter: {},
    },
};
describe('basic-typescript-reducers', function () {
    describe('toggle', function () {
        it('should provide a default value of false', function () {
            expect(index_1.toggle.isVisible({}, 'test')).toEqual(false);
        });
        it('should provide a specified default value', function () {
            expect(index_1.toggle.isVisible({}, 'test', true)).toEqual(true);
        });
        it('should show a toggle', function () {
            var state = [
                index_1.toggle.show('test'),
            ].reduce(reducer, init);
            expect(index_1.toggle.isVisible(state, 'test')).toEqual(true);
        });
        it('should hide a toggle', function () {
            var state = [
                index_1.toggle.show('test'),
                index_1.toggle.hide('test'),
            ].reduce(reducer, init);
            expect(index_1.toggle.isVisible(state, 'test')).toEqual(false);
        });
        it('should toggle a toggle', function () {
            var state = [
                index_1.toggle.show('test'),
                index_1.toggle.toggle('test'),
            ].reduce(reducer, init);
            expect(index_1.toggle.isVisible(state, 'test')).toEqual(false);
        });
        it('should toggle an unset toggle', function () {
            var state = [
                index_1.toggle.toggle('test'),
            ].reduce(reducer, init);
            expect(index_1.toggle.isVisible(state, 'test')).toEqual(true);
        });
        it('should not affect other toggles', function () {
            var state = [
                index_1.toggle.show('test1'),
                index_1.toggle.hide('test2'),
                index_1.toggle.toggle('test3'),
            ].reduce(reducer, init);
            expect(index_1.toggle.isVisible(state, 'test1')).toEqual(true);
            expect(index_1.toggle.isVisible(state, 'test2')).toEqual(false);
            expect(index_1.toggle.isVisible(state, 'test3')).toEqual(true);
        });
    });
    describe('counter', function () {
        it('should default to zero', function () {
            expect(index_1.counter.value(init, 'test')).toEqual(0);
        });
        it('should increment a new value to 1', function () {
            var state = [
                index_1.counter.increment('test'),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test')).toEqual(1);
        });
        it('should decrement a new value to -1', function () {
            var state = [
                index_1.counter.decrement('test'),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test')).toEqual(-1);
        });
        it('should record all changes', function () {
            var state = [
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.decrement('test'),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test')).toEqual(2);
        });
        it('should reset a counter', function () {
            var state = [
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.decrement('test'),
                index_1.counter.reset('test'),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test')).toEqual(0);
        });
        it('should reset a counter to a specified value', function () {
            var state = [
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.increment('test'),
                index_1.counter.decrement('test'),
                index_1.counter.reset('test', 123),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test')).toEqual(123);
        });
        it('should not affect other counters', function () {
            var state = [
                index_1.counter.increment('test1'),
                index_1.counter.increment('test2'),
                index_1.counter.increment('test2'),
                index_1.counter.decrement('test3'),
                index_1.counter.reset('test4', 123),
            ].reduce(reducer, init);
            expect(index_1.counter.value(state, 'test1')).toEqual(1);
            expect(index_1.counter.value(state, 'test2')).toEqual(2);
            expect(index_1.counter.value(state, 'test3')).toEqual(-1);
            expect(index_1.counter.value(state, 'test4')).toEqual(123);
        });
    });
});
