import { Component } from '@angular/core';

@Component({
    selector: 'dk-vertical-nav',
    styleUrls: [ './vertical-nav.component.scss' ],
    template: `
        <clr-vertical-nav>
            <ng-content>
            </ng-content>
        </clr-vertical-nav>
    `
})
export class VerticalNavComponent {
}
