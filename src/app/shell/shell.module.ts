import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { ControlsModule } from '../controls/controls.module';
import { SplashScreenModule } from '../splashscreen/splash-screen.module';
import { ColorThemeService } from './colorthemes/color-theme.service';
import { MastheadModule } from '../masthead/masthead.module';

@NgModule({
    imports: [
        ControlsModule,
        SplashScreenModule,
        MastheadModule,
    ],
    declarations: [
        ShellComponent,
    ],
    exports: [
        ShellComponent,
    ],
    providers: [
        ColorThemeService,
    ]
})
export class ShellModule {
}
