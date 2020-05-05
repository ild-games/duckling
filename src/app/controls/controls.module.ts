import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DockComponent } from './dock/dock.component';
import { PaneTabComponent } from './dock/pane-tab.component';
import { PaneGroupComponent } from './dock/pane-group.component';
import { DockContentsComponent } from './dock/dock-contents.component';
import { DockDividerComponent } from './dock/dock-divider.component';
import { ColorThemeWidgetComponent } from './color-theme-widget.component';
import { VerticalHyperlinkComponent } from './nav/vertical-hyperlink.component';
import { VerticalNavComponent } from './nav/vertical-nav.component';
import { UtilsModule } from '../utils/utils.module';

const CONTROL_DECLARACTIONS = [
    DockComponent,
    DockDividerComponent,
    DockContentsComponent,
    PaneTabComponent,
    PaneGroupComponent,
    ColorThemeWidgetComponent,
    VerticalHyperlinkComponent,
    VerticalNavComponent,
];

@NgModule({
    imports: [
        ClarityModule,
        FormsModule,
        CommonModule,
        UtilsModule,
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
