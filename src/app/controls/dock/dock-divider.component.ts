import { Component, Input } from '@angular/core';

@Component({
    selector: 'dk-dock-divider',
    styleUrls: [ './dock-divider.component.scss' ],
    template: `
        <div [class]='cssClasses'>
            <span class='divider-indicator'></span>
        </div>
    `
})
export class DockDividerComponent {
    @Input() orientation: 'horizontal' | 'vertical';

    get cssClasses(): string {
        const classes = [ 'divider' ];
        switch(this.orientation) {
            case 'horizontal':
                classes.push('horizontal-divider');
                break;

            case 'vertical':
                classes.push('vertical-divider');
                break;
        }

        return classes.join(' ');
    }
}
