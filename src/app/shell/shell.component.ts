import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorTheme } from './colorthemes/color-theme';
import { Subscription, Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IDucklingState } from '../main.state';
import { dkSelect } from '../utils/state';
import { ColorThemeService } from './colorthemes/color-theme.service';

@Component({
    selector: 'dk-shell',
    styleUrls: ['./shell.component.scss'],
    template: `
        <dk-masthead>
        </dk-masthead>

        <div class='content'>
            <dk-splash-screen
                *ngIf='!isShowSplashScreen'
                (projectOpened)='onProjectOpened($event)'>
            </dk-splash-screen>

            <dk-canvas
                *ngIf='isShowSplashScreen'>
            </dk-canvas>
        </div>

        <dk-color-theme-widget>
        </dk-color-theme-widget>
    `
})
export class ShellComponent implements OnInit, OnDestroy {
    openedProject: string;

    @dkSelect(state => state.dock.rootDockId) readonly rootDockId$: Observable<string>;

    private _colorThemeChangeSubscription: Subscription;

    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
        private _colorTheme: ColorThemeService,
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
        this._colorTheme.activate(themeName);
    }

    get isShowSplashScreen() {
        return !this.openedProject;
    }
}
