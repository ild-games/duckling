import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ControlsModule } from '../../controls/controls.module';
import { VerticalNavComponent } from './vertical-nav.component';

describe('VerticalNavComponent', () => {
    let component: VerticalNavComponent;
    let fixture: ComponentFixture<VerticalNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ControlsModule
            ],
            declarations: [
                VerticalNavComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerticalNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
});
