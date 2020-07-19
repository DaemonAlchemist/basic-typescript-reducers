import { toggle } from './toggle/toggle';
import { counter } from './counter/counter';
export declare const basicReducers: {
    basic: import("redux").Reducer<import("redux").CombinedState<{
        toggle: import("./toggle/toggle").IToggleState;
        counter: {
            [x: string]: number;
        };
    }>, import("./toggle/toggle").IToggleAction | import("./counter/counter").ICounterAction>;
};
export { toggle, counter };
