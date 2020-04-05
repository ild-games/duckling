import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { colorThemeActions } from '../shell/colorthemes/color-theme.state';

@Component({
    selector: 'dk-color-theme-widget',
    styleUrls: ['./color-theme-widget.component.scss'],
    template: `
        <button
            type='button'
            class='btn btn-icon btn-link'
            (mouseenter)='onMouseEnter()'
            (mouseleave)='onMouseLeave()'
            (click)='onMouseClick()'
            aria-label='change color theme'>

            <clr-icon
                shape='color-palette'
                size='32'
                [class]='cssClasses'>
            </clr-icon>
        </button>
    `
})
export class ColorThemeWidgetComponent {
    private _isHovered = false;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    onMouseEnter() {
        this._isHovered = true;
    }

    onMouseLeave() {
        this._isHovered = false;
    }

    onMouseClick() {
        const newTheme = this._ngRedux.getState().colorTheme.activeColorTheme === 'light' 
            ? 'dark'
            : 'light';

        this._ngRedux.dispatch(colorThemeActions.changeActiveColorTheme(newTheme));
    }

    get cssClasses() {
        return (
            this._isHovered
                ? []
                : ['is-solid']
        );
    }
}
