import { Component } from '@angular/core';

@Component({
    selector: 'dk-shell',
    styleUrls: ['./shell.component.scss'],
    template: `
        <div class='content'>
            <dk-splash-screen
                (projectOpened)='onProjectOpened($event)'>
            </dk-splash-screen>
            <div
                class='content-area'
                *ngIf='openedProject !== undefined'>
                {{openedProject}} Is Opened!
            </div>
        </div>
    `
})
export class ShellComponent {
    openedProject: string;

    onProjectOpened(title: string) {
        this.openedProject = title;
    }
}
