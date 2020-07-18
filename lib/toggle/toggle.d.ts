export declare interface IToggleState {
    [name:string]: boolean;
}

export declare interface IToggleStateContainer {
    basic: {
        toggle: IToggleState;
    }
}

export declare interface IToggleAction {
    type: string;
    name: string;
}
