import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ShellComponent } from './shell.component';
import { SplashScreenModule } from '../splashscreen/splash-screen.module';
import { ControlsModule } from '../controls/controls.module';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IDucklingState } from '../main.state';
import { AppModule } from '../app.module';
import { ColorThemeService } from './colorthemes/color-theme.service';
import { colorThemeActions } from './colorthemes/color-theme.state';

describe('ShellComponent', () => {
    let component: ShellComponent;
    let fixture: ComponentFixture<ShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                SplashScreenModule,
                ControlsModule,
                NgReduxModule
            ],
            declarations: [
                ShellComponent,
            ],
            providers: [
                ColorThemeService,
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

    it('should change rootDockId when state.dock.rootDockId changes', () => {
        let rootDockId = undefined;
        let subscription = component.rootDockId$.subscribe((newRootDockId) => {
            rootDockId = newRootDockId;
        });

        const ngRedux: NgRedux<IDucklingState> = TestBed.inject(NgRedux);

        expect(rootDockId).toBe(ngRedux.getState().dock.rootDockId);

        subscription.unsubscribe();
    });

    it('should activate the color theme when the activeColorTheme changes', () => {
        const colorThemeService = TestBed.inject(ColorThemeService);
        const ngRedux: NgRedux<IDucklingState> = TestBed.inject(NgRedux);
        spyOn(colorThemeService, 'activate').and.callThrough();

        ngRedux.dispatch(colorThemeActions.changeActiveColorTheme('dark'));
        expect(colorThemeService.activate).toHaveBeenCalledTimes(1);
    });
});
