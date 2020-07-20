import { combineReducers } from 'redux';
import { basicReducers, counter, set, toggle } from './index';
import { sets } from "./set";

const numberSet = set<number>("numberSet");
const stringSet = set<string>("stringSet");

const reducer = combineReducers({
    ...basicReducers,
    ...sets(numberSet, stringSet),
});

const init = {
    basic: {
        toggle: {},
        counter: {},
    },
    sets: {
        numberSet: undefined,
        stringSet: undefined,
    },
};

describe('basic-typescript-reducers', () => {
    describe('toggle', () => {
        it('should provide a default value of false', () => {
            expect(toggle.isVisible({}, 'test')).toEqual(false);
        });
        it('should provide a specified default value', () => {
            expect(toggle.isVisible({}, 'test', true)).toEqual(true);
        });
        it('should show a toggle', () => {
            const state = [
                toggle.show('test'),
            ].reduce(reducer, init);

            expect(toggle.isVisible(state, 'test')).toEqual(true);
        });
        it('should hide a toggle', () => {
            const state = [
                toggle.show('test'),
                toggle.hide('test'),
            ].reduce(reducer, init);

            expect(toggle.isVisible(state, 'test')).toEqual(false);
        });
        it('should toggle a toggle', () => {
            const state = [
                toggle.show('test'),
                toggle.toggle('test'),
            ].reduce(reducer, init);

            expect(toggle.isVisible(state, 'test')).toEqual(false);
        });
        it('should toggle an unset toggle', () => {
            const state = [
                toggle.toggle('test'),
            ].reduce(reducer, init);

            expect(toggle.isVisible(state, 'test')).toEqual(true);
        });
        it('should not affect other toggles', () => {
            const state = [
                toggle.show('test1'),
                toggle.hide('test2'),
                toggle.toggle('test3'),
            ].reduce(reducer, init);

            expect(toggle.isVisible(state, 'test1')).toEqual(true);
            expect(toggle.isVisible(state, 'test2')).toEqual(false);
            expect(toggle.isVisible(state, 'test3')).toEqual(true);
        });
    });
    describe('counter', () => {
        it('should default to zero', () => {
            expect(counter.value(init, 'test')).toEqual(0);
        });
        it('should increment a new value to 1', () => {
            const state = [
                counter.increment('test'),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test')).toEqual(1);
        });
        it('should decrement a new value to -1', () => {
            const state = [
                counter.decrement('test'),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test')).toEqual(-1);
        });
        it('should record all changes', () => {
            const state = [
                counter.increment('test'),
                counter.increment('test'),
                counter.increment('test'),
                counter.decrement('test'),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test')).toEqual(2);
        });
        it('should reset a counter', () => {
            const state = [
                counter.increment('test'),
                counter.increment('test'),
                counter.increment('test'),
                counter.decrement('test'),
                counter.reset('test'),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test')).toEqual(0);
        });
        it('should reset a counter to a specified value', () => {
            const state = [
                counter.increment('test'),
                counter.increment('test'),
                counter.increment('test'),
                counter.decrement('test'),
                counter.reset('test', 123),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test')).toEqual(123);
        });
        it('should not affect other counters', () => {
            const state = [
                counter.increment('test1'),
                counter.increment('test2'),
                counter.increment('test2'),
                counter.decrement('test3'),
                counter.reset('test4', 123),
            ].reduce(reducer, init);

            expect(counter.value(state, 'test1')).toEqual(1);
            expect(counter.value(state, 'test2')).toEqual(2);
            expect(counter.value(state, 'test3')).toEqual(-1);
            expect(counter.value(state, 'test4')).toEqual(123);
        });
    });
    describe('set', () => {
        it('should produce an empty array for non-existent sets', () => {
            expect(numberSet.values(init)).toEqual([]);
        });
        it('should add members to a set', () => {
            const state = [
                numberSet.add(1),
                numberSet.add(2),
                numberSet.add(3),
                numberSet.add(1),
            ].reduce(reducer, init);

            const numbers:number[] = numberSet.values(state);
            expect(numbers.length).toEqual(3);
            expect(numbers.includes(1)).toBeTruthy();
            expect(numbers.includes(2)).toBeTruthy();
            expect(numbers.includes(3)).toBeTruthy();
        });
        it('should remove members to a set', () => {
            const state = [
                numberSet.add(1),
                numberSet.add(2),
                numberSet.add(3),
                numberSet.remove(1),
            ].reduce(reducer, init);

            const numbers:number[] = numberSet.values(state);
            expect(numbers.length).toEqual(2);
            expect(numbers.includes(1)).toBeFalsy();
            expect(numbers.includes(2)).toBeTruthy();
            expect(numbers.includes(3)).toBeTruthy();
        });
        it('should not affect other sets', () => {
            const state = [
                numberSet.add(1),
                numberSet.add(2),
                stringSet.add("test"),
                stringSet.add("test2"),
            ].reduce(reducer, init);

            const numbers:number[] = numberSet.values(state);
            const strings:string[] = stringSet.values(state);
            expect(numbers.length).toEqual(2);
            expect(strings.length).toEqual(2);
            expect(numbers.includes(1)).toBeTruthy();
            expect(numbers.includes(2)).toBeTruthy();
            expect(strings.includes("test")).toBeTruthy();
            expect(strings.includes("test2")).toBeTruthy();
        });
    })
});
