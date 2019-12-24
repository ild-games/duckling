import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { IDock, DockOrientation, IDockChildrenIds, dockContentId, IDockContent } from './dock';
import { Observable } from 'rxjs';

@Component({
    selector: 'dk-dock',
    styleUrls: ['./dock.component.scss'],
    template: `
        <div
            *ngIf='hasContent((dock$ | async).children, "left")'
            class='left-area'>

            <dk-dock-contents
                [content]='getContent((dock$ | async).children, "left")'>
            </dk-dock-contents>
        </div>

        <div
            *ngIf='hasContent((dock$ | async).children, "top") || hasContent((dock$ | async).children, "bottom")'
            class='vertical-areas'>

            <div
                *ngIf='hasContent((dock$ | async).children, "top")'
                class='top-area'>

                <dk-dock-contents
                    [content]='getContent((dock$ | async).children, "top")'>
                </dk-dock-contents>
            </div>

            <div
                *ngIf='hasContent((dock$ | async).children, "bottom")'
                class='bottom-area'>

                <dk-dock-contents
                    [content]='getContent((dock$ | async).children, "bottom")'>
                </dk-dock-contents>
            </div>
        </div>

        <div
            *ngIf='hasContent((dock$ | async).children, "right")'
            class='right-area'>

            <dk-dock-contents
                [content]='getContent((dock$ | async).children, "right")'>
            </dk-dock-contents>
        </div>
    `
})
export class DockComponent implements OnInit {
    @Input() id: string;
    dock$: Observable<IDock>

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
        this.dock$ = this._ngRedux.select(state => state.dock.docks[this.id]);
    }

    hasContent(children: IDockChildrenIds, orientation: DockOrientation): boolean {
        return this.getContent(children, orientation) !== undefined;
    }

    getContent(children: IDockChildrenIds, orientation: DockOrientation): IDockContent {
        const childrenContentIds = Object.keys(children).map(key => dockContentId(this.id, key));

        for (const dockContentId of childrenContentIds) {
            if (this._ngRedux.getState().dock.dockContents[dockContentId].orientation === orientation) {
                return this._ngRedux.getState().dock.dockContents[dockContentId];
            }
        }
        
        return undefined;
    }
}
