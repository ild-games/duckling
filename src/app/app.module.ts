import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ControlsModule } from './controls/controls.module';
import { SplashScreenModule } from './splashscreen/splash-screen.module';

@NgModule({
    imports: [
        ShellModule,
        SplashScreenModule,
        ControlsModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    bootstrap: [
        ShellComponent
    ],
})
export class AppModule {
}
