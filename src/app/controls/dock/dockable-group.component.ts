import { Component } from '@angular/core';
import { DockActions } from './dock.state';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { Observable } from 'rxjs';
import { dkSelect } from 'src/app/utils/state';
import { IPane } from './pane';

@Component({
    selector: 'dk-dockable-group',
    styleUrls: ['./dockable-group.component.scss'],
    template: `
        <ul
            class='nav tabs'
            role='tablist'>
            <dk-dockable-tab
                *ngFor='let pane of (panes$ | async); index as i'
                [isActive]='i == (activeTab$ | async)'
                [canClose]='canCloseTab(i)'
                (tabClick)='changeActiveTab(i)'
                (closeClick)='closeTab(i)'
                [name]='pane.name'>
            </dk-dockable-tab>
        </ul>
        <section
            *ngFor='let pane of (panes$ | async); index as i'
            class='content'
            role='tabpanel'
            attr.aria-hidden='{{i != (activeTab$ | async)}}'>
            {{pane.content}}
        </section>
    `
})
export class DockableGroupComponent {
    @dkSelect(state => state.dock.panes) readonly panes$: Observable<IPane[]>;

    @dkSelect(state => state.dock.activeTabIndex) readonly activeTab$: Observable<number>;

    constructor(
        private _dockActions: DockActions,
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    changeActiveTab(tabIndex: number) {
        this._ngRedux.dispatch(this._dockActions.changeActiveTab(tabIndex));
    }

    closeTab(tabIndex: number) {
        this._ngRedux.dispatch(this._dockActions.closeTab(tabIndex));
    }

    canCloseTab(tabIndex: number) {
        return !(
            tabIndex == 0 &&
            this._ngRedux.getState().dock.panes.length == 1
        );
    }
}
