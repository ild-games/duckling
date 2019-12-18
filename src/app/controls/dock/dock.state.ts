import { Injectable } from '@angular/core';
import { Action } from 'redux';

export interface IDockState {
    activeTab: number;
}

export const defaultDockState: IDockState = {
    activeTab: 0,
};

export function dockReducer(state: IDockState, action: Action): IDockState {
    if (action.type === DockActions.CHANGE_ACTIVE_TAB) {
        return {
            ...state,
            activeTab: (action as IActiveTabAction).newActiveTab,
        };
    }

    return state;
}

interface IActiveTabAction extends Action {
    newActiveTab: number;
}

@Injectable()
export class DockActions {
    static CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

    changeActiveTab(newActiveTab: number): IActiveTabAction {
        return {
            type: DockActions.CHANGE_ACTIVE_TAB,
            newActiveTab,
        };
    }
}
