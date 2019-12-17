import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, Selector, Comparator, DevToolsExtension } from '@angular-redux/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ControlsModule } from './controls/controls.module';
import { SplashScreenModule } from './splashscreen/splash-screen.module';
import { IDucklingState, mainReducer, INITIAL_DUCKLING_STATE } from './main.state';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        ShellModule,
        SplashScreenModule,
        ControlsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgReduxModule,
    ],
    bootstrap: [
        ShellComponent
    ],
})
export class AppModule {
    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
        private _devTools: DevToolsExtension,
    ) {
        let enhancers = [];

        if (!environment.production && this._devTools.isEnabled()) {
            enhancers = [
                ...enhancers,
                this._devTools.enhancer()
            ];
        }

        this._ngRedux.configureStore(
            mainReducer,
            INITIAL_DUCKLING_STATE,
            [],
            enhancers);
    }
}
