export declare interface ICounterState {
    [name:string]: number;
}

export declare interface ICounterStateContainer {
    basic: {
        counter: ICounterState;
    }
}

export declare interface ICounterAction {
    type: string;
    name: string;
    min?: number;
    max?: number;
    value?: number;
}
