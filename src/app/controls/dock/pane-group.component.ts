import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { Observable } from 'rxjs';
import { IPaneGroup, IPane, dockContentId as generateDockContentId } from './dock';
import { dockActions } from './dock.state';

@Component({
    selector: 'dk-pane-group',
    styleUrls: ['./pane-group.component.scss'],
    template: `
        <ul
            class='nav tabs'
            role='tablist'>

            <dk-pane-tab
                *ngFor='let pane of panes(paneGroup$ | async); index as i'
                [isActive]='isActivePane(i, paneGroup$ | async)'
                [canClose]='true'
                (tabClick)='changeActivePane(i)'
                (closeClick)='closePane(i, pane.id)'
                [name]='pane.name'>
            </dk-pane-tab>
        </ul>
        <section
            *ngFor='let pane of panes(paneGroup$ | async); index as i'
            class='content'
            role='tabpanel'
            attr.aria-hidden='{{!isActivePane(i, paneGroup$ | async)}}'>
            {{pane.content}}
        </section>
    `
})
export class PaneGroupComponent implements OnInit {
    @Input() id: string;

    paneGroup$: Observable<IPaneGroup>;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
        this.paneGroup$ = this._ngRedux.select(state => state.dock.paneGroups[this.id]);
    }

    panes(paneGroup: IPaneGroup): IPane[] {
        return Array.from(
            paneGroup.paneIds,
            paneId => this._ngRedux.getState().dock.panes[paneId]);
    }

    isActivePane(paneIndex: number, paneGroup: IPaneGroup): boolean {
        return paneGroup.activePaneIndex === paneIndex;
    }

    changeActivePane(newActivePaneIndex: number) {
        this._ngRedux.dispatch(dockActions.changeActivePane(newActivePaneIndex, this.id));
    }

    closePane(paneIndex: number, paneId: string) {
        this._ngRedux.dispatch(dockActions.closePane(paneIndex, paneId, this.id));

        const lastPaneIndex = this._ngRedux.getState().dock.paneGroups[this.id].paneIds.length - 1;
        const dockId = this._ngRedux.getState().dock.paneGroups[this.id].parentDockId;
        const dockContentId = generateDockContentId(dockId, this.id);
        const parentDockId = this._ngRedux.getState().dock.docks[dockId].parentDockId;
        const parentDockContentId = parentDockId !== undefined
            ? generateDockContentId(parentDockId, dockId)
            : undefined;

        if (this._isGroupEmpty()) {
            this._ngRedux.dispatch(dockActions.closeGroup(this.id, dockId, dockContentId));
        }

        if (this._isDockEmpty(dockId) && this._doesDockHaveParent(dockId)) {
            this._ngRedux.dispatch(dockActions.closeDock(dockId, parentDockId, parentDockContentId));
        }

        if (!this._isActivePaneValid()) {
            this._ngRedux.dispatch(dockActions.changeActivePane(lastPaneIndex, this.id));
        }
    }

    private _isActivePaneValid(): boolean {
        const paneGroup = this._ngRedux.getState().dock.paneGroups[this.id];
        if (!paneGroup) {
            return true;
        }

        return paneGroup.activePaneIndex < paneGroup.paneIds.length;
    }

    private _isGroupEmpty(): boolean {
        return this._ngRedux.getState().dock.paneGroups[this.id].paneIds.length === 0;
    }

    private _isDockEmpty(dockId: string): boolean {
        return Object.keys(this._ngRedux.getState().dock.docks[dockId].children).length === 0;
    }

    private _doesDockHaveParent(dockId: string): boolean {
        return this._ngRedux.getState().dock.docks[dockId].parentDockId !== undefined;
    }
}
