import { counter } from './counter';
import { set, sets } from "./set";
import { toggle } from './toggle';
export declare const basicReducers: {
    basic: import("redux").Reducer<import("redux").CombinedState<{
        toggle: import("./toggle").IToggleState;
        counter: {
            [x: string]: number;
        };
    }>, import("./counter").ICounterAction | import("./toggle").IToggleAction>;
};
export { toggle, counter, set, sets };
