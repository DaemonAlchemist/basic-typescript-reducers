import { Reducer } from "redux";
export declare const SET_ADD = "basic/set/add";
export declare const SET_REMOVE = "basic/set/remove";
export declare const SET_CLEAR = "basic/set/clear";
export declare interface ISetState<T> {
    sets: {
        [id: string]: Set<T> | undefined;
    };
}
export declare interface ISetAction<T> {
    type: string;
    base: string;
    value: T;
}
export declare interface ISetClearAction {
    type: string;
    base: string;
}
export declare interface ISetDef<T> {
    add: (value: T) => ISetAction<T>;
    remove: (value: T) => ISetAction<T>;
    clear: () => ISetClearAction;
    values: (state: ISetState<T>) => T[];
    reducer: {
        [base: string]: (State: Set<T> | undefined, action: ISetAction<T>) => Set<T>;
    };
}
export declare const set: <T>(base: string) => ISetDef<T>;
export declare const sets: (...args: ISetDef<any>[]) => {
    sets: Reducer<any, any>;
};
