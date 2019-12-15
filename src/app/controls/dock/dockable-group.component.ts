import { Component } from '@angular/core';

@Component({
    selector: 'dk-dockable-group',
    styleUrls: ['./dockable-group.component.scss'],
    template: `
        <ul class='nav' role='tablist'>
            <dk-dockable-tab
                [isActive]='true'
                name='Filesystem'
            >
            </dk-dockable-tab>
            <dk-dockable-tab
                [isActive]='false'
                name='Scene'
            >
            </dk-dockable-tab>
            <dk-dockable-tab
                [isActive]='false'
                name='Inspector'
            >
            </dk-dockable-tab>
        </ul>
    `
})
export class DockableGroupComponent {
}
