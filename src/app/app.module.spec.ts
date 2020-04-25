import { async, TestBed } from "@angular/core/testing";
import { AppModule } from './app.module';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IEnvironmentService, EnvironmentService } from './environment.service';
import { StoreCreator, StoreEnhancer } from 'redux';
import { mainReducer } from './main.state';
import { CommandService } from './command.service';

describe('AppModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
        });
    }));

    it('should provide the EnvironmentService service', () => {
        expect(TestBed.inject(EnvironmentService)).toBeTruthy();
    });

    it('should provide the CommandService service', () => {
        expect(TestBed.inject(CommandService)).toBeTruthy();
    });

    it('should not load the dev tools enhancer if in production and dev tool not enabled', () => {
        const fakeDevToolsEnhancer = (next: StoreCreator) => next;
        createTestBed({
            environmentServiceClass: FakeProductionEnvironmentService,
            devToolsEnabled: false, 
            fakeDevToolsEnhancer,
        });

        const ngRedux = TestBed.inject(NgRedux);

        expect(ngRedux.configureStore).not.toHaveBeenCalledWith(
            mainReducer,
            undefined,
            [],
            jasmine.arrayContaining([ fakeDevToolsEnhancer ]));
    });

    it('should not load the dev tools enhancer if in production and dev tool is enabled', () => {
        const fakeDevToolsEnhancer = (next: StoreCreator) => next;
        createTestBed({
            environmentServiceClass: FakeProductionEnvironmentService,
            devToolsEnabled: true, 
            fakeDevToolsEnhancer,
        });

        const ngRedux = TestBed.inject(NgRedux);

        expect(ngRedux.configureStore).not.toHaveBeenCalledWith(
            mainReducer,
            undefined,
            [],
            jasmine.arrayContaining([ fakeDevToolsEnhancer ]));
    });

    it('should not load the dev tools enhancer if not in production and dev tool is not enabled', () => {
        const fakeDevToolsEnhancer = (next: StoreCreator) => next;
        createTestBed({
            environmentServiceClass: FakeDevelopmentEnvironmentService,
            devToolsEnabled: false, 
            fakeDevToolsEnhancer,
        });

        const ngRedux = TestBed.inject(NgRedux);

        expect(ngRedux.configureStore).not.toHaveBeenCalledWith(
            mainReducer,
            undefined,
            [],
            jasmine.arrayContaining([ fakeDevToolsEnhancer ]));
    });

    it('should load the dev tools enhancer if not in production and dev tool is enabled', () => {
        const fakeDevToolsEnhancer = (next: StoreCreator) => next;
        createTestBed({
            environmentServiceClass: FakeDevelopmentEnvironmentService,
            devToolsEnabled: true, 
            fakeDevToolsEnhancer,
        });

        const ngRedux = TestBed.inject(NgRedux);

        expect(ngRedux.configureStore).toHaveBeenCalledWith(
            mainReducer,
            undefined,
            [],
            jasmine.arrayContaining([ fakeDevToolsEnhancer ]));
    });
});

@Injectable()
export class FakeProductionEnvironmentService implements IEnvironmentService {
    public isProduction(): boolean {
        return true;
    }
}

@Injectable()
export class FakeDevelopmentEnvironmentService implements IEnvironmentService {
    public isProduction(): boolean {
        return false;
    }
}

interface ITestBedOptions {
    devToolsEnabled: boolean;
    fakeDevToolsEnhancer: StoreEnhancer;
    environmentServiceClass: any;
}
const defaultTestBedOptions: ITestBedOptions = {
    devToolsEnabled: true,
    fakeDevToolsEnhancer: (next) => next,
    environmentServiceClass: FakeProductionEnvironmentService,
}
function createTestBed(options: ITestBedOptions = defaultTestBedOptions) {
    const ngReduxSpy = jasmine.createSpyObj('NgRedux', ['configureStore']);

    const devToolsSpy = jasmine.createSpyObj('DevToolsExtensions', ['isEnabled', 'enhancer']);
    devToolsSpy.isEnabled.and.returnValue(options.devToolsEnabled);
    devToolsSpy.enhancer.and.returnValue(options.fakeDevToolsEnhancer);

    TestBed.configureTestingModule({
        imports: [
            AppModule
        ],
        providers: [
            { provide: NgRedux, useValue: ngReduxSpy },
            { provide: DevToolsExtension, useValue: devToolsSpy },
            { provide: EnvironmentService, useClass: options.environmentServiceClass }
        ],
    });
}
