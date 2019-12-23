import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { Observable } from 'rxjs';
import { IPaneGroup, IPane } from './dock';
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
                (tabClick)='changeActivePane(i, pane.groupId)'
                (closeClick)='closePane(i, pane.id, pane.groupId)'
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

    changeActivePane(newActivePaneIndex: number, groupId: string) {
        this._ngRedux.dispatch(dockActions.changeActiveTab(newActivePaneIndex, groupId));
    }

    closePane(paneIndex: number, paneId: string, groupId: string) {
        this._ngRedux.dispatch(dockActions.closeTab(paneIndex, paneId, groupId));
    }
}
