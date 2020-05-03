import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ControlsModule } from '../controls/controls.module';
import { CommandPaletteComponent } from './command-palette.component';
import { CommandModule } from '../command/command.module';
import { WindowService } from '../utils/window.service';
import { CommandService } from '../command/command.service';

describe('CommandPaletteComponent', () => {
    let component: CommandPaletteComponent;
    let fixture: ComponentFixture<CommandPaletteComponent>;

    function inputElementHasFocus(): boolean {
        return component.input.nativeElement === document.activeElement;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule,
                CommandModule,
            ],
            declarations: [
                CommandPaletteComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandPaletteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should focus the native input when command palette is focused', () => {
        expect(inputElementHasFocus()).toBeFalse();

        component.focus();

        expect(inputElementHasFocus()).toBeTrue();
    });

    it('should clear the native input when command palette is blurred', () => {
        component.focus();

        component.input.nativeElement.value = 'test';
        expect(component.input.nativeElement.value).toBe('test');

        component.blur();

        expect(component.input.nativeElement.value).toBe('');
    });

    it('should not register window keydown handlers if focus is called while already focused', () => {
        const windowService = TestBed.inject(WindowService);
        spyOn(windowService, 'subscribeKeyDownHandler').and.callThrough();

        component.focus();
        component.focus();

        expect(windowService.subscribeKeyDownHandler).toHaveBeenCalledTimes(1);
    });

    it('should not unsubscribe window keydown handlers if blur is called while already blurred', () => {
        const windowService = TestBed.inject(WindowService);
        spyOn(windowService, 'unsubscribeKeyDownHandler').and.callThrough();

        component.focus();
        component.blur();
        component.blur();

        expect(windowService.unsubscribeKeyDownHandler).toHaveBeenCalledTimes(1);
    });

    it('should blur the component if the escape key is down while active', (): void => {
        spyOn(component, '_processKeyAction' as any).and.callThrough();

        component.focus();
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'escape'}));

        expect((component as any)._focused).toBeFalse();
        expect((component as any)._processKeyAction).not.toHaveBeenCalled();
    });

    it('should should not process any action shortcut keys when there are no query results', () => {
        spyOn(component, '_keyDownWhileActive' as any).and.callThrough();
        spyOn(component, '_processKeyAction' as any).and.callThrough();

        component.queriedRows = undefined;
        component.focus();
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect((component as any)._keyDownWhileActive).toHaveBeenCalledTimes(1);
        expect((component as any)._processKeyAction).not.toHaveBeenCalled();

        component.queriedRows = [];
        component.focus();
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect((component as any)._keyDownWhileActive).toHaveBeenCalledTimes(2);
        expect((component as any)._processKeyAction).not.toHaveBeenCalled();
    });

    it('should process the enter key to run a command when there are results and it is active', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => spy(),
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(1);
        expect(spy).toHaveBeenCalled();
    });

    it('should keep the active queriedRow the same when there is only one row and the down/up keys are pressed', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => spy(),
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(spy).toHaveBeenCalledTimes(2);

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowup'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should move down the results if active and the down key is pressed', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => {},
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => spy(),
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should move up the results if active and the up key is pressed', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => spy(),
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => {},
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowup'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should move up the results if active and the up key is pressed', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => spy(),
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => {},
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowup'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should cycle around when the down key is pressed at the bottom of the queried rows with multiple results', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => spy(),
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => {},
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowdown'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should cycle around when the up key is pressed at the top of the queried rows with multiple results', () => {
        const commandService = TestBed.inject(CommandService);
        const spy = jasmine.createSpy('spy');
        commandService.register({
            name: 'Change color theme',
            callback: () => {},
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => spy(),
        });

        component.focus();
        component.search('Change color theme');
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'arrowup'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'enter'}));

        expect(component.queriedRows.length).toBe(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should style a row with only the queried-row css class if it is not selected', () => {
        const commandService = TestBed.inject(CommandService);
        commandService.register({
            name: 'Change color theme',
            callback: () => {},
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => {},
        });

        component.focus();
        component.search('Change color theme');

        const cssClasses = component.queryRowCssClasses(1).split(' ');
        expect(cssClasses.length).toBe(1);
        expect(cssClasses.indexOf('queried-row')).toBeGreaterThan(-1);
        expect(cssClasses.indexOf('quick-select-row')).not.toBeGreaterThan(-1);
    });

    it('should style a row with the queried-row and quick-select-row css class if it is selected', () => {
        const commandService = TestBed.inject(CommandService);
        commandService.register({
            name: 'Change color theme',
            callback: () => {},
        });
        commandService.register({
            name: 'Change color theme2',
            callback: () => {},
        });

        component.focus();
        component.search('Change color theme');

        const cssClasses = component.queryRowCssClasses(0).split(' ');
        expect(cssClasses.length).toBe(2);
        expect(cssClasses.indexOf('queried-row')).toBeGreaterThan(-1);
        expect(cssClasses.indexOf('quick-select-row')).toBeGreaterThan(-1);
    });
});
