export declare interface IToggleState {
    [name: string]: boolean;
}
export declare interface IToggleStateContainer {
    basic?: {
        toggle?: IToggleState;
    };
}
export declare interface IToggleAction {
    type: string;
    name: string;
    defaultState?: boolean;
}
export declare const TOGGLE_SHOW = "basic/toggle/show";
export declare const TOGGLE_HIDE = "basic/toggle/hide";
export declare const TOGGLE_TOGGLE = "basic/toggle/toggle";
export declare const toggle: {
    hide: (name: string) => IToggleAction;
    isVisible: (state: IToggleStateContainer | undefined, name: string, defaultState?: boolean) => boolean;
    show: (name: string) => IToggleAction;
    toggle: (name: string, defaultState?: boolean) => IToggleAction;
};
export declare const toggleReducer: (state: IToggleState | undefined, action: IToggleAction) => IToggleState;
