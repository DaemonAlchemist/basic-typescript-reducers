import { combineReducers, Reducer } from "redux";
import { switchOn } from "ts-functional";

export const SET_ADD    = 'basic/set/add';
export const SET_REMOVE = 'basic/set/remove';
export const SET_CLEAR  = 'basic/set/clear';

export declare interface ISetState<T> {
    sets: {
        [id:string]: Set<T> | undefined;
    }
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
    add: (value:T) => ISetAction<T>;
    remove: (value:T) => ISetAction<T>;
    clear: () => ISetClearAction;
    values: (state:ISetState<T>) => T[];
    reducer: {
        [base:string]: (State:Set<T> | undefined, action:ISetAction<T>) => Set<T>;
    }
}

const createEmptySet = <T>() => new Set<T>();
const values = <T>(set?:Set<T>):T[] => Array.from(set || createEmptySet());

export const set = <T>(base:string):ISetDef<T> => ({
    add: (value:T):ISetAction<T> => ({type: SET_ADD, value, base}),
    remove: (value:T):ISetAction<T> => ({type: SET_REMOVE, value, base}),
    clear: ():ISetClearAction => ({type: SET_CLEAR, base}),
    values: (state:ISetState<T>):T[] => Array.from(state.sets[base] || createEmptySet<T>()),
    reducer: {
        [base]: (state:Set<T> | undefined, action:ISetAction<T>):Set<T> => base !== action.base
            ? (state || createEmptySet<T>())
            : switchOn(action.type, {
                [SET_ADD]:    () => state ? new Set<T>([...values(state), action.value]) : new Set([action.value]),
                [SET_REMOVE]: () => state ? new Set<T>(values(state).filter((a:T) => a !== action.value)) : createEmptySet<T>(),
                [SET_CLEAR]:  () => createEmptySet<T>(),
                default: () => state,
            }) || createEmptySet<T>()
    },
});

export const sets = (...args:ISetDef<any>[]):{sets: Reducer<any, any>} => ({
    sets: combineReducers(args.reduce(
        (combined, arg) => ({
            ...combined,
            ...arg.reducer
        }),
        {}
    )),
});
