import {switchOn} from 'ts-functional';
import {ICounterAction, ICounterState, ICounterStateContainer} from "./counter.d";

//Action type definitions
export const COUNTER_RESET      = 'basic/counter/reset';
export const COUNTER_INCREMENT  = 'basic/counter/increment';
export const COUNTER_DECREMENT  = 'basic/counter/decrement';

//Action creators and selectors
export const counter = {
    decrement: (name:string, min:number = -9999999999999999):ICounterAction => ({type: COUNTER_DECREMENT, name, min}),
    increment: (name:string, max:number = 9999999999999999):ICounterAction => ({type: COUNTER_INCREMENT, name, max}),
    reset: (name:string, value = 0):ICounterAction => ({type: COUNTER_RESET, name, value}),
    value: (state:ICounterStateContainer, name:string):number => state.basic.counter[name] || 0,
};

const getValue = (state:ICounterState, name:string) => state[name] || 0;

//Reducer
export const counterReducer = (state:ICounterState = {}, action:ICounterAction) => ({
    ...state,
    [name]: switchOn(action.type, {
        [COUNTER_INCREMENT]: () => getValue(state, name) + 1,
        [COUNTER_DECREMENT]: () => getValue(state, name) - 1,
        [COUNTER_RESET]: () => action.value || 0,
        default: () => getValue(state, name),
    }) || 0,
})
