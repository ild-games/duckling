import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { IDock, DockOrientation, IDockChildrenIds, generateDockContentId, IDockContent } from './dock';
import { Observable } from 'rxjs';

type DockOrientationWithMiddle = DockOrientation | 'middle';

@Component({
    selector: 'dk-dock',
    styleUrls: ['./dock.component.scss'],
    template: `
        <dk-dock-contents
            *ngIf='hasContent((dock$ | async).children, "left")'
            class='left-area'
            [content]='getContent((dock$ | async).children, "left")'>
        </dk-dock-contents>

        <dk-dock-divider
            *ngIf='isDividerActive("left")'
            [orientation]='"vertical"'>
        </dk-dock-divider>

        <div
            *ngIf='hasContent((dock$ | async).children, "middle")'
            class='middle-area'>

            <dk-dock-contents
                *ngIf='hasContent((dock$ | async).children, "top")'
                class='top-area'
                [content]='getContent((dock$ | async).children, "top")'>
            </dk-dock-contents>

            <dk-dock-divider
                *ngIf='isDividerActive("middle")'
                [orientation]='"horizontal"'>
            </dk-dock-divider>

            <dk-dock-contents
                *ngIf='hasContent((dock$ | async).children, "bottom")'
                class='bottom-area'
                [content]='getContent((dock$ | async).children, "bottom")'>
            </dk-dock-contents>
        </div>

        <dk-dock-divider
            *ngIf='isDividerActive("right")'
            [orientation]='"vertical"'>
        </dk-dock-divider>

        <dk-dock-contents
            *ngIf='hasContent((dock$ | async).children, "right")'
            class='right-area'
            [content]='getContent((dock$ | async).children, "right")'>
        </dk-dock-contents>
    `
})
export class DockComponent implements OnInit {
    @Input() id: string;

    dock$: Observable<IDock>;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
        this.dock$ = this._ngRedux.select(state => state.dock.docks[this.id]);
    }

    hasContent(children: IDockChildrenIds, orientation: DockOrientationWithMiddle): boolean {
        if (orientation === 'middle') {
            return this.hasContent(children, 'top') || this.hasContent(children, 'bottom');
        }

        return this.getContent(children, orientation) !== undefined;
    }

    isDividerActive(orientation: DockOrientationWithMiddle): boolean {
        const childrenIds = this._ngRedux.getState().dock.docks[this.id].children;
        switch (orientation) {
            case 'left': {
                return (
                    this.hasContent(childrenIds, 'left') &&
                    (this.hasContent(childrenIds, 'middle') || this.hasContent(childrenIds, 'right'))
                );
            }

            case 'right': {
                return (
                    this.hasContent(childrenIds, 'right') &&
                    this.hasContent(childrenIds, 'middle')
                );
            }

            case 'middle': {
                return (
                    this.hasContent(childrenIds, 'top') &&
                    this.hasContent(childrenIds, 'bottom')
                );
            }

            default: return false;
        }
    }

    getContent(children: IDockChildrenIds, orientation: DockOrientation): IDockContent {
        const childrenContentIds = Object.keys(children).map(key => generateDockContentId(this.id, key));

        for (const dockContentId of childrenContentIds) {
            if (this._ngRedux.getState().dock.dockContents[dockContentId].orientation === orientation) {
                return this._ngRedux.getState().dock.dockContents[dockContentId];
            }
        }

        return undefined;
    }
}
