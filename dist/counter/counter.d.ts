import { ICounterAction, ICounterState, ICounterStateContainer } from "./counter.d";
export declare const COUNTER_RESET = "basic/counter/reset";
export declare const COUNTER_INCREMENT = "basic/counter/increment";
export declare const COUNTER_DECREMENT = "basic/counter/decrement";
export declare const counter: {
    decrement: (name: string, min?: number) => ICounterAction;
    increment: (name: string, max?: number) => ICounterAction;
    reset: (name: string, value?: number) => ICounterAction;
    value: (state: ICounterStateContainer | undefined, name: string) => number;
};
export declare const counterReducer: (state: ICounterState | undefined, action: ICounterAction) => {
    [x: string]: number;
};
