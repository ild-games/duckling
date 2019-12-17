import { Action } from 'redux';
import { IDockState, defaultDockState, dockReducer } from './controls/dock/dock.state';
import { Selector, Comparator } from '@angular-redux/store';

export interface IDucklingState {
    dock: IDockState;
}

export const INITIAL_DUCKLING_STATE: IDucklingState = {
    // dock: {
    //     ...defaultDockState
    // }
    dock: defaultDockState,
};

export function mainReducer(state: IDucklingState, action: Action) {
    return {
        dock: dockReducer(state.dock, action),
    };
}
