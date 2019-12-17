import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, Selector, Comparator } from '@angular-redux/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ControlsModule } from './controls/controls.module';
import { SplashScreenModule } from './splashscreen/splash-screen.module';
import { IDucklingState, mainReducer, INITIAL_DUCKLING_STATE } from './main.state';

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
    constructor(ngRedux: NgRedux<IDucklingState>) {
        ngRedux.configureStore(mainReducer, INITIAL_DUCKLING_STATE);
    }
}
