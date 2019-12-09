import { NgModule } from '@angular/core';
import { ControlsModule } from '../controls/controls.module';
import { SplashScreenComponent } from './splash-screen.component';
import { ProjectSerializerService, FakeProjectSerializerService } from './project-serializer.service';

@NgModule({
    imports: [
        ControlsModule,
    ],
    declarations: [
        SplashScreenComponent,
    ],
    exports: [
        SplashScreenComponent,
    ],
    providers: [
        { provide: ProjectSerializerService, useClass: FakeProjectSerializerService },
    ]
})
export class SplashScreenModule {
}
