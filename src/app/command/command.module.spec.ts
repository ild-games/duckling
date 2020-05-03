import { async, TestBed } from "@angular/core/testing";
import { CommandService } from './command.service';
import { CommandModule } from './command.module';

describe('CommandModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommandModule,
            ]
        });
    }));

    it('should provide the CommandService service', () => {
        expect(TestBed.inject(CommandService)).toBeTruthy();
    });
});
