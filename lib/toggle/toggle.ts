import { switchOn } from 'ts-functional';
import { IToggleAction, IToggleState, IToggleStateContainer } from "./toggle.d";

export const TOGGLE_SHOW = 'basic/toggle/show';
export const TOGGLE_HIDE = 'basic/toggle/hide';
export const TOGGLE_TOGGLE = 'basic/toggle/toggle';

//Action creators and selectors
export const toggle = {
    hide: (name:string):IToggleAction => ({type: TOGGLE_HIDE, name}),
    isVisible: (state:IToggleStateContainer | undefined, name:string, defaultState:boolean = false):boolean => isVisible(state?.basic?.toggle || {}, name, defaultState),
    show: (name:string):IToggleAction => ({type: TOGGLE_SHOW, name}),
    toggle: (name:string, defaultState:boolean = false):IToggleAction => ({type: TOGGLE_TOGGLE, name, defaultState}),
}

const isVisible = (state:IToggleState, name:string, defaultState:boolean = false):boolean => state && typeof state[name] !== 'undefined'
    ? state[name]
    : defaultState;

//Reducer
export const toggleReducer = (state:IToggleState = {}, action:IToggleAction):IToggleState => switchOn(action.type, {
    [TOGGLE_SHOW]: () => ({
        ...state,
        [action.name]: true,
    }),
    [TOGGLE_HIDE]: () => ({
        ...state,
        [action.name]: false,
    }),
    [TOGGLE_TOGGLE]: () => ({
        ...state,
        [action.name]: !isVisible(state, action.name),
    }),
    default: () => state,
}) || {};
