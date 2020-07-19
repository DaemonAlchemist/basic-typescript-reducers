import { toggle } from './toggle';
import { counter } from './counter';
export declare const basicReducers: {
    basic: import("redux").Reducer<import("redux").CombinedState<{
        toggle: import("./toggle").IToggleState;
        counter: {
            [x: string]: number;
        };
    }>, import("./counter").ICounterAction | import("./toggle").IToggleAction>;
};
export { toggle, counter };
