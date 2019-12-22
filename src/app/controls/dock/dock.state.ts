import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { IPane } from './pane';

export interface IDockState {
    activeTabIndex: number;
    panes: IPane[]
}

export const defaultDockState: IDockState = {
    activeTabIndex: 0,
    panes: [
        {
            name: 'Filesystem',
            content: 'Filesystem content'
        },
        {
            name: 'Scene',
            content: 'Scene content'
        },
        {
            name: 'Inspector',
            content: 'Inspector content'
        },
    ],
};

export function dockReducer(state: IDockState, action: Action): IDockState {
    if (action.type === DockActions.CHANGE_ACTIVE_TAB) {
        return {
            ...state,
            activeTabIndex: (action as IActiveTabAction).tabIndex,
        };
    }

    if (action.type === DockActions.CLOSE_TAB) {
        if (state.panes.length === 1) {
            return state;
        }

        const index = (action as ICloseTabAction).tabIndex;
        return {
            ...state,
            activeTabIndex: index === state.panes.length - 1 ? index - 1 : index,
            panes: [
                ...state.panes.slice(0, index), 
                ...state.panes.slice(index + 1)
            ],
        };
    }

    return state;
}

interface IActiveTabAction extends Action {
    tabIndex: number;
}

interface ICloseTabAction extends Action {
    tabIndex: number;
}

@Injectable()
export class DockActions {
    static CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';
    static CLOSE_TAB = 'CLOSE_TAB';

    changeActiveTab(tabIndex: number): IActiveTabAction {
        return {
            type: DockActions.CHANGE_ACTIVE_TAB,
            tabIndex,
        };
    }

    closeTab(tabIndex: number): ICloseTabAction {
        return {
            type: DockActions.CLOSE_TAB,
            tabIndex,
        };
    }
}
