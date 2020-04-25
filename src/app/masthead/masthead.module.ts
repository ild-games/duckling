import { NgModule } from '@angular/core';
import { UtilsModule } from '../utils/utils.module';
import { ControlsModule } from '../controls/controls.module';
import { MastheadComponent } from './masthead.component';
import { CommandPaletteComponent } from './command-palette.component';

@NgModule({
    imports: [
        ControlsModule,
        UtilsModule,
    ],
    declarations: [
        MastheadComponent,
        CommandPaletteComponent,
    ],
    exports: [
        MastheadComponent,
    ],
})
export class MastheadModule {
}
