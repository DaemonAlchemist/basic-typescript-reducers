import { combineReducers } from 'redux';
import { counter, counterReducer } from './counter';
import { set, sets } from "./set";
import { toggle, toggleReducer } from './toggle';

export const basicReducers = {
    basic: combineReducers({
        toggle: toggleReducer,
        counter: counterReducer,
    }),
};

export { toggle, counter, set, sets };

