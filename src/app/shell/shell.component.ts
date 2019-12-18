import { Component, OnDestroy } from '@angular/core';
import { ColorTheme, activate as activateColorTheme } from './colorthemes/color-theme';
import { Subscription } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from '../main.state';

@Component({
    selector: 'dk-shell',
    styleUrls: ['./shell.component.scss'],
    template: `
        <dk-dock>
        </dk-dock>
    `
})
export class ShellComponent implements OnDestroy {
    openedProject: string;

    private _colorThemeChangeSubscription: Subscription;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
        this._colorThemeChangeSubscription = this._ngRedux
            .select(state => state.colorTheme.activeColorTheme)
            .subscribe((newColorTheme) => this._changeTheme(newColorTheme));
    }

    ngOnDestroy() {
        this._colorThemeChangeSubscription.unsubscribe();
    }

    onProjectOpened(title: string) {
        this.openedProject = title;
    }

    private _changeTheme(themeName: ColorTheme) {
        activateColorTheme(themeName);
    }
}
