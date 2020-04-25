import { NgModule } from '@angular/core';
import { WindowService } from './window.service';

@NgModule({
    exports: [
        WindowService,
    ],
    providers: [
        WindowService
    ]
})
export class UtilsModule {
}
