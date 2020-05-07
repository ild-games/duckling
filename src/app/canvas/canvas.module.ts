import { NgModule } from '@angular/core';
import { CanvasComponent } from './canvas.component';

@NgModule({
    declarations: [
        CanvasComponent,
    ],
    exports: [
        CanvasComponent,
    ],
})
export class CanvasModule {
}
