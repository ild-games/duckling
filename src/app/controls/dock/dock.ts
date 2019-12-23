export interface IPanes { [id: string] : IPane}
export interface IPane {
    id: string;
    name: string;
    content: string;
    groupId: string;
}

export interface IPaneGroups { [id: string] : IPaneGroup }
export interface IPaneGroup { 
    id: string;
    paneIds: string[];
    activePaneIndex: number;
    parentDockId: string;
}

export interface IDockElements { [id: string]: IDockElement }
export interface IDockElement {
    id: string;
    contents: DockContents;
    parentDockId?: string;
}

export type DockContents = {
    [key in DockOrientation]?: IDockContent;
};
export interface IDockContent {
    type: 'dock' | 'paneGroup';
    id: string;
}

export type DockOrientation = 'top' | 'right' | 'bottom' | 'left';
