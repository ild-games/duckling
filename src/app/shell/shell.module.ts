import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { ControlsModule } from '../controls/controls.module';
import { SplashScreenModule } from '../splashscreen/splash-screen.module';
import { ColorThemeActions } from './colorthemes/color-theme.state';

@NgModule({
    imports: [
        ControlsModule,
        SplashScreenModule,
    ],
    declarations: [
        ShellComponent,
    ],
    exports: [
        ShellComponent,
    ],
    providers: [
        ColorThemeActions,
    ]
})
export class ShellModule {
}
