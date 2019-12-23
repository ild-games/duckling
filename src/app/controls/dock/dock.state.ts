import { assertNever, removeByKey } from '../../utils/state';
import { IDockElements, IPaneGroups, IPanes } from './dock';

export interface IDockState {
    rootDockId: string;
    dockElements: IDockElements;
    paneGroups: IPaneGroups;
    panes: IPanes;
}

export const defaultDockState: IDockState = {
    rootDockId: 'd0',
    dockElements: {
        'd0': {
            id: 'd0',
            contents: {
                'right': {
                    type: 'paneGroup',
                    id: 'pg0',
                },
                'bottom': {
                    type: 'paneGroup',
                    id: 'pg1',
                },
                'left': {
                    type: 'paneGroup',
                    id: 'pg2',
                },
                'top': {
                    type: 'dock',
                    id: 'd1',
                },
            }
        },
        'd1': {
            id: 'd1',
            parentDockId: 'd0',
            contents: {
                'top': {
                    type: 'paneGroup',
                    id: 'pg3',
                },
                'bottom': {
                    type: 'paneGroup',
                    id: 'pg4',
                },
            }
        },
    },
    paneGroups: {
        'pg0': {
            id: 'pg0',
            parentDockId: 'd0',
            paneIds: [
                'p0',
            ],
            activePaneIndex: 0,
        },
        'pg1': {
            id: 'pg1',
            parentDockId: 'd0',
            paneIds: [
                'p1',
            ],
            activePaneIndex: 0,
        },
        'pg2': {
            id: 'pg2',
            parentDockId: 'd0',
            paneIds: [
                'p2',
                'p5',
            ],
            activePaneIndex: 0,
        },
        'pg3': {
            id: 'pg3',
            parentDockId: 'd1',
            paneIds: [
                'p3',
            ],
            activePaneIndex: 0,
        },
        'pg4': {
            id: 'pg4',
            parentDockId: 'd1',
            paneIds: [
                'p4',
            ],
            activePaneIndex: 0,
        },
    },
    panes: {
        'p0': {
            id: 'p0',
            name: 'Pane Right',
            content: 'Pane Right Content',
            groupId: 'pg0',
        },
        'p1': {
            id: 'p1',
            name: 'Pane Bottom',
            content: 'Pane Bottom Content',
            groupId: 'pg1',
        },
        'p2': {
            id: 'p2',
            name: 'Pane Left',
            content: 'Pane Left Content',
            groupId: 'pg2',
        },
        'p3': {
            id: 'p3',
            name: 'Pane Top Top',
            content: 'Pane Top Top Content',
            groupId: 'pg3',
        },
        'p4': {
            id: 'p4',
            name: 'Pane Top Bottom',
            content: 'Pane Top Bottom Content',
            groupId: 'pg4',
        },
        'p5': {
            id: 'p5',
            name: 'Pane Left 2',
            content: 'Pane Left 2 Content',
            groupId: 'pg2',
        },
    },
};

export function dockReducer(state: IDockState, action: ITabAction): IDockState {
    switch (action.type) {
        case 'CHANGE_ACTIVE_TAB': {
            return {
                ...state,
                paneGroups: {
                    ...state.paneGroups,
                    [action.groupId]: {
                        ...state.paneGroups[action.groupId],
                        activePaneIndex: action.paneIndex,
                    },
                },
            };
        }

        case 'CLOSE_TAB': {
            return {
                ...state,
                paneGroups: {
                    ...state.paneGroups,
                    [action.groupId]: {
                        ...state.paneGroups[action.groupId],
                        activePaneIndex: (
                            action.paneIndex === state.paneGroups[action.groupId].paneIds.length - 1 
                                ? action.paneIndex - 1
                                : action.paneIndex
                        ),
                        paneIds: [
                            ...state.paneGroups[action.groupId].paneIds.slice(0, action.paneIndex),
                            ...state.paneGroups[action.groupId].paneIds.slice(action.paneIndex + 1),
                        ],
                    },
                },
                panes: removeByKey(state.panes, action.paneId),
            };
        }

        default: assertNever(action);
    }

    return state;
}

export type ITabAction = (
    | ReturnType<typeof dockActions.changeActiveTab>
    | ReturnType<typeof dockActions.closeTab>
);

export const dockActions = {

    changeActiveTab(paneIndex: number, groupId: string) {
        return {
            type: 'CHANGE_ACTIVE_TAB' as const,
            paneIndex,
            groupId,
        };
    },

    closeTab(paneIndex: number, paneId: string, groupId: string) {
        return {
            type: 'CLOSE_TAB' as const,
            paneIndex,
            paneId,
            groupId,
        };
    },
};
