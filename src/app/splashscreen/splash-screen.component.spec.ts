import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { SplashScreenComponent } from './splash-screen.component';
import { ControlsModule } from '../controls/controls.module';
import { ProjectSerializerService, FakeProjectSerializerService } from './project-serializer.service';

describe('SplashScreenComponent', () => {
    let component: SplashScreenComponent;
    let fixture: ComponentFixture<SplashScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule
            ],
            declarations: [
                SplashScreenComponent,
            ],
            providers: [
                { provide: ProjectSerializerService, useClass: FakeProjectSerializerService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplashScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should not load projects until ngOnInit is called', async () => {
        expect(component.projects).toBeUndefined();
        await component.ngOnInit();
        expect(component.projects).toBeDefined();
        expect(component.projects.length).toBeGreaterThanOrEqual(0);
    });

    it('raises the projectOpened event when clicked', () => {
        const testTitle = 'Test Game 2: Angular2+';
        component.projectOpened.subscribe((title: string) => expect(title).toBe(testTitle));
        component.openProject({ title: testTitle });
    });
});
