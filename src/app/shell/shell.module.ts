import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { ControlsModule } from '../controls/controls.module';
import { SplashScreenModule } from '../splashscreen/splash-screen.module';

@NgModule({
    imports: [
        ControlsModule,
        SplashScreenModule,
    ],
    declarations: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ],
})
export class ShellModule {
}
