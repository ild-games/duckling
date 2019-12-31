export interface IPanes { [id: string]: IPane; }
export interface IPane {
    id: string;
    name: string;
    content: string;
    groupId: string;
    minWidth: number;
    minHeight: number;
}

export interface IPaneGroups { [id: string]: IPaneGroup; }
export interface IPaneGroup {
    id: string;
    paneIds: string[];
    activePaneIndex: number;
    parentDockId: string;
}

export interface IDockChildrenIds { [id: string]: string; }
export interface IDocks { [id: string]: IDock; }
export interface IDock {
    id: string;
    children: IDockChildrenIds;
    parentDockId?: string;
}

export interface IDockContents { [id: string]: IDockContent; }
export interface IDockContent {
    type: 'dock' | 'paneGroup';
    orientation: DockOrientation;
    dockId: string;
    childId: string;
}

export type DockOrientation = 'top' | 'right' | 'bottom' | 'left';

export function generateDockContentId(dockId: string, contentId: string) {
    return `${dockId}|${contentId}`;
}
