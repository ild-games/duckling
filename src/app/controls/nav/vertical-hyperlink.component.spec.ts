import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ControlsModule } from '../../controls/controls.module';
import { VerticalHyperlinkComponent } from './vertical-hyperlink.component';

describe('VerticalHyperlinkComponent', () => {
    let component: VerticalHyperlinkComponent;
    let fixture: ComponentFixture<VerticalHyperlinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule
            ],
            declarations: [
                VerticalHyperlinkComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerticalHyperlinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should emit the click event event when onClick is invoked', () => {
        spyOn(component.click, 'emit').and.callThrough();
        component.onClick();

        expect(component.click.emit).toHaveBeenCalledTimes(1);
    });
});
