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
    value: (state:ICounterStateContainer | undefined, name:string):number => getValue(state?.basic?.counter || {}, name),
};

const getValue = (state:ICounterState, name:string) => state[name] || 0;

//Reducer
export const counterReducer = (state:ICounterState = {}, action:ICounterAction) => switchOn(action.type, {
    [COUNTER_RESET]: () => ({
        ...state,
        [action.name]: action.value || 0,
    }),
    [COUNTER_INCREMENT]: () => ({
        ...state,
        [action.name]: getValue(state, action.name) + 1,
    }),
    [COUNTER_DECREMENT]: () => ({
        ...state,
        [action.name]: getValue(state, action.name) - 1,
    }),
    default: () => state,
}) || {};
