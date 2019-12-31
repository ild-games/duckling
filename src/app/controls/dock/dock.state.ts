import { assertNever, removeByKey } from '../../utils/state';
import { IDocks, IPaneGroups, IPanes, IDockContents } from './dock';

export interface IDockState {
    rootDockId: string;
    docks: IDocks;
    dockContents: IDockContents;
    paneGroups: IPaneGroups;
    panes: IPanes;
}

export const defaultDockState: IDockState = {
    rootDockId: 'd0',
    docks: {
        d0: {
            id: 'd0',
            children: {
                pg0: 'd0|pg0',
                pg1: 'd0|pg1',
                pg2: 'd0|pg2',
                d1: 'd0|d1',
            },
        },
        d1: {
            id: 'd1',
            parentDockId: 'd0',
            children: {
                pg3: 'd1|pg3',
                pg4: 'd1|pg4',
            },
        },
    },
    dockContents: {
        'd0|pg0': {
            type: 'paneGroup',
            orientation: 'right',
            dockId: 'd0',
            childId: 'pg0',
        },
        'd0|pg1': {
            type: 'paneGroup',
            orientation: 'bottom',
            dockId: 'd0',
            childId: 'pg1',
        },
        'd0|pg2': {
            type: 'paneGroup',
            orientation: 'left',
            dockId: 'd0',
            childId: 'pg2',
        },
        'd0|d1': {
            type: 'dock',
            orientation: 'top',
            dockId: 'd0',
            childId: 'd1',
        },
        'd1|pg3': {
            type: 'paneGroup',
            orientation: 'top',
            dockId: 'd1',
            childId: 'pg3'
        },
        'd1|pg4': {
            type: 'paneGroup',
            orientation: 'bottom',
            dockId: 'd1',
            childId: 'pg4'
        },
    },
    paneGroups: {
        pg0: {
            id: 'pg0',
            parentDockId: 'd0',
            paneIds: [
                'p0',
            ],
            activePaneIndex: 0,
        },
        pg1: {
            id: 'pg1',
            parentDockId: 'd0',
            paneIds: [
                'p1',
            ],
            activePaneIndex: 0,
        },
        pg2: {
            id: 'pg2',
            parentDockId: 'd0',
            paneIds: [
                'p2',
                'p5',
                'p6',
            ],
            activePaneIndex: 0,
        },
        pg3: {
            id: 'pg3',
            parentDockId: 'd1',
            paneIds: [
                'p3',
            ],
            activePaneIndex: 0,
        },
        pg4: {
            id: 'pg4',
            parentDockId: 'd1',
            paneIds: [
                'p4',
            ],
            activePaneIndex: 0,
        },
    },
    panes: {
        p0: {
            id: 'p0',
            name: 'Pane Right',
            content: 'Pane Right Content',
            groupId: 'pg0',
            minWidth: 200,
            minHeight: 200,
        },
        p1: {
            id: 'p1',
            name: 'Pane Bottom',
            content: 'Pane Bottom Content',
            groupId: 'pg1',
            minWidth: 200,
            minHeight: 200,
        },
        p2: {
            id: 'p2',
            name: 'Pane Left',
            content: 'Pane Left Content',
            groupId: 'pg2',
            minWidth: 200,
            minHeight: 200,
        },
        p3: {
            id: 'p3',
            name: 'Pane Top Top',
            content: 'Pane Top Top Content',
            groupId: 'pg3',
            minWidth: 200,
            minHeight: 200,
        },
        p4: {
            id: 'p4',
            name: 'Pane Top Bottom',
            content: 'Pane Top Bottom Content',
            groupId: 'pg4',
            minWidth: 200,
            minHeight: 200,
        },
        p5: {
            id: 'p5',
            name: 'Pane Left 2',
            content: 'Pane Left 2 Content',
            groupId: 'pg2',
            minWidth: 200,
            minHeight: 200,
        },
        p6: {
            id: 'p6',
            name: 'Pane Left 3',
            content: 'Pane Left 3 Content',
            groupId: 'pg2',
            minWidth: 200,
            minHeight: 200,
        },
    },
};

export function dockReducer(state: IDockState, action: ITabAction): IDockState {
    switch (action.type) {
        case 'DK_DOCK__CHANGE_ACTIVE_PANE': {
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

        case 'DK_DOCK__CLOSE_PANE': {
            return {
                ...state,
                panes: removeByKey(state.panes, action.paneId),
                paneGroups: {
                    ...state.paneGroups,
                    [action.groupId]: {
                        ...state.paneGroups[action.groupId],
                        paneIds: [
                            ...state.paneGroups[action.groupId].paneIds.slice(0, action.paneIndex),
                            ...state.paneGroups[action.groupId].paneIds.slice(action.paneIndex + 1),
                        ],
                    },
                },
            };
        }

        case 'DK_DOCK__CLOSE_GROUP': {
            return {
                ...state,
                docks: {
                    ...state.docks,
                    [action.dockId]: {
                        ...state.docks[action.dockId],
                        children: removeByKey(state.docks[action.dockId].children, action.groupId)
                    },
                },
                paneGroups: removeByKey(state.paneGroups, action.groupId),
                dockContents: removeByKey(state.dockContents, action.dockContentId),
            };
        }

        case 'DK_DOCK__CLOSE_DOCK': {
            return {
                ...state,
                docks: {
                    ...removeByKey(state.docks, action.dockId),
                    [action.parentDockId]: {
                        ...state.docks[action.parentDockId],
                        children: removeByKey(state.docks[action.parentDockId].children, action.dockId)
                    },
                },
                dockContents: removeByKey(state.dockContents, action.parentDockContentId),
            };
        }

        case 'DK_DOCK__CREATE_PANE': {
            return {
                ...state,
                panes: {
                    ...state.panes,
                    [action.paneId]: {
                        id: action.paneId,
                        name: action.paneName,
                        content: action.paneContent,
                        groupId: action.groupId,
                        minWidth: 200,
                        minHeight: 200,
                    },
                },
                paneGroups: {
                    ...state.paneGroups,
                    [action.groupId]: {
                        ...state.paneGroups[action.groupId],
                        paneIds: [
                            ...state.paneGroups[action.groupId].paneIds,
                            action.paneId,
                        ],
                    },
                },
            };
        }

        default: assertNever(action);
    }

    return state;
}

export type ITabAction = (
    | ReturnType<typeof dockActions.changeActivePane>
    | ReturnType<typeof dockActions.closePane>
    | ReturnType<typeof dockActions.closeGroup>
    | ReturnType<typeof dockActions.closeDock>
    | ReturnType<typeof dockActions.createPane>
);

let nextPaneId = 100;

export const dockActions = {

    changeActivePane(paneIndex: number, groupId: string) {
        return {
            type: 'DK_DOCK__CHANGE_ACTIVE_PANE' as const,
            paneIndex,
            groupId,
        };
    },

    closePane(paneIndex: number, paneId: string, groupId: string) {
        return {
            type: 'DK_DOCK__CLOSE_PANE' as const,
            paneIndex,
            paneId,
            groupId,
        };
    },

    closeGroup(groupId: string, dockId: string, dockContentId: string) {
        return {
            type: 'DK_DOCK__CLOSE_GROUP' as const,
            groupId,
            dockId,
            dockContentId,
        };
    },

    closeDock(dockId: string, parentDockId: string, parentDockContentId: string) {
        return {
            type: 'DK_DOCK__CLOSE_DOCK' as const,
            dockId,
            parentDockId,
            parentDockContentId,
        };
    },

    createPane(groupId: string, paneName: string, paneContent: string) {
        return {
            type: 'DK_DOCK__CREATE_PANE' as const,
            paneId: `p${nextPaneId++}`,
            paneName,
            paneContent,
            groupId,
        };
    },
};
