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

        <div 
            *ngIf='isPaneGroup'
            class='pane-group-container'>

            <dk-pane-group [id]='content.childId'>
            </dk-pane-group>
        </div>
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
