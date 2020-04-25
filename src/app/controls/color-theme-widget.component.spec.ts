import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ControlsModule } from '../controls/controls.module';
import { ColorThemeWidgetComponent } from './color-theme-widget.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IDucklingState } from 'src/app/main.state';
import { AppModule } from '../app.module';
import { CommandService } from '../command.service';

describe('ColorThemeWidgetComponent', () => {
    let component: ColorThemeWidgetComponent;
    let fixture: ComponentFixture<ColorThemeWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                ControlsModule,
                NgReduxModule
            ],
            declarations: [
                ColorThemeWidgetComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorThemeWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should have no css classes when hovered', () => {
        component.onMouseEnter();

        expect(component.cssClasses).toEqual([]);
    });

    it('should have is-solid css class when not hovered', () => {
        component.onMouseEnter();
        component.onMouseLeave();

        expect(component.cssClasses).toEqual(jasmine.arrayContaining(['is-solid']));
    });

    it('should change the color theme when clicked', () => {
        const ngRedux: NgRedux<IDucklingState> = TestBed.inject(NgRedux);

        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('light');

        component.onMouseClick();
        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('dark');

        component.onMouseClick();
        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('light');
    });

    it('should change the color theme when the command registered is invoked', () => {
        const commandService = TestBed.inject(CommandService);
        const ngRedux: NgRedux<IDucklingState> = TestBed.inject(NgRedux);

        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('light');

        commandService.retrieve((component as any)._changeColorThemeCommandId).callback();

        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('dark');

        commandService.retrieve((component as any)._changeColorThemeCommandId).callback();
        expect(ngRedux.getState().colorTheme.activeColorTheme).toBe('light');
    });
});
