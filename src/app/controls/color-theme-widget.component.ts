import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { colorThemeActions } from '../shell/colorthemes/color-theme.state';
import { CommandService } from '../command.service';

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
export class ColorThemeWidgetComponent implements OnInit, OnDestroy {
    private _isHovered = false;
    private _changeColorThemeCommandId: number;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
        private _commandService: CommandService,
    ) {
    }

    ngOnInit() {
        this._changeColorThemeCommandId = this._commandService.register({
            name: 'Toggle light/dark color scheme',
            callback: () => this._toggleColorTheme(),
        });
        this._changeColorThemeCommandId = this._commandService.register({
            name: 'Toggle your schemes',
            callback: () => this._toggleColorTheme(),
        });
        this._changeColorThemeCommandId = this._commandService.register({
            name: 'Colors are scholarly',
            callback: () => this._toggleColorTheme(),
        });
    }

    ngOnDestroy() {
        this._commandService.deregister(this._changeColorThemeCommandId);
    }

    onMouseEnter() {
        this._isHovered = true;
    }

    onMouseLeave() {
        this._isHovered = false;
    }

    onMouseClick() {
        this._toggleColorTheme();
    }

    get cssClasses() {
        return (
            this._isHovered
                ? []
                : ['is-solid', 'test']
        );
    }

    private _toggleColorTheme() {
        const newTheme = this._ngRedux.getState().colorTheme.activeColorTheme === 'light' 
            ? 'dark'
            : 'light';

        this._ngRedux.dispatch(colorThemeActions.changeActiveColorTheme(newTheme));
    }
}
