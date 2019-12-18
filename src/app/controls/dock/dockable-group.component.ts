import { Component, OnInit } from '@angular/core';
import { DockActions } from './dock.state';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { Observable } from 'rxjs';
import { dkSelect } from 'src/app/utils/state';

interface IPane {
    name: string;
    content: string;
}

@Component({
    selector: 'dk-dockable-group',
    styleUrls: ['./dockable-group.component.scss'],
    template: `
        <ul class='nav' role='tablist'>
            <dk-dockable-tab
                *ngFor='let pane of panes; index as i'
                [isActive]='i == (activeTab$ | async)'
                (tabClick)='changeActiveTab(i)'
                [name]='pane.name'>
            </dk-dockable-tab>
        </ul>
        <section
            *ngFor='let pane of panes; index as i'
            role='tabpanel'
            attr.aria-hidden='{{i != (activeTab$ | async)}}'>
            {{pane.content}}
        </section>
    `
})
export class DockableGroupComponent implements OnInit {
    panes: IPane[] = [];

    @dkSelect(state => state.dock.activeTab) readonly activeTab$: Observable<number>;

    constructor(
        private _dockActions: DockActions,
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
        this.panes = this.panes.concat([
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
        ]);
    }

    changeActiveTab(newActiveTab: number) {
        this._ngRedux.dispatch(this._dockActions.changeActiveTab(newActiveTab));
    }
}
