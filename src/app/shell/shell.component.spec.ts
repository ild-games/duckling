import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ShellComponent } from './shell.component';
import { SplashScreenModule } from '../splashscreen/splash-screen.module';
import { ControlsModule } from '../controls/controls.module';
import { NgReduxModule } from '@angular-redux/store';

describe('ShellComponent', () => {
    let component: ShellComponent;
    let fixture: ComponentFixture<ShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SplashScreenModule,
                ControlsModule,
                NgReduxModule
            ],
            declarations: [
                ShellComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should set openedProject when a project was clicked to project title', () => {
        const projectTitle = 'test';
        component.onProjectOpened(projectTitle);
        expect(component.openedProject).toBe(projectTitle);
    });
});
