import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DockComponent } from './dock/dock.component';
import { DockableTabComponent } from './dock/dockable-tab.component';
import { DockableGroupComponent } from './dock/dockable-group.component';

const CONTROL_DECLARACTIONS = [
    DockComponent,
    DockableTabComponent,
    DockableGroupComponent,
];

@NgModule({
    imports: [
        ClarityModule,
        FormsModule,
        CommonModule,
    ],
    declarations: [
        CONTROL_DECLARACTIONS,
    ],
    exports: [
        CONTROL_DECLARACTIONS,
        ClarityModule,
        FormsModule,
        CommonModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})
export class ControlsModule {
}
