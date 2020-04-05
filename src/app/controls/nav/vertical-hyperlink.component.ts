import { Component, EventEmitter, ViewEncapsulation, Output } from '@angular/core';

@Component({
    selector: 'dk-vertical-hyperlink',
    styleUrls: [ './vertical-hyperlink.component.scss' ],
    template: `
        <div class='content'>
            <a
                clrVerticalNavLink
                (click)='onClick()'>

                <ng-content></ng-content>
            </a>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class VerticalHyperLinkComponent {
    @Output() click = new EventEmitter<void>();

    onClick() {
        this.click.emit();
    }
}
