import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ClarityModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        ClarityModule,
        FormsModule,
        CommonModule,
    ],
})
export class ControlsModule {
}
