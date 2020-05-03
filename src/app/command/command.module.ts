import { NgModule } from '@angular/core';
import { CommandService } from './command.service';

@NgModule({
    exports: [
        CommandService,
    ],
    providers: [
        CommandService,
    ]
})
export class CommandModule {
}
