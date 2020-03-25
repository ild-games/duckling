import { Component, Input } from '@angular/core';
import { IDockContent } from './dock';

@Component({
    selector: 'dk-dock-contents',
    styleUrls: ['./dock-contents.component.scss'],
    template: `
        <dk-dock
            *ngIf='isDock'
            [id]='content.childId'>
        </dk-dock>

        <dk-pane-group
            *ngIf='isPaneGroup'
            class='pane-group-container'
            [id]='content.childId'>
        </dk-pane-group>
    `
})
export class DockContentsComponent {
    @Input() content: IDockContent;

    get isDock(): boolean {
        return this.content.type === 'dock';
    }

    get isPaneGroup(): boolean {
        return this.content.type === 'paneGroup';
    }
}
