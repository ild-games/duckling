import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { EnvironmentService } from './environment.service';
import { ShellModule } from './shell/shell.module';
import { ControlsModule } from './controls/controls.module';
import { SplashScreenModule } from './splashscreen/splash-screen.module';
import { IDucklingState, mainReducer } from './main.state';
import { StoreEnhancer } from 'redux';
import { CommandService } from './command.service';

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
    providers: [
        EnvironmentService,
        CommandService,
    ],
})
export class AppModule {
    constructor(
        private _ngRedux: NgRedux<IDucklingState>,
        private _devTools: DevToolsExtension,
        private _environment: EnvironmentService,
    ) {
        let enhancers: StoreEnhancer<IDucklingState, any>[] = [];

        if (!this._environment.isProduction() && this._devTools.isEnabled()) {
            enhancers = [
                ...enhancers,
                this._devTools.enhancer()
            ];
        }

        this._ngRedux.configureStore(mainReducer, undefined, [], enhancers);
    }
}
