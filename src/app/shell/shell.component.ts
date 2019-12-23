import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorTheme, activate as activateColorTheme } from './colorthemes/color-theme';
import { Subscription, Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from '../main.state';
import { dkSelect } from '../utils/state';

@Component({
    selector: 'dk-shell',
    styleUrls: ['./shell.component.scss'],
    template: `
        <dk-dock
            [id]='rootDockId$ | async'>
        </dk-dock>
    `
})
export class ShellComponent implements OnInit, OnDestroy {
    openedProject: string;

    @dkSelect(state => state.dock.rootDockId) readonly rootDockId$: Observable<string>;

    private _colorThemeChangeSubscription: Subscription;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
    ) {
    }

    ngOnInit() {
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
