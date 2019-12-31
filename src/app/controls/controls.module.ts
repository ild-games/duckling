import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DockComponent } from './dock/dock.component';
import { PaneTabComponent } from './dock/pane-tab.component';
import { PaneGroupComponent } from './dock/pane-group.component';
import { DockContentsComponent } from './dock/dock-contents.component';
import { DockDividerComponent } from './dock/dock-divider.component';

const CONTROL_DECLARACTIONS = [
    DockComponent,
    DockDividerComponent,
    DockContentsComponent,
    PaneTabComponent,
    PaneGroupComponent,
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
