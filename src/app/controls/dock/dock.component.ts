import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { IDockElement, DockContents, DockOrientation } from './dock';
import { Observable } from 'rxjs';

@Component({
    selector: 'dk-dock',
    styleUrls: ['./dock.component.scss'],
    template: `
        <div
            *ngIf='hasContent((dock$ | async).contents, "left")'
            class='left-area'>

            <dk-dock-contents
                [content]='(dock$ | async).contents["left"]'>
            </dk-dock-contents>
        </div>

        <div
            *ngIf='hasContent((dock$ | async).contents, "top") || hasContent((dock$ | async).contents, "bottom")'
            class='vertical-areas'>

            <div
                *ngIf='hasContent((dock$ | async).contents, "top")'
                class='top-area'>

                <dk-dock-contents
                    [content]='(dock$ | async).contents["top"]'>
                </dk-dock-contents>
            </div>

            <div
                *ngIf='hasContent((dock$ | async).contents, "bottom")'
                class='bottom-area'>

                <dk-dock-contents
                    [content]='(dock$ | async).contents["bottom"]'>
                </dk-dock-contents>
            </div>
        </div>

        <div
            *ngIf='hasContent((dock$ | async).contents, "right")'
            class='right-area'>

            <dk-dock-contents
                [content]='(dock$ | async).contents["right"]'>
            </dk-dock-contents>
        </div>
    `
})
export class DockComponent implements OnInit {
    @Input() id: string;
    dock$: Observable<IDockElement>

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
        this.dock$ = this._ngRedux.select(state => state.dock.dockElements[this.id]);
    }

    hasContent(contents: DockContents, orientation: DockOrientation): boolean {
        return contents[orientation] !== undefined;
    }
}
