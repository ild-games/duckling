import { async, TestBed } from '@angular/core/testing';
import { UtilsModule } from './utils.module';
import { WindowService } from './window.service';

describe('UtilsModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                UtilsModule,
            ]
        });
    }));

    it('should provide the WindowService service', () => {
        expect(TestBed.inject(WindowService)).toBeTruthy();
    });
});
