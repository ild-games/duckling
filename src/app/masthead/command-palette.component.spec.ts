import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ControlsModule } from '../controls/controls.module';
import { CommandPaletteComponent } from './command-palette.component';

describe('CommandPaletteComponent', () => {
    let component: CommandPaletteComponent;
    let fixture: ComponentFixture<CommandPaletteComponent>;

    function inputElementHasFocus(): boolean {
        return component.input.nativeElement === document.activeElement;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule
            ],
            declarations: [
                CommandPaletteComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandPaletteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
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
        component.input.nativeElement.value = 'test';
        expect(component.input.nativeElement.value).toBe('test');

        component.blur();

        expect(component.input.nativeElement.value).toBe('');
    });
});
