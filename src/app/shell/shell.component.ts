import { Component } from '@angular/core';

@Component({
    selector: 'dk-shell',
    styleUrls: ['./shell.component.scss'],
    template: `
        <dk-dock>
        </dk-dock>
    `
})
export class ShellComponent {
    openedProject: string;

    onProjectOpened(title: string) {
        this.openedProject = title;
    }
}
