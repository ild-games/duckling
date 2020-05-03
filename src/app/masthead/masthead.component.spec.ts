import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ControlsModule } from '../controls/controls.module';
import { MastheadComponent } from './masthead.component';
import { UtilsModule } from '../utils/utils.module';
import { CommandPaletteComponent } from './command-palette.component';
import { CommandModule } from '../command/command.module';

describe('MastheadComponent', () => {
    let component: MastheadComponent;
    let fixture: ComponentFixture<MastheadComponent>;

    function commandPaletteHasFocus(): boolean {
        return component.commandPalette.input.nativeElement === document.activeElement;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule,
                UtilsModule,
                CommandModule,
            ],
            declarations: [
                MastheadComponent,
                CommandPaletteComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MastheadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('lets you access the command palette through a shortcut', () => {
        expect(commandPaletteHasFocus()).toBeFalse();

        window.dispatchEvent(new KeyboardEvent('keydown', {'altKey': true}));

        expect(commandPaletteHasFocus()).toBeTrue();
    });

    it('does not focus the command palette when the incorrect shortcut is provided', () => {
        expect(commandPaletteHasFocus()).toBeFalse();

        window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'altKey': false}));

        expect(commandPaletteHasFocus()).toBeFalse();
    });
});
